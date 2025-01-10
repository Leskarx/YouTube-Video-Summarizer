import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-100 mt-8">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="text-gray-600 text-sm">
            <span>© {new Date().getFullYear()} YouTube Summarizer. All rights reserved.</span>
            <br />
            <span className="text-gray-500">Made with ❤️ by Gouri Shankar</span>
          </div>
          <div className="flex space-x-6">
            <Link to="/about" className="text-gray-600 hover:text-primary-600 text-sm">
              About Us
            </Link>
            <Link to="/privacy" className="text-gray-600 hover:text-primary-600 text-sm">
              Privacy Policy
            </Link>
            <Link to="/support" className="text-gray-600 hover:text-primary-600 text-sm">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
