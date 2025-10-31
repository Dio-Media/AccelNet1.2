export function Grants() {
  const [grants, setGrants] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/grants')
      .then(response => response.json())
      .then(data => {
        setGrants(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching grants:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Grants & Funding</h1>
      <p className="text-lg text-gray-700 mb-6">
        Information about available grants and funding opportunities.
      </p>
      {loading ? (
        <p>Loading grants...</p>
      ) : (
        <div className="space-y-4">
          {grants.map(grant => (
            <div key={grant.application_id} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Grant Application</h3>
              <p className="text-gray-600 mb-2">
                Applied: {new Date(grant.application_date).toLocaleDateString()}
              </p>
              <p className="text-sm">
                <span className={`inline-block px-3 py-1 rounded ${
                  grant.status === 'approved' ? 'bg-green-100 text-green-800' :
                  grant.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {grant.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}