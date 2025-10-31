export function StructureIndex() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Structure</h1>
      <p className="text-lg text-gray-700 mb-6">
        Overview of our organizational structure.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <a href="/structure/steering-committee" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Steering Committee</h3>
          <p className="text-gray-600">Meet our steering committee members</p>
        </a>
        <a href="/structure/advisory-board" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Advisory Board</h3>
          <p className="text-gray-600">Our advisory board experts</p>
        </a>
        <a href="/structure/student-network" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Student Network</h3>
          <p className="text-gray-600">Connect with students</p>
        </a>
      </div>
    </div>
  );
}