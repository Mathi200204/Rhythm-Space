import React, { useContext, useState, useEffect } from "react";
import Navbar from "./Navbar";
import { PlayerContext } from "../context/PlayerContext";
import { assets } from "../assets/assets";

const DisplaySearch = () => {
  const { searchSongs, searchResults, searchQuery, setSearchQuery, playSearchResult } = useContext(PlayerContext);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim()) {
        searchSongs(query);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="mt-4">
        <div className="relative mb-8">
          <img className="absolute left-3 top-3 w-5" src={assets.search_icon} alt="Search" />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            className="w-full p-3 pl-10 bg-[#242424] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            value={query}
            onChange={handleInputChange}
            autoFocus
          />
        </div>

        {query.trim() ? (
          <div>
            <h2 className="text-2xl font-bold mb-6">Search Results for "{query}"</h2>
            
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {searchResults.map((song) => (
                  <div
                    key={song._id}
                    className="bg-[#181818] p-4 rounded-md hover:bg-[#282828] transition-colors cursor-pointer"
                    onClick={() => playSearchResult(song)}
                  >
                    <img
                      src={song.image}
                      alt={song.name}
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                    <h3 className="font-semibold text-white truncate">{song.name}</h3>
                    <p className="text-sm text-gray-400 truncate">{song.album}</p>
                    <p className="text-xs text-gray-500 mt-2">{song.duration}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No results found for "{query}"</p>
                <p className="text-gray-500 text-sm mt-2">Try searching for something else</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Search for songs</h2>
            <p className="text-gray-400">Find your favorite songs, artists, and albums</p>
          </div>
        )}
      </div>
    </>
  );
};

export default DisplaySearch;