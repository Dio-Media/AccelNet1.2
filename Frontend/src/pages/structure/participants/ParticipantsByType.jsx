export function ParticipantsByType() {
  const types = [
    'Science',
    'Engineering',
    'Art',
    'Humanities',
    'Industry',
    'Government',
    'Media'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Participants by Type</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {types.map(type => (
          <div key={type} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
            <h3 className="text-xl font-semibold">{type}</h3>
            <p className="text-gray-600">View participants in {type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
