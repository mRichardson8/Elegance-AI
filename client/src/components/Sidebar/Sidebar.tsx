import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createOutfit } from "../../lib/fetchers/fetchers";
import styles from "../Sidebar/Sidebar.module.css";
import { ServerResponse } from "../../lib/types/types";

interface SidebarProps {
  onSearchResults: (data: ServerResponse[], isLoading: boolean) => void;
  isLoading: boolean;
  onLoadingChange: (isLoading: boolean) => void;
}


const Sidebar = ({ onSearchResults, onLoadingChange, isLoading }: SidebarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [gender, setGender] = useState("male");
  const [instructionsExpanded, setInstructionsExpanded] = useState(false);

  const toggleInstructions = () => {
    setInstructionsExpanded(!instructionsExpanded);
    console.log(instructionsExpanded);
  };

  const { mutate, error, isError } = useMutation(createOutfit, {
    onSuccess: (data: any) => {
      onLoadingChange(false);
      onSearchResults(data, isLoading);
    },
    onError: (err: Error) => {
      onLoadingChange(false);
      console.error("Error occurred during outfit creation:", err);
    },
  });

  if (isError) {
    // Render an error message or an error component
    <div> ERRROR MESAGE HERE</div>;
  }

  const handleSearch = async () => {
    if (searchTerm) {
      onLoadingChange(true);
      const result = await mutate({ searchTerm, gender });
    }
  };

  return (
    <div
      className="sidebar w-1/8 h-full bg-white fixed p-6 shadow-lg overflow-y-auto" // Add 'overflow-y-auto'
      style={{ height: "calc(100vh - 6rem)" }} // Add a height style with some space for the top navigation bar
    >
    

      {/* Add a label for the input field */}
      <label htmlFor="search-term" className="block mb-2 text-gray-700">
          <h2 className="text-lg font-semibold mb-0 font-serif">Search</h2>
      </label>

      <input
        id="search-term"
        type="text"
        placeholder="e.g., Wedding, Cocktail Party"
        className="w-full p-2 border border-gray-300 rounded-md mb-6 text-gray-700 placeholder-smaller"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        <select
          className="w-full p-2 border border-gray-300 rounded-md mb-6 text-gray-700"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
     
          <option value="Female">Female</option>
          <option value="Male">Male</option>
        </select>
      </div>
      <div>
        <button
          className={`w-full py-2 rounded-md border-2 border-black ${styles.button}`} // Apply the className from the CSS module
          disabled={searchTerm.length < 1 || isLoading}
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
