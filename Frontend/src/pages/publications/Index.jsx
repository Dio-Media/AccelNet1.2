export function PublicationsIndex() {
  const [publications, setPublications] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/publications')
      .then(response => response.json())
      .then(data => {
        setPublications(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching publications:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Publications</h1>
      <div className="mb-6 flex gap-4">
        <a href="/publications/datasets" className="text-blue-600 hover:underline">
          View Datasets →
        </a>
        <a href="/publications/journals" className="text-blue-600 hover:underline">
          View Journals →
        </a>
      </div>
      {loading ? (
        <p>Loading publications...</p>
      ) : (
        <div className="space-y-4">
          {publications.map(pub => (
            <div key={pub.publication_id} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">{pub.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{pub.journal_name} • {new Date(pub.publication_date).getFullYear()}</p>
              <p className="text-gray-700 mb-2">{pub.abstract}</p>
              {pub.doi && (
                <a href={`https://doi.org/${pub.doi}`} className="text-blue-600 text-sm hover:underline" target="_blank" rel="noopener noreferrer">
                  DOI: {pub.doi}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}