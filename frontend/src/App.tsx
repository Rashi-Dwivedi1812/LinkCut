import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UrlForm from "./components/UrlForm";
import AnalyticsPage from "./components/AnalyticsPage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white p-6 font-sans">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-pink-500">🔗 LinkCut</h1>
          <nav className="space-x-4">
            <Link to="/">
              <button className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition duration-200">
                Home
              </button>
            </Link>
            <Link to="/analytics">
              <button className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition duration-200">
                Analytics
              </button>
            </Link>
          </nav>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <div>
                <div className="text-center mb-10">
                  <h2 className="text-4xl font-bold mb-4">
                    Shorten Your <span className="text-pink-300">Links</span>
                  </h2>
                  <p className="text-lg max-w-2xl mx-auto text-gray-300">
                    Create short, memorable links that are perfect for sharing. Fast, secure, and reliable URL shortening service.
                  </p>
                </div>

                <div className="max-w-6xl mx-auto">
                  <UrlForm />
                </div>
              </div>
            }
          />

          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
