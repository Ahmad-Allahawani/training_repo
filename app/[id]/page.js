import { notFound } from "next/navigation";

export default async function Page({params}){

    const{id} = await params;
    const res = await fetch(`http://localhost:4000/api/text/${id}`)

    if(!res.ok){
        
        notFound();
        
    }

    const data = await res.json();

    return(
        <main className="p-4 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 ">Shared Text</h1>
            <pre className="text-black whitespace-pre-wrap bg-gray-100 p-4 rounded">{data.text}</pre>
        </main>
    )

}