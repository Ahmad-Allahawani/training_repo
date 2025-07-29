const express = require('express');
const cors = require('cors');
const path = require('path')
const {nanoid} = require('nanoid');


const app = express();
const PORT =process.env.PORT || 4000;
const store = {};

app.use(cors());
app.use(express.json());


app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
app.use(express.static(path.join(__dirname,'public')))

app.post('/api/save',(req,res)=>  {
    const {text} = req.body;
    const id = nanoid(8);
    store[id] =text;
    res.json({id});

    
});

app.get('/api/text/:id',(req,res)=>{
    const id = req.params.id;
    const text = store[id];
    if(!text){
        return res.status(404).json({error:'text not found'})
    };
    res.json({text});
});

app.get('/', (req, res) => {
  
    res.render('index')
  
  
  });

app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`)
})

  