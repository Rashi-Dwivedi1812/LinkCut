// ShortUrlDisplay.tsx
import React from "react";

type Props = {
  shortUrl: string;
};

const ShortenUrl: React.FC<Props> = ({ shortUrl }) => {
  return (
    <div className="mt-6 p-4 bg-white bg-opacity-20 backdrop-blur-md rounded text-center text-white">
      <p className="mb-2 text-l">Your shortened URL:</p>
      <a
        href={shortUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-200 underline break-all"
      >
        {shortUrl}
      </a>
    </div>
  );
};

export default ShortenUrl;
