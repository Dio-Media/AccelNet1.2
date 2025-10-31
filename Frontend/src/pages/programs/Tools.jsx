import { useEffect, useState } from "react";

export default function Tools() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tools")
      .then((r) => r.json())
      .then((data) => { setTools(data || []); setLoading(false); })
      .catch((err) => { console.error("Error fetching tools:", err); setLoading(false); });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Tools & Resources</h1>
      {loading ? (
        <p>Loading tools…</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((t) => (
            <div key={t.tool_id} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">{t.name}</h3>
              <p className="text-gray-700 mb-4">{t.description}</p>
              <div className="flex gap-2">
                {t.repository_url && <a href={t.repository_url} className="text-blue-600 text-sm hover:underline" target="_blank" rel="noopener noreferrer">Repository</a>}
                {t.documentation_url && <a href={t.documentation_url} className="text-blue-600 text-sm hover:underline" target="_blank" rel="noopener noreferrer">Documentation</a>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
