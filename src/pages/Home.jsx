import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import getYouTubeThumbnailAndTitle from "../actions/getThumblinTitle";
import dataBaseObj from "../backendServices/dataBase";
import { MyContext } from "../context/Context";

function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { isLogin, user } = useContext(MyContext);
  const userId = user?.["$id"]
  ;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { thumbnailUrl, videoTitle } = await getYouTubeThumbnailAndTitle(url);

      // Mocking a summary for now
      const summary = "This is a generated summary for the video.";

      // Save to database if logged in
      if (isLogin) {
        console.log("User is logged in. Saving data to database...",userId);
        try {
          await dataBaseObj.createDocument(summary, videoTitle, thumbnailUrl, userId);
          console.log("Document created successfully!");
        } catch (error) {
          console.error("Error creating document:", error);
        }
      }

      // Navigate to summary page with data
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
            className={`w-full sm:w-auto bg-primary-600 text-white px-8 py-3 rounded-lg transition-colors ${
              loading ? "cursor-not-allowed bg-gray-400" : "hover:bg-primary-700"
            }`}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Summary"}
          </button>
        </form>
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default Home;
