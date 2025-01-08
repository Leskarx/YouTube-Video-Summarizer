/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getYouTubeThumbnailAndTitle from '../actions/getThumblinTitle';
import {getTranscript} from '../actions/getTranscript'; // Import the transcript fetching function

function Summary() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { url } = state;

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch video details and transcript
    async function fetchData() {
      try {
        const { thumbnailUrl, videoTitle } = await getYouTubeThumbnailAndTitle(url);
        // const transcript = await fetchYouTubeTranscript(url);
        const transcript = await getTranscript(url);

        setSummary({
          title: videoTitle,
          thumbnail: thumbnailUrl,
          summary:  "Transcript not available for this video.",
        });
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
  }, [url]);

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
          className="w-full h-96 object-cover"
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
