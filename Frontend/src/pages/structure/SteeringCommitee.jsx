export function SteeringCommittee() {
  const [members, setMembers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Fetch committee members using native fetch
    fetch('/api/committees/1')
      .then(response => response.json())
      .then(data => {
        setMembers(data.members || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching committee:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Steering Committee</h1>
      <p className="text-lg text-gray-700 mb-6">
        Meet our steering committee members who guide the strategic direction of AccelNet.
      </p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map(member => (
            <div key={member.member_id} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold">{member.first_name} {member.last_name}</h3>
              <p className="text-gray-600">{member.committee_position}</p>
              <p className="text-sm text-gray-500">{member.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}