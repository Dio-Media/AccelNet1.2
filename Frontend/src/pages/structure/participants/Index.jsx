export function ParticipantsIndex() {
  const [participants, setParticipants] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/profiles')
      .then(response => response.json())
      .then(data => {
        setParticipants(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching participants:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Participants</h1>
      <p className="text-lg text-gray-700 mb-6">
        Browse all participants in our network.
      </p>
      <div className="mb-6">
        <a href="/structure/participants/by-type" className="text-blue-600 hover:underline">
          View by Type →
        </a>
      </div>
      {loading ? (
        <p>Loading participants...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {participants.map(participant => (
            <div key={participant.user_id} className="bg-white p-6 rounded-lg shadow">
              <img 
                src={participant.profile_image_url || '/default-avatar.png'} 
                alt={`${participant.first_name} ${participant.last_name}`}
                className="w-20 h-20 rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">{participant.first_name} {participant.last_name}</h3>
              <p className="text-gray-600">{participant.title}</p>
              {participant.linkedin_handle && (
                <a href={`https://linkedin.com/in/${participant.linkedin_handle}`} 
                   className="text-blue-600 text-sm hover:underline"
                   target="_blank" 
                   rel="noopener noreferrer">
                  LinkedIn Profile
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}