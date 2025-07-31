const express = require('express');
const cors = require('cors');
const path = require('path')
const {nanoid} = require('nanoid');
const session = require('express-session');
const flash = require('express-flash');
require('dotenv').config({ path: path.resolve('../.env.local')});



const app = express();
const PORT =process.env.PORT || 4000;
var store = [
    {id:'abc123' , text:'test text'}
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
    store.push({id,text});
   
    console.log('[STORE UPDATED]:', store);
    res.json({id});

    
});

app.get('/api/text/:id',(req,res)=>{
    const id = req.params.id;
    const item = store.find(entry => entry.id == id);
    if(!item){
        return res.status(404).json({error:'text not found'})
    };
    
    res.json({text :item.text});
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
    store = store.filter(item => item.id != id)
    return res.redirect('/dashboard')
  })


  app.get('/dashboard',requireAdmin,(req,res)=>{
   
    return res.render('dashboard' , {store});
  });

app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`)
})


function requireAdmin ( req ,res , next){
    if (req.session.isAdmin){
        return next();
    }
    else{
        res.status(403).send('Access denied. Admins only.');
    }
}

  