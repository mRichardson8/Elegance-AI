import React, { useCallback, useState } from "react";
import Sidebar from "../src/components/Sidebar/Sidebar";
import Card from "./components/Card/Card";
import Header from "./components/Header/Header";
import InstructionSection from "./components/InstructionSection/InstructionSection";
import RandomQuote from "./components/RandomQuote/RandomQuote";
import { ProductObject, ServerResponse } from "./lib/types/types";

const fashionQuotes = [
  {
    quote: "My personal ambition remains the same - to be creative, to be modern, to stay one step ahead, to enjoy life.",
    author: "Natalie Massenet - Founder of Net-a-Porter:"
  },
  {
    quote: "I think personalization is the future. People want something unique, and they want to feel more connected to what they're wearing.",
    author: "Stella McCartney - Renowned Fashion Designer"
  },
  {
    quote: "Dressing well is a form of good manners.",
    author: "Tom Ford - Fashion Designer and Filmmaker"
  },
  {
    quote: "Fashion changes, but style endures.",
    author: "Coco Chanel - Iconic Fashion Designer"
  }
];

const App = () => {
  const [searchResults, setSearchResults] = useState<ServerResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(searchResults);
  const handleSearchResults = useCallback((data: ServerResponse[], isLoading: boolean) => {
    setSearchResults(data);
    setIsLoading(isLoading);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-100 h-50 m-1 p-1 bg-white shadow-sm rounded-md flex items-center justify-center">
        <h1 className="text-2xl mr-auto font-bold">
          MADCAP VIRTUAL TRENDSETTERS
        </h1>
      </div>
      <Sidebar
        onSearchResults={handleSearchResults}
        onLoadingChange={setIsLoading}
        isLoading={isLoading}
      />

      <div className="main-container w-3/4 ml-auto mr-10 p-4 pb-10 mb-10 flex flex-col items-center justify-center h-screen">
        {searchResults.length < 1 && <InstructionSection />}
        {isLoading ? (
          <></>
        ) : (
          searchResults &&
          searchResults.map((item, index) => {
            console.log("MAPP", index, item);
            if (index > 0) return;
            return (
              <>
                <h2> {item[0].store.toLocaleUpperCase() }</h2>
                <button className="bg-white-200 text-black py-1 px-4 rounded-full border-2 border-black transition-all duration-300 hover:bg-black hover:text-white">
                  Buy Outfit{" "}
                </button>
              </>
            );
          })
        )}
        {/* <div className="w-100 h-50 m-1 p-1 bg-white shadow-sm border-4 rounded-md flex items-center justify-center"></div> */}
        <div className="flex flex-wrap justify-center items-center mt-3">
          {isLoading ? (
            <p> Loading </p>
          ) : (
            searchResults &&
            searchResults.map((item: ProductObject[], index) => (
              <>
                <Card key={`${index}`} data={item} />
              </>
            ))
          )}
        </div>
        <RandomQuote quotes={fashionQuotes} />
      </div>
    </div>
  );
};

export default App;
