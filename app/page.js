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
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/save`,{
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
      <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Share Your Text</h1>
    
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder="Type your text here..."
        ></textarea>
    
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition duration-200"
          >
            Share
          </button>
        </div>
      </div>
    </main>
    

    )
    




}
