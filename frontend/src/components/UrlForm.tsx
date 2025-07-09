import React, { useState } from "react";
import ShortUrlDisplay from "./ShortenUrl";
import axios from "axios";

const UrlForm: React.FC = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customShort, setCustomShort] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setShortUrl(null);

    try {
      const api = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.post(`${api}/${customShort}`, {
        url: originalUrl,
        short: customShort,
        expiry: 24,
      });
      setShortUrl(response.data.short);
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <>
      <form
  onSubmit={handleSubmit}
  className="bg-gray-800 bg-opacity-70 backdrop-blur-lg rounded-2xl p-8 max-w-4xl ml-auto mr-auto md:ml-24 
             shadow-2xl text-white border border-gray-700 
             transition-all duration-300 transform hover:scale-[1.02] hover:shadow-purple-600/30"
>

        <div className="mb-5">
          <label className="block mb-2 text-l text-gray-300">Enter URL to shorten</label>
          <input
            type="url"
            placeholder="https://example.com/very-long-url"
            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-l text-gray-300">Custom Short Code (optional)</label>
          <input
            type="text"
            placeholder="my-custom-link"
            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={customShort}
            onChange={(e) => setCustomShort(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-pink-700 hover:to-indigo-700 py-3 rounded-lg font-semibold text-white transition duration-200"
        >
          ⚡ Shorten URL
        </button>

        {error && <p className="text-red-400 mt-4">{error}</p>}
        {shortUrl && <ShortUrlDisplay shortUrl={shortUrl} />}
      </form>

      {/* ⬇️ Feature Section Below the Form */}
<div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-gray-300">
  <div className="bg-gray-800 bg-opacity-60 p-6 rounded-xl shadow-md hover:shadow-pink-600/30 transition-transform duration-300 transform hover:-translate-y-1">
    <h3 className="text-lg font-semibold text-pink-400 mb-2">🌐 Global CDN</h3>
    <p className="text-sm">Lightning-fast redirects worldwide with our global content delivery network.</p>
  </div>

  <div className="bg-gray-800 bg-opacity-60 p-6 rounded-xl shadow-md hover:shadow-purple-500/30 transition-transform duration-300 transform hover:-translate-y-1">
    <h3 className="text-lg font-semibold text-purple-400 mb-2">🔒 Secure Links</h3>
    <p className="text-sm">All links are secured with HTTPS and protected against malicious content.</p>
  </div>

  <div className="bg-gray-800 bg-opacity-60 p-6 rounded-xl shadow-md hover:shadow-indigo-500/30 transition-transform duration-300 transform hover:-translate-y-1">
    <h3 className="text-lg font-semibold text-indigo-400 mb-2">📊 Analytics</h3>
    <p className="text-sm">Track your link performance with detailed analytics and insights.</p>
  </div>
</div>

    </>
  );
};

export default UrlForm;
