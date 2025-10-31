import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PublicationsIndex() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/publications")
      .then((r) => r.json())
      .then((data) => { setPublications(data || []); setLoading(false); })
      .catch((err) => { console.error("Error fetching publications:", err); setLoading(false); });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Publications</h1>
      <div className="mb-6 flex gap-4">
        <Link to="/publications/datasets" className="text-blue-600 hover:underline">View Datasets →</Link>
        <Link to="/publications/journals" className="text-blue-600 hover:underline">View Journals →</Link>
      </div>
      {loading ? (
        <p>Loading publications…</p>
      ) : (
        <div className="space-y-4">
          {publications.map((p) => (
            <div key={p.publication_id} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{p.journal_name} • {new Date(p.publication_date).getFullYear()}</p>
              <p className="text-gray-700 mb-2">{p.abstract}</p>
              {p.doi && (
                <a href={`https://doi.org/${p.doi}`} className="text-blue-600 text-sm hover:underline" target="_blank" rel="noopener noreferrer">
                  DOI: {p.doi}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
