export function ActivitiesIndex() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Activities</h1>
      <p className="text-lg text-gray-700 mb-6">
        View all our activities and events.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a href="/activities/conferences" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-2xl font-semibold mb-2">Conferences</h3>
          <p className="text-gray-600">Browse our conferences and major events</p>
        </a>
        <a href="/activities/workshops" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-2xl font-semibold mb-2">Workshops</h3>
          <p className="text-gray-600">Explore workshops and training sessions</p>
        </a>
      </div>
    </div>
  );
}
