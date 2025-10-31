import { useEffect, useState } from "react";

export default function Grants() {
  const [grants, setGrants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/grants")
      .then((r) => r.json())
      .then((data) => { setGrants(data || []); setLoading(false); })
      .catch((err) => { console.error("Error fetching grants:", err); setLoading(false); });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Grants & Funding</h1>
      <p className="text-lg text-gray-700 mb-6">Information about available grants and funding opportunities.</p>
      {loading ? (
        <p>Loading grants…</p>
      ) : (
        <div className="space-y-4">
          {grants.map((g) => (
            <div key={g.application_id} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Grant Application</h3>
              <p className="text-gray-600 mb-2">Applied: {new Date(g.application_date).toLocaleDateString()}</p>
              <p className="text-sm">
                <span className={`inline-block px-3 py-1 rounded ${
                  g.status === "approved" ? "bg-green-100 text-green-800" :
                  g.status === "pending"  ? "bg-yellow-100 text-yellow-800" :
                                            "bg-red-100 text-red-800"
                }`}>
                  {g.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
