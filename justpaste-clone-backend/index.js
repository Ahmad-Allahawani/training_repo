const express = require('express');
const cors = require('cors');
const {nanoid} = require('nanoid');


const app = express();
const PORT =process.env.PORT || 4000;
const store = {};

app.use(cors());
app.use(express.json());

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

app.get('/admin', (req, res) => {
    // Option 1: Send HTML
    res.send(`
      <html>
        <head><title>Admin Panel</title></head>
        <body>
          <h1>Welcome to Admin Panel</h1>
          <p>This is served directly from the backend server</p>
        </body>
      </html>
    `);
  
    // Option 2 (instead): Send JSON
    // res.json({ message: 'Welcome to Admin Panel' });
  });

app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`)
})

  