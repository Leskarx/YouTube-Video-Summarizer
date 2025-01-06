/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Summary() {
  

  const location = useLocation();
  const navigate = useNavigate();
  const {state} = useLocation();
  const {url}=state;
  console.log('URL----->:', url);
 
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSummary({
        title: "hello",
        thumbnail: 'https://i.ytimg.com/vi/Lj5fyDX01v8/hqdefault.jpg',
        summary: 'This is a placeholder summary of the video content. In a real application, this would be generated by processing the YouTube video content through an AI system.',
      });
      setLoading(false);
    }, 1500);
  }, []);

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