"use client";
import { useState, useEffect } from "react";
import { notFound } from "next/navigation";

export default function Page({ params }) {
  const [data, setData] = useState(null);
  const [showSecond, setShowSecond] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/text/${params.id}`);
      if (!res.ok) return notFound();
      const json = await res.json();
      setData(json);
    }
    fetchData();
  }, [params.id]);

  if (!data) return <p>Loading...</p>;

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4 gap-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Shared Text </h1>
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
    </main>
  );
}
