'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { Concert_One } from "next/font/google"


const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then(mod => mod.Editor),
  { ssr: false }
)
export default function HomePage(){

    const [text,setText] = useState('');
    const [title, setTitle] = useState('')
    const router = useRouter();
    // const [isBold, setIsBold] = useState(false);
    // const [isItalic, setItalic] = useState(false);
    // const [isUnderline, setunderline] = useState(false);
    const handleSubmit = async () =>{
      if(!text.trim()&& text ===''){
        alert('Text is required')
        return;
      };
      console.log(text)
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/save`,{
        method:'POST',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({
          text,
          title,
          pastedUrl: window.lastPastedUrl || null,
        
        })
      })
      const data = await res.json()
      router.push(`/${data.id}`)
     
    }

    
    return(
      <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl  bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Share Your Text</h1>
          <input
             type="text"
             placeholder="Enter a title..."
             className="w-full border border-gray-300 text-gray-800 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
             value={title}
             onChange={(e) => setTitle(e.target.value)}
          />
          <Editor
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
              "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
              "insertdatetime", "media", "table", "code", "help", "wordcount"
            ],
            toolbar:
              "bold italic underline strikethrough forecolor removeformat | bullist numlist |undo redo |  | link unlink image|",
              

            
            paste_preprocess: function (plugin, args) {
              const pastedContent  = args.content.trim();
              console.log("Raw pasted:", pastedContent);

              window.lastPastedUrl = pastedContent;

          },

            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            
          }}
          value={text}
          onEditorChange={(newValue) => setText(newValue)}
        />
        
    
          <div className="flex justify-end mt-4 gap-3 flex-wrap">
           
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 border border-gray-400 text-white font-semibold rounded-lg shadow transition duration-200"
            >
              Share
            </button>
          </div>
        </div>            
      </main>
    )
}
