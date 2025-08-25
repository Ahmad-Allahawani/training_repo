const express = require('express');
const cors = require('cors');
const path = require('path')
const {nanoid} = require('nanoid');
const session = require('express-session');
const flash = require('express-flash');
const { stripHtml } = require('string-strip-html');
const { PrismaClient } = require("@prisma/client");


require('dotenv').config({ path: path.resolve('../.env.local')});


const app = express();
const prisma = new PrismaClient();
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

app.post('/api/save', async (req,res)=>  {
    const {text} = req.body;
    const Rid = nanoid(8);
    clean_text = removeHTMLTags(text);
   try{
    const text_db_WH = await prisma.textWithHtml.create({
      data: {
        id: Rid,
        text:text,
      },      
    })
    const text_db_WOH = await prisma.textWithOutHtml.create({
      data:{
        id:Rid,
        text: clean_text,
      }
    })
    res.json({id: text_db_WOH.id});
    console.log('db:',text_db_WOH)
   }
  
   catch (error){
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
   }
});

app.get('/api/text/:id' , async(req,res)=>{
  const id = req.params.id; 
  
  const text_db_WOH = await prisma.textWithOutHtml.findUnique({
    where: {
      id: id,
    },
   })
   const text_db_WH = await prisma.textWithHtml.findUnique({
    where:{
      id:id
    },
   })

  
  res.json({
    text_db_wo_item : text_db_WOH.text,
    text_db_w_item : text_db_WH.text
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

  app.post('/delete',async (req,res)=>{
    const id = req.body.id;
   try{
    await prisma.textWithOutHtml.delete({
      where:{
        id:id,
      }
    })
    await prisma.textWithHtml.delete({
      where:{
        id:id,
      }
    })
    const text_db_WOH = await prisma.TextWithOutHtml.findMany();
    return res.render('dashboard',{text_db_WOH})
   }
   catch(error){
    console.error(error);
    return res.status(500).send({ success: false, message: 'Deletion failed' });
   }
    
  })


  app.get('/dashboard',requireAdmin, async(req,res)=>{
   const text_db_WOH =await prisma.TextWithOutHtml.findMany();
    return res.render('dashboard' , {text_db_WOH});
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
