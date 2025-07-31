import { notFound } from "next/navigation";

export default async function Page({params}){

    const{id} = await params;
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/text/${id}`)

    if(!res.ok){
        
        notFound();
        
    }
    const data = await res.json();

    return(
        <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Shared Text</h1>
      
          <pre className="whitespace-pre-wrap bg-gray-100 text-gray-800 p-4 rounded-lg border border-gray-300 overflow-auto">
            {data.text}
          </pre>
        </div>
      </main>
      
    )

}