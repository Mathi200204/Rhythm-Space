import React, { useContext, useState, useEffect } from "react";
import Navbar from "./Navbar";
import { PlayerContext } from "../context/PlayerContext";

const DisplaySearch = () => {
  const { searchSongs, searchResults, playSearchResult, toggleLike, isLiked } = useContext(PlayerContext);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim()) {
        searchSongs(query);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchSongs]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleLikeClick = (e, songId) => {
    e.stopPropagation();
    toggleLike(songId);
  };

  return (
    <>
      <Navbar />
      <div className="mt-4">
        {/* Search Input */}
        <div className="relative mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </div>
            <input
              type="text"
              placeholder="What do you want to listen to?"
              className="w-full py-4 pl-12 pr-4 bg-gray-900/60 backdrop-blur-sm text-white rounded-2xl border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 placeholder-gray-400"
              value={query}
              onChange={handleInputChange}
              autoFocus
            />
          </div>
        </div>

        {query.trim() ? (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-bold text-white">Search Results</h2>
              <div className="px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium border border-green-500/30">
                "{query}"
              </div>
            </div>
            
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {searchResults.map((song) => (
                  <div
                    key={song._id}
                    className="group bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl hover:bg-gray-800/60 transition-all duration-300 cursor-pointer border border-gray-700/30 hover:border-green-500/50 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/10"
                    onClick={() => playSearchResult(song)}
                  >
                    <div className="relative overflow-hidden rounded-xl mb-4">
                      <img
                        src={song.image}
                        alt={song.name}
                        className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Like Button */}
                      <button
                        onClick={(e) => handleLikeClick(e, song._id)}
                        className='absolute top-2 right-2 w-8 h-8 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110'
                      >
                        <svg 
                          className={`w-4 h-4 transition-colors duration-200 ${isLiked(song._id) ? 'text-red-500 fill-current' : 'text-white hover:text-red-400'}`} 
                          fill={isLiked(song._id) ? "currentColor" : "none"}
                          stroke="currentColor" 
                          strokeWidth={isLiked(song._id) ? "0" : "2"}
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </button>
                      
                      {/* Play Button */}
                      <div className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                    <h3 className="font-bold text-white text-lg mb-2 truncate group-hover:text-green-400 transition-colors duration-300">{song.name}</h3>
                    <p className="text-gray-400 text-sm truncate mb-2">{song.album}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded-full">{song.duration}</span>
                      {isLiked(song._id) && (
                        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-800/50 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-400 mb-2">No results found</h3>
                <p className="text-gray-500 text-lg">Try searching for something else</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-full flex items-center justify-center backdrop-blur-sm border border-purple-700/30">
              <svg className="w-16 h-16 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Search for songs
            </h2>
            <p className="text-gray-400 text-lg">Find your favorite songs, artists, and albums</p>
            
            {/* Quick Search Suggestions */}
            <div className="mt-12">
              <p className="text-gray-500 mb-4">Browse all</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                <div 
                  onClick={() => setQuery('pop')}
                  className="bg-gradient-to-br from-red-600 to-red-800 p-6 rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300"
                >
                  <p className="text-white font-bold text-lg">Pop</p>
                </div>
                <div 
                  onClick={() => setQuery('rock')}
                  className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300"
                >
                  <p className="text-white font-bold text-lg">Rock</p>
                </div>
                <div 
                  onClick={() => setQuery('hip hop')}
                  className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300"
                >
                  <p className="text-white font-bold text-lg">Hip Hop</p>
                </div>
                <div 
                  onClick={() => setQuery('electronic')}
                  className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300"
                >
                  <p className="text-white font-bold text-lg">Electronic</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DisplaySearch;