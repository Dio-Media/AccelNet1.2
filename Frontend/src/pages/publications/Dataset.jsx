import { useEffect, useState } from "react";

export default function Datasets() {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/datasets")
      .then((r) => r.json())
      .then((data) => { setDatasets(data || []); setLoading(false); })
      .catch((err) => { console.error("Error fetching datasets:", err); setLoading(false); });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Datasets</h1>
      {loading ? <p>Loading datasets...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {datasets.map((d) => (
            <div key={d.dataset_id} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">{d.name}</h3>
              <p className="text-gray-700 mb-2">{d.description}</p>
              <p className="text-sm text-gray-600">Type: {d.indexed_type}</p>
              <p className="text-sm text-gray-600">Size: {d.file_size_gb} GB</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
