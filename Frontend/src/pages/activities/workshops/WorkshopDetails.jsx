export function WorkshopDetail() {
  const [workshop, setWorkshop] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const id = window.location.pathname.split('/').pop();
    
    fetch(`/api/events/${id}`)
      .then(response => response.json())
      .then(data => {
        setWorkshop(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching workshop:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-8">Loading...</div>;
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
  )};