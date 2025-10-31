import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function WorkshopDetails() {
  const { slug, id } = useParams();
  const eventId = slug || id;

  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!eventId) return;
    fetch(`/api/events/${eventId}`)
      .then((r) => r.json())
      .then((data) => { setWorkshop(data); setLoading(false); })
      .catch((err) => { console.error("Error fetching workshop:", err); setLoading(false); });
  }, [eventId]);

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-8">Loading…</div>;
  if (!workshop) return <div className="max-w-7xl mx-auto px-4 py-8">Workshop not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{workshop.title}</h1>
      <div className="text-gray-600 mb-6">
        <p>{new Date(workshop.start_datetime).toLocaleDateString()}</p>
        <p>{workshop.location}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-700">{workshop.event_description}</p>
      </div>
    </div>
  );
}
