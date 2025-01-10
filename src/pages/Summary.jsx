import { useLocation, useNavigate } from "react-router-dom";

function Summary() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { thumbnail, title, summary } = state || {};

  if (!thumbnail || !title || !summary) {
    navigate("/"); // Redirect to Home if no data is available
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-primary-600 hover:text-primary-700 flex items-center"
      >
        ← Go Back
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-96 object-cover"
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>
          <div className="prose max-w-none">
            <p className="text-gray-600">{summary}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
