import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import getYouTubeThumbnailAndTitle from "../actions/getThumblinTitle";
import dataBaseObj from "../backendServices/dataBase";
import { MyContext } from "../context/Context";
import { getTranscript } from "../actions/getTranscript";
import { FaYoutube } from "react-icons/fa";
import AuthModal from "../components/AuthModal";

function Home() {
  const { isLogin, user } = useContext(MyContext);
  const userId = user?.["$id"];
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const convertYouTubeUrl = (shortUrl) => {
    try {
      const url = new URL(shortUrl);
      if (url.hostname === "youtu.be") {
        const videoId = url.pathname.substring(1);
        return `https://www.youtube.com/watch?v=${videoId}`;
      }
      return shortUrl;
    } catch (error) {
      console.error("Invalid YouTube URL:", error);
      return shortUrl;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const normalizedUrl = convertYouTubeUrl(url);
      const { thumbnailUrl, videoTitle } = await getYouTubeThumbnailAndTitle(normalizedUrl);
      const summary = await getTranscript(normalizedUrl);

      if (isLogin) {
        try {
          await dataBaseObj.createDocument(summary, videoTitle, thumbnailUrl, userId);
        } catch (error) {
          console.error("Error creating document:", error);
        }
      }

      navigate("/summary", {
        state: {
          thumbnail: thumbnailUrl,
          title: videoTitle,
          summary: summary || "Transcript not available for this video.",
        },
      });
    } catch (error) {
      console.error("Error fetching video details or summary:", error);
      setError("Failed to fetch video details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] px-4">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          Welcome to YouTube Video Summarizer
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          A cutting-edge tool that allows you to generate AI-powered summaries of
          your favorite YouTube videos. Enhance your productivity by quickly
          grasping the essence of video content without watching it entirely.
        </p>
        {isLogin ? (
          <div className="space-y-4">
            <p className="text-md text-gray-700 mb-6">
              Enter a YouTube URL to generate a video summary instantly.
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
                className={`w-full sm:w-auto bg-primary-600 text-white px-8 py-3 rounded-lg ${loading ? "cursor-not-allowed bg-gray-400" : "hover:bg-primary-700"}`}
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate Summary"}
              </button>
            </form>
            {error && <p className="text-red-600 mt-4">{error}</p>}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-4">
              <FaYoutube size={50} className="text-red-500" />
              <p className="text-xl font-medium text-gray-700">
                Get started by logging in to access the summarizer.
              </p>
            </div>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700"
            >
              Login / Sign Up
            </button>
          </div>
        )}
      </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}

export default Home;
