export function WorkshopsIndex() {
  const [workshops, setWorkshops] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/events')
      .then(response => response.json())
      .then(data => {
        const workshopEvents = data.filter(e => e.event_type === 'workshop');
        setWorkshops(workshopEvents);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching workshops:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Workshops</h1>
      {loading ? (
        <p>Loading workshops...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map(workshop => (
            <a 
              key={workshop.event_id}
              href={`/activities/workshops/${workshop.event_id}`}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{workshop.title}</h3>
              <p className="text-gray-600 text-sm mb-2">
                {new Date(workshop.start_datetime).toLocaleDateString()}
              </p>
              <p className="text-gray-700 text-sm">{workshop.summary}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
