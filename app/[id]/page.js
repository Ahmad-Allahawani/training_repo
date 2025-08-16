"use client";
import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import { useCallback } from "react";

export default function Page() {
  const [data, setData] = useState(null);
  const [showSecond, setShowSecond] = useState(true);
  const { id } = useParams();


  const handleShare = (async() => {
    if(navigator.share){
      try{
           await navigator.share({
            title:"",
            text:"",
            // url:`http://localhost:3000/${id}`,
            url:`https://training-repo-asrv.vercel.app/${id}`
        })
        console.log("Shared successfully!");
        
      }
      catch(err){
        console.error("Error sharing:", err);
      }
    }
    else {
      alert("Web Share API not supported in this browser.");
    }
  });
  useEffect(() => {
    


   
    async function fetchData() {
      console.log(id)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/text/${id}`);
     
      if (!res.ok) return <p>Loading...</p>;
      const json = await res.json();
      setData(json);
    }
    fetchData();
  }, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 gap-6">
    {/* Text without HTML */}
    <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Shared Text</h1>
        <button
          onClick={() => setShowSecond(!showSecond)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {showSecond ? "Hide HTML" : "Show HTML"}
        </button>
      </div>
      <pre className="whitespace-pre-wrap bg-gray-100 text-gray-800 p-4 rounded-lg border border-gray-300 overflow-auto">
        {data.text_wo_html}
      </pre>
    </div>

    {/* Text with HTML */}
    {showSecond && (
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Shared Text HTML
        </h1>
        <pre className="whitespace-pre-wrap bg-gray-100 text-gray-800 p-4 rounded-lg border border-gray-300 overflow-auto">
          {data.text_w_html}
        </pre>
      </div>
    )}

    {/* Share button at bottom center */}
    <div className="flex justify-center w-full mt-6">
      <button
        onClick={handleShare}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
      >
        Share
      </button>
    </div>
  </main>
  );
}
