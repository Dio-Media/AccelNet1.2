import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ConferenceDetails() {
  const { id, slug } = useParams();
  const eventId = id || slug;

  const [conference, setConference] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!eventId) return;
    fetch(`/api/events/${eventId}`)
      .then((r) => r.json())
      .then((data) => { setConference(data); setLoading(false); })
      .catch((err) => { console.error("Error fetching conference:", err); setLoading(false); });
  }, [eventId]);

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-8">Loading…</div>;
  if (!conference) return <div className="max-w-7xl mx-auto px-4 py-8">Conference not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{conference.title}</h1>
      <div className="text-gray-600 mb-6">
        <p>{new Date(conference.start_datetime).toLocaleDateString()} – {new Date(conference.end_datetime).toLocaleDateString()}</p>
        <p>{conference.location}{conference.city ? `, ${conference.city}` : ""}{conference.country ? `, ${conference.country}` : ""}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <p className="text-gray-700 mb-4">{conference.event_description}</p>
        {conference.registration_url && (
          <a href={conference.registration_url} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Register Now
          </a>
        )}
      </div>
    </div>
  );
}
