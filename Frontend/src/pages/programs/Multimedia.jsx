export function Multimedia() {
  const [media, setMedia] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/multimedia')
      .then(response => response.json())
      .then(data => {
        setMedia(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching multimedia:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Multimedia</h1>
      {loading ? (
        <p>Loading multimedia...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {media.map(item => (
            <div key={item.media_id} className="bg-white rounded-lg shadow overflow-hidden">
              {item.thumbnail_url && (
                <img src={item.thumbnail_url} alt={item.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-700 text-sm">{item.description}</p>
                <span className="text-xs text-gray-500">{item.media_type}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
