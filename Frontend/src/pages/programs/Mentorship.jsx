export function Mentorship() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Mentorship Program</h1>
      <p className="text-lg text-gray-700 mb-6">
        Join our mentorship program to connect with experienced professionals and advance your career.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">For Mentees</h3>
          <p className="text-gray-700 mb-4">
            Gain valuable insights and guidance from experienced researchers in your field.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>One-on-one mentoring sessions</li>
            <li>Career development advice</li>
            <li>Research collaboration opportunities</li>
            <li>Networking events</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">For Mentors</h3>
          <p className="text-gray-700 mb-4">
            Share your expertise and help shape the next generation of researchers.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Give back to the community</li>
            <li>Develop leadership skills</li>
            <li>Expand your network</li>
            <li>Stay connected with emerging trends</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
