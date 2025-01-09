import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Summary from './pages/Summary';
import { MyContext } from './context/Context';
import { useContext } from 'react';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const { isLogin } = useContext(MyContext);
  console.log("...........>",isLogin);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute isAuthenticated={isLogin}>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="/summary" element={<Summary />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
