import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaYoutube } from "react-icons/fa";
import AuthModal from './AuthModal';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-primary-600 text-xl font-bold">
              YouTube Summarizer
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
           <Link to="https://www.youtube.com/" target='_blank' title='Go to Youtube'>
           <div  className='text-red-500  cursor-pointer'>
            <FaYoutube size={45} />
            </div>
           </Link>
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-primary-600">
                  My Summaries
                </Link>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
              >
                Login / Sign Up
              </button>
            )}
          </div>

          {/* Mobile menu button */}
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

      {/* Mobile menu */}
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
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-primary-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Summaries
                </Link>
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    setIsMenuOpen(false);
                  }}
                  className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
              >
                Login / Sign Up
              </button>
            )}
          </div>
        </div>
      </Dialog>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={() => {
          setIsLoggedIn(true);
          setIsAuthModalOpen(false);
        }}
      />
    </nav>
  );
}

export default Navbar;