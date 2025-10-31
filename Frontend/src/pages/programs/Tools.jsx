export function Tools() {
  const [tools, setTools] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/tools')
      .then(response => response.json())
      .then(data => {
        setTools(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching tools:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Tools & Resources</h1>
      {loading ? (
        <p>Loading tools...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map(tool => (
            <div key={tool.tool_id} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
              <p className="text-gray-700 mb-4">{tool.description}</p>
              <div className="flex gap-2">
                {tool.repository_url && (
                  <a href={tool.repository_url} className="text-blue-600 text-sm hover:underline" target="_blank" rel="noopener noreferrer">
                    Repository
                  </a>
                )}
                {tool.documentation_url && (
                  <a href={tool.documentation_url} className="text-blue-600 text-sm hover:underline" target="_blank" rel="noopener noreferrer">
                    Documentation
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}