export function ConferencesIndex() {
  const [conferences, setConferences] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/events')
      .then(response => response.json())
      .then(data => {
        const conferenceEvents = data.filter(e => e.event_type === 'conference');
        setConferences(conferenceEvents);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching conferences:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Conferences</h1>
      {loading ? (
        <p>Loading conferences...</p>
      ) : (
        <div className="space-y-4">
          {conferences.map(conference => (
            <a 
              key={conference.event_id}
              href={`/activities/conferences/${conference.event_id}`}
              className="block bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-semibold mb-2">{conference.title}</h3>
              <p className="text-gray-600 mb-2">
                {new Date(conference.start_datetime).toLocaleDateString()} - {conference.location}
              </p>
              <p className="text-gray-700">{conference.summary}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}