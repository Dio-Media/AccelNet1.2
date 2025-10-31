export function Journals() {
  const [journals, setJournals] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/publications/type/journal')
      .then(response => response.json())
      .then(data => {
        setJournals(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching journals:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Journal Publications</h1>
      {loading ? (
        <p>Loading journals...</p>
      ) : (
        <div className="space-y-4">
          {journals.map(journal => (
            <div key={journal.publication_id} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">{journal.title}</h3>
              <p className="text-gray-600 mb-2">{journal.journal_name}</p>
              <p className="text-gray-700">{journal.abstract}</p>
              {journal.url && (
                <a href={journal.url} className="text-blue-600 hover:underline mt-2 inline-block" target="_blank" rel="noopener noreferrer">
                  Read More →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}