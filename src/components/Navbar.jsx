import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { Dialog } from "@headlessui/react";
import { MyContext } from "../context/Context";
import authObj from "../backendServices/auth";
import { FaYoutube } from "react-icons/fa"; // Import YouTube icon from react-icons

function Navbar() {
  const { isLogin, setIsLogin } = useContext(MyContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await authObj.logout();
      if (res) {
        setIsLogin(false);
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-primary-600 text-xl font-bold">
              YouTube Summarizer
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-6">
            <Link
              to="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-primary-600 flex items-center space-x-2"
            >
              <FaYoutube className="text-red-600 h-5 w-5" />
              <span>Open YouTube</span>
            </Link>
            {isLogin ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-primary-600 border-b-2 border-transparent hover:border-primary-600 transition-all"
                >
                  View Summaries
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : null}
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="text-gray-700 hover:text-primary-600"
            >
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <Dialog
        as="div"
        open={isMenuOpen}
        onClose={setIsMenuOpen}
        className="fixed inset-0 z-40 sm:hidden"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-primary-600 text-xl font-bold">
              YouTube Summarizer
            </Link>
            <button onClick={() => setIsMenuOpen(false)}>
              <FiX className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flex flex-col space-y-4">
            <Link
              to="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-primary-600 flex items-center space-x-2"
            >
              <FaYoutube className="text-red-600 h-5 w-5" />
              <span>Open YouTube</span>
            </Link>
            {isLogin ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-primary-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  View Summaries
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsMenuOpen(false)}
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
              >
                Login / Sign Up
              </button>
            )}
          </div>
        </div>
      </Dialog>
    </nav>
  );
}

export default Navbar;
