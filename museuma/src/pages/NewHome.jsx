import React from 'react';

function NewHome() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">Welcome to AccelNet</h1>
          <p className="text-xl mb-8">Accelerating Research through International Network-to-Network Collaborations</p>
          <div className="flex gap-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold">
              Explore The Working Groups
            </button>
            <button className="border-2 border-white px-6 py-3 rounded-lg font-semibold">
              Latest News
            </button>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* News cards will go here */}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600">50+</div>
              <div className="text-gray-600">Exhibitions</div>
            </div>
            {/* More stats */}
          </div>
        </div>
      </section>
    </main>
  );
}

export default NewHome;