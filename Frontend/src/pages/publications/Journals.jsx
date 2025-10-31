import { useEffect, useState } from "react";

export default function Journals() {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/publications/type/journal")
      .then((r) => r.json())
      .then((data) => { setJournals(data || []); setLoading(false); })
      .catch((err) => { console.error("Error fetching journals:", err); setLoading(false); });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Journal Publications</h1>
      {loading ? <p>Loading journals...</p> : (
        <div className="space-y-4">
          {journals.map((j) => (
            <div key={j.publication_id} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">{j.title}</h3>
              <p className="text-gray-600 mb-2">{j.journal_name}</p>
              <p className="text-gray-700">{j.abstract}</p>
              {j.url && (
                <a href={j.url} className="text-blue-600 hover:underline mt-2 inline-block" target="_blank" rel="noopener noreferrer">
                  Read More →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
