import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  // const apiKey = import.meta.env.VITE_YOUTUBE;
  const [url, setUrl] = useState('');
  const [onSubmit, setOnSubmit] = useState(true);
  const navigate = useNavigate();
  // console.log('API Key.......:', apiKey);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('URL----->:', url);
    // Here you would typically make an API call to process the URL
    sessionStorage.setItem('navigatedFromHome', 'true'); // Set navigation flag
  navigate('/summary', { state: { url } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] px-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          YouTube Video Summarizer
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Input a YouTube URL to generate an AI-powered summary of the video content.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste YouTube URL here"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Generate Summary
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;