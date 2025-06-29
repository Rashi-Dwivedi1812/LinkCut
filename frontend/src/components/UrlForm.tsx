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
    <form
      onSubmit={handleSubmit}
      className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 shadow-lg text-white"
    >
      <div className="mb-4">
        <label className="block mb-1">Enter URL to shorten</label>
        <input
          type="url"
          placeholder="https://example.com/very-long-url"
          className="w-full p-3 rounded bg-white bg-opacity-20 text-white placeholder-white focus:outline-none"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Custom Short Code (optional)</label>
        <input
          type="text"
          placeholder="my-custom-link"
          className="w-full p-3 rounded bg-white bg-opacity-20 text-white placeholder-white focus:outline-none"
          value={customShort}
          onChange={(e) => setCustomShort(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 py-3 rounded font-bold text-white flex justify-center items-center gap-2"
      >
        ⚡ Shorten URL
      </button>

      {error && <p className="text-red-300 mt-4">{error}</p>}
      {shortUrl && <ShortUrlDisplay shortUrl={shortUrl} />}
    </form>
  );
};

export default UrlForm;
