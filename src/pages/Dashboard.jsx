import { useEffect, useState } from 'react';
import dataBaseObj from '../backendServices/dataBase';
import { MyContext } from '../context/Context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useContext(MyContext);
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true); // Track user context loading

  useEffect(() => {
    // Wait for user context to be available
    if (!userLoading && user?.["$id"]) {
      async function fetchSummaries() {
        try {
          const { documents } = await dataBaseObj.getDocuments(user["$id"]);
          console.log('Documents:', documents);
          setSummaries(documents);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching summaries:', error);
          setLoading(false);
        }
      }
      fetchSummaries();
    }
  }, [user, userLoading]);

  useEffect(() => {
    if (user) {
      setUserLoading(false); // Once user is available, stop loading
    }
  }, [user]);

  if (userLoading || loading) {
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
        {
          (summaries.length > 0) ? 
          summaries.map((summary) => (
            <div
              onClick={() => {
                navigate("/summary", {
                  state: {
                    thumbnail: summary.url,
                    title: summary.title,
                    summary: summary.summary,
                  },
                });
              }}
              key={summary.$id}
              className="bg-white transition cursor-pointer hover:scale-105 rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={summary.url}
                alt={summary.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{summary.title}</h2>
                <p className="text-gray-500 text-sm">{summary.date}</p>
              </div>
            </div>
          )) : <p className="text-gray-600 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2">No Data found</p>
        }
      </div>
    </div>
  );
}

export default Dashboard;
