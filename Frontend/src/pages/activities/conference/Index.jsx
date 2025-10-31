import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ConferencesIndex() {
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then((data) => {
        setConferences((data || []).filter(e => e.event_type === "conference"));
        setLoading(false);
      })
      .catch((err) => { console.error("Error fetching conferences:", err); setLoading(false); });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Conferences</h1>
      {loading ? (
        <p>Loading conferences…</p>
      ) : (
        <div className="space-y-4">
          {conferences.map((c) => (
            <Link key={c.event_id} to={`/activities/conference/${c.event_id}`} className="block bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold mb-2">{c.title}</h3>
              <p className="text-gray-600 mb-2">{new Date(c.start_datetime).toLocaleDateString()} — {c.location}</p>
              <p className="text-gray-700">{c.summary}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
