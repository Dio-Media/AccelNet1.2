import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function WorkingGroupsIndex() {
  const [workingGroups, setWorkingGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/working-groups")
      .then((r) => r.json())
      .then((data) => { setWorkingGroups(data || []); setLoading(false); })
      .catch((err) => { console.error("Error fetching working groups:", err); setLoading(false); });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Working Groups</h1>
      <p className="text-lg text-gray-700 mb-6">Explore our active working groups and their focus areas.</p>
      {loading ? <p>Loading working groups...</p> : (
        <div className="space-y-4">
          {workingGroups.map((wg) => (
            <Link
              key={wg.wg_id}
              to={`/working-groups/${wg.wg_id}`}
              className="block bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-semibold mb-2">{wg.wg_name}</h3>
              <p className="text-gray-600 mb-2">{wg.wg_code}</p>
              <p className="text-gray-700">{wg.wg_description}</p>
              <span className="inline-block mt-2 text-sm text-blue-600">{wg.focus_area}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
