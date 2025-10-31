import { useEffect, useState } from "react";

export default function SteeringCommittee() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/committees/1")
      .then((r) => r.json())
      .then((data) => { setMembers(data.members || []); setLoading(false); })
      .catch((err) => { console.error("Error fetching committee:", err); setLoading(false); });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Steering Committee</h1>
      <p className="text-lg text-gray-700 mb-6">
        Meet our steering committee members who guide the strategic direction of AccelNet.
      </p>
      {loading ? <p>Loading...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((m) => (
            <div key={m.member_id} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold">{m.first_name} {m.last_name}</h3>
              <p className="text-gray-600">{m.committee_position}</p>
              <p className="text-sm text-gray-500">{m.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
