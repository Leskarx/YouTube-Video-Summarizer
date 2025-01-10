import { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import getYouTubeThumbnailAndTitle from '../actions/getThumblinTitle';
import dataBaseObj from '../backendServices/dataBase';
import { MyContext } from '../context/Context';

function Summary() {
  const { isLogin } = useContext(MyContext);
  const { user } = useContext(MyContext);
  const userId = user?.["$id"];
  
  const navigate = useNavigate();
  const { state } = useLocation();
  const { url } = state || {};

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const navigated = sessionStorage.getItem('navigatedFromHome') === 'true';
    sessionStorage.removeItem('navigatedFromHome'); // Clear flag after checking

    if (!url) {
      console.error('URL not provided. Redirecting to home...');
      navigate('/'); // Redirect if no URL is provided
      return;
    }

    async function fetchData() {
      try {
        const { thumbnailUrl, videoTitle } = await getYouTubeThumbnailAndTitle(url);
        const summary = "test";

        setSummary({
          title: videoTitle,
          thumbnail: thumbnailUrl,
          summary: summary || "Transcript not available for this video.",
        });

        // Run logic only if navigated from home page
        if (isLogin && navigated) {
          console.log("....calling function....>", navigated);
          // try {
          //   await dataBaseObj.createDocument(summary, videoTitle, thumbnailUrl, userId);
          // } catch (error) {
          //   console.error("Error in create Document", error);
          // }
        }

      } catch (error) {
        console.error('Error fetching video details or transcript:', error);
        setSummary({
          title: 'Error',
          thumbnail: 'https://helpdeskgeek.com/wp-content/pictures/2021/09/youtube-error.jpeg',
          summary: 'Failed to fetch video details or transcript. Please try again later.',
        });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url, isLogin, navigate, userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Generating summary...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-primary-600 hover:text-primary-700 flex items-center"
      >
        ← Go Back
      </button>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={summary.thumbnail}
          alt={summary.title}
          className="w-full h-96 object-cover "
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{summary.title}</h1>
          <div className="prose max-w-none">
            <p className="text-gray-600">{summary.summary}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
