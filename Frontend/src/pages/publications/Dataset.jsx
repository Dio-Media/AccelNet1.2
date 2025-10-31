export function Datasets() {
  const [datasets, setDatasets] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/datasets')
      .then(response => response.json())
      .then(data => {
        setDatasets(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching datasets:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Datasets</h1>
      {loading ? (
        <p>Loading datasets...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {datasets.map(dataset => (
            <div key={dataset.dataset_id} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">{dataset.name}</h3>
              <p className="text-gray-700 mb-2">{dataset.description}</p>
              <p className="text-sm text-gray-600">Type: {dataset.indexed_type}</p>
              <p className="text-sm text-gray-600">Size: {dataset.file_size_gb} GB</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}