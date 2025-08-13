const express = require('express');
const cors = require('cors');
const path = require('path')
const {nanoid} = require('nanoid');
const session = require('express-session');
const flash = require('express-flash');

require('dotenv').config({ path: path.resolve('../.env.local')});

const { stripHtml } = require('string-strip-html');


const app = express();
const PORT =process.env.PORT || 4000;

var clean_text;
var store_without_html = [
    {id:'abc123' , clean_text:'test text'}
];
var store_with_html = [
  {id : 'abc123' , text:'<p>test text</p>'}
];

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash()); 
app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: true
}));



app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
app.use(express.static(path.join(__dirname,'public')))

app.post('/api/save',(req,res)=>  {
    const {text} = req.body;
    const id = nanoid(8);

   
    store_with_html.push({id,text})
    clean_text = removeHTMLTags(text);
    store_without_html.push({id,clean_text});
   
    // console.log('[STORE UPDATED]:', store_without_html);
    // console.log('[STORE UPDATED]:', store_with_html);
    res.json({id});

    
});

app.get('/api/text/:id',(req,res)=>{
    const {id} = req.params;
    console.log(id)
    const item_without_html = store_without_html.find(entry => entry.id == id);
    const item_with_html = store_with_html.find(entry => entry.id == id);
    
    console.log(item_with_html)
    if(!item_without_html && !item_with_html ){
        return res.status(404).json({error:'text not found'})
    };
    
    res.json({
      text_wo_html :item_without_html.clean_text ?? null,
      text_w_html : item_with_html.text ?? null
    });
});

app.get('/', (req, res) => {
  
    res.render('index' , { messages: req.flash() });
   
  
  });

  app.post('/login' , (req,res) =>{
    const{email,password} = req.body;
    if (email === 'admin@gmail.com' && password === "1234" ){
        req.session.isAdmin = true;
        return res.redirect('/dashboard');
        
    }
    else{
       req.flash('error','Access denied. Admins only.')
       return res.redirect('/')
    }
  });

  app.post('/delete', (req,res)=>{
    const id = req.body.id;
    store_without_html = store_without_html.filter(item => item.id != id)
    store_with_html =store_with_html.filter(item => item.id != id)

    return res.redirect('/dashboard')
  })


  app.get('/dashboard',requireAdmin,(req,res)=>{
   
    return res.render('dashboard' , {store: store_without_html});
  });

app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`)
})


//helper functions

function requireAdmin ( req ,res , next){
    if (req.session.isAdmin){
        return next();
    }
    else{
        res.status(403).send('Access denied. Admins only.');
    }
}

  
function removeHTMLTags(str){
  return stripHtml(str).result;
}
