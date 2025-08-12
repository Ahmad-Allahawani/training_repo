'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"

const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then(mod => mod.Editor),
  { ssr: false }
)
export default function HomePage(){

    const [text,setText] = useState('');
    const router = useRouter();
    // const [isBold, setIsBold] = useState(false);
    // const [isItalic, setItalic] = useState(false);
    // const [isUnderline, setunderline] = useState(false);
    const handleSubmit = async () =>{
      if(!text.trim()){
        alert('Text is required')
        return;
      };
        
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/save`,{
        method:'POST',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({text})
      })
      const data = await res.json()
      router.push(`/${data.id}`)
    }

    
    return(
      <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Share Your Text</h1>
    
          <Editor
          apiKey="jkfqelebfopjtojkgzxwvdyvrijpodcbzks7c9f8zsgk8hej" 
          init={{
            height: 300,
            menubar: false,
            plugins: [
              "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
              "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
              "insertdatetime", "media", "table", "code", "help", "wordcount"
            ],
            toolbar:
              "bold italic underline | bullist numlist | link image | undo redo | removeformat",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
          }}
          value={text}
          onEditorChange={(newValue) => setText(newValue)}
        />
        
    
          <div className="flex justify-end mt-4 gap-3 flex-wrap">
           
            <button
              onClick={() => setunderline(!isUnderline)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 border border-gray-400 text-white font-semibold rounded-lg shadow transition duration-200"
            >
              Share
            </button>
          </div>
        </div>            
      </main>
    )
}
