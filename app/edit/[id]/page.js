"use client";
import { useState, useEffect, use } from "react";
import { useParams, notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then(mod => mod.Editor),
  { ssr: false }
)

export default function editpage(){
    const [data, setData] = useState(null);
    const {id }= useParams();
    const [title, setTitle] = useState('')
    const router = useRouter();
    // console.log(id)

    const handleEditSubmit = async () =>{
      // console.log(data)
      if(data.text ===''){
        alert('Text is required')
        return;
      };
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/save/${id}`,{
        method : 'PATCH',
        headers : {'Content-Type':'application/json'},
        body : JSON.stringify({
          text :data,
          title})
        
      })
      
      router.push(`/${id}`)
     
    }


    useEffect(()=>{
        if(!id) return;

        async function fetchData(){
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/edit/${id}`);
        
            const json = await res.json();
            setData(json)
            // console.log(json.text)
        
        
        }
        fetchData();
    },[id]);
    if (data===null) {
      return <p>loading...</p>
    }

    return(
        <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl  bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Share Your Text</h1>
          <input
             type="text"
             placeholder="Enter a title..."
             className="w-full border border-gray-300 text-gray-800 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
             defaultValue={data.title}
             onChange={(e) => setTitle(e.target.value)}
          />
          <Editor
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
          initialValue= {data.text} 
          init={{
            height: 500,
            menubar: true,
            plugins: [
              "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
              "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
              "insertdatetime", "media", "table", "code", "help", "wordcount"
            ],
            toolbar:
            "bold italic underline strikethrough forecolor removeformat|imgLeft imgCenter imgRight| bullist numlist |alignleft aligncenter alignright alignjustify | undo redo | link unlink image|preview fullscreen code",
            image_advtab: true, 
            formats: {
              alignleft: [
                { selector: 'img', styles: { display: 'block', 'margin-left': '0', 'margin-right': 'auto' } },
                { selector: 'p', styles: { 'text-align': 'left' } }
              ],
              aligncenter: [
                { selector: 'img', styles: { display: 'block', 'margin-left': 'auto', 'margin-right': 'auto' } },
                { selector: 'p', styles: { 'text-align': 'center' } }
              ],
              alignright: [
                { selector: 'img', styles: { display: 'block', 'margin-left': 'auto', 'margin-right': '0' } },
                { selector: 'p', styles: { 'text-align': 'right' } }
              ]
            },
            // setup: (editor) => {
            //   editor.on('ExecCommand', (e) => {
            //     console.log('Toolbar command executed:', e.command);
            
            //     const img = editor.selection.getNode();
            //     if (img && img.nodeName === 'IMG') {
            //       let style = '';
            
            //       if (e.command === 'JustifyLeft') {
            //         style = 'display:block; margin-right:auto; margin-left:0;';
            //       } else if (e.command === 'JustifyCenter') {
            //         style = 'display:block; margin-left:auto; margin-right:auto;';
            //       } else if (e.command === 'JustifyRight') {
            //         style = 'display:block; margin-left:auto; margin-right:0;';
            //       }
            
            //       editor.dom.setAttrib(img, 'style', style);  // ✅ TinyMCE API
            //       editor.nodeChanged();                       // ✅ refresh state
            //     }
            //   });
            // },
            
            
            content_style:
            ` body { font-family:Helvetica,Arial,sans-serif; font-size:14px }
            img { max-width: 100%; height: auto; }
            .align-right img { float: right; display: block; margin-left:auto; }
            .align-left img { float: left; display: block; margin-right:auto; }
            .align-center img { display:block; margin-left:auto; margin-right:auto; }`
          }}
          
          onEditorChange={(newValue) =>{
            // console.log("Editor content changed:", newValue);
            setData(newValue)}
          }
             
          
        />
        
    
          <div className="flex justify-end mt-4 gap-3 flex-wrap">
           
            <button
              onClick={handleEditSubmit}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 border border-gray-400 text-white font-semibold rounded-lg shadow transition duration-200"
            >
              Edit
            </button>
          </div>
        </div>            
      </main> 
    ) 
}