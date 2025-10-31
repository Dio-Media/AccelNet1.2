import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function WorkshopsIndex() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then((data) => {
        setWorkshops((data || []).filter(e => e.event_type === "workshop"));
        setLoading(false);
      })
      .catch((err) => { console.error("Error fetching workshops:", err); setLoading(false); });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Workshops</h1>
      {loading ? (
        <p>Loading workshops…</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map((w) => (
            <Link key={w.event_id} to={`/activities/workshops/${w.event_id}`} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition block">
              <h3 className="text-xl font-semibold mb-2">{w.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{new Date(w.start_datetime).toLocaleDateString()}</p>
              <p className="text-gray-700 text-sm">{w.summary}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
