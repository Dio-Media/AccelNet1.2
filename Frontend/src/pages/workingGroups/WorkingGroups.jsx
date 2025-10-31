export function WorkingGroup() {
  const [workingGroup, setWorkingGroup] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Get ID from URL - you'll need to implement this based on your routing
    const id = window.location.pathname.split('/').pop();
    
    fetch(`/api/working-groups/${id}`)
      .then(response => response.json())
      .then(data => {
        setWorkingGroup(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching working group:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-8">Loading...</div>;
  if (!workingGroup) return <div className="max-w-7xl mx-auto px-4 py-8">Working group not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{workingGroup.wg_name}</h1>
      <p className="text-xl text-gray-600 mb-6">{workingGroup.wg_code}</p>
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p className="text-gray-700">{workingGroup.wg_description}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workingGroup.members?.map(member => (
            <div key={member.membership_id} className="p-4 border rounded">
              <h3 className="font-semibold">{member.first_name} {member.last_name}</h3>
              <p className="text-sm text-gray-600">{member.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}