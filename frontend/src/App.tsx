import React from "react";
import UrlForm from "./components/UrlForm";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
      <header className="flex justify-between items-center text-white mb-10">
        <h1 className="text-2xl font-bold">🔗 LinkCut</h1>
        <nav className="space-x-4">
          <button className="bg-white bg-opacity-20 px-4 py-1 rounded hover:bg-opacity-40">Home</button>
          <button className="bg-white bg-opacity-20 px-4 py-1 rounded hover:bg-opacity-40">Analytics</button>
        </nav>
      </header>

      <div className="text-center text-white mb-10">
        <h2 className="text-4xl font-bold mb-4">Shorten Your <span className="text-blue-200">Links</span></h2>
        <p className="text-lg max-w-xl mx-auto">
          Create short, memorable links that are perfect for sharing. Fast, secure, and reliable URL shortening service.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <UrlForm />
      </div>
    </div>
  );
};

export default App;
