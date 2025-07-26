'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function HomePage(){

    const [text,setText] = useState('');
    const router = useRouter();
    // var  emtpy_text = false
    const handleSubmit = async () =>{
      if(!text.trim()){
        alert('text is required')
        // emtpy_text = true
        return;
      };
        
        const res = await fetch(`https://training-repo-backend.onrender.com/api/save`,{
          method:'POST',
          headers: {'Content-Type':'application/json'},
          body:JSON.stringify({text})
      })

      const data = await res.json()
      router.push(`/${data.id}`)
      // if(emtpy_text){
      //   router.push(``)
      // }
      // else{
      //   router.push(`/${data.id}`)
      // }
    }
    return(
      <main className="p-4 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4"></h1>

        <textarea 
          value={text} onChange={(e) => setText(e.target.value)}
          className="w-full h-64 p-2 border border-gray-300 rounded"
          placeholder="Type your text here..." ></textarea>

          <button onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
            Share</button>
      </main>

    )
    




}
