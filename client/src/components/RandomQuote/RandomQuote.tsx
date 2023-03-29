// components/RandomQuote/RandomQuote.tsx
import React from "react";

const RandomQuote = ({ quotes }: { quotes: { quote: string; author: string }[] }) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const { quote, author } = quotes[randomIndex];

  return (
    <div className="bg-transparent text-black p-6 mt-4 rounded-lg shadow-sm">
      <p className="text-md italic">"{quote}"</p>
      <p className="text-md font-semibold mt-1">- {author}</p>
    </div>
  );
};

export default RandomQuote;
