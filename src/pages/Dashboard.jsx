import { useEffect, useState } from 'react';

function Dashboard() {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSummaries([
        {
          id: 1,
          title: 'Sample Video 1',
          thumbnail: 'https://via.placeholder.com/320x180',
          summary: 'This is a sample summary for video 1.',
          date: '2024-03-15',
        },
        {
          id: 2,
          title: 'Sample Video 2',
          thumbnail: 'https://via.placeholder.com/320x180',
          summary: 'This is a sample summary for video 2.',
          date: '2024-03-14',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Summaries</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {summaries.map((summary) => (
          <div key={summary.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={summary.thumbnail}
              alt={summary.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{summary.title}</h2>
              <p className="text-gray-600 text-sm mb-4">{summary.summary}</p>
              <p className="text-gray-500 text-sm">{summary.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;