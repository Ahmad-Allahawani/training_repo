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
  
    res.send(`
    <main className="p-4 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 ">Shared Text</h1>
            <pre className="text-black whitespace-pre-wrap bg-gray-100 p-4 rounded">{data.text}</pre>
    </main>
    `);
  
  
  });

app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`)
})

  