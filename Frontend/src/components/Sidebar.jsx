import React, { useState, useContext } from "react";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { setSearchQuery, searchSongs, getLikedSongs, likedSongs } = useContext(PlayerContext);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearchClick = () => {
    setIsSearchActive(true);
    navigate("/search");
  };

  const handleFavoritesClick = () => {
    navigate("/favorites");
  };

  const likedSongsList = getLikedSongs();

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
        {/* Navigation */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl h-[15%] rounded-2xl flex flex-col justify-around border border-gray-700/50 shadow-xl">
          <div 
            onClick={() => navigate('/')} 
            className="flex items-center gap-4 pl-8 cursor-pointer hover:text-green-400 transition-all duration-200 group py-2"
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <img className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" src={assets.home_icon} alt="" />
            </div>
            <p className="font-bold">Home</p>
          </div>
          <div 
            onClick={handleSearchClick} 
            className="flex items-center gap-4 pl-8 cursor-pointer hover:text-green-400 transition-all duration-200 group py-2"
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <img className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" src={assets.search_icon} alt="" />
            </div>
            <p className="font-bold">Search</p>
          </div>
        </div>

        {/* Library */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl h-[85%] rounded-2xl border border-gray-700/50 shadow-xl">
          <div className="p-6 flex items-center justify-between border-b border-gray-700/50">
            <div className="flex items-center gap-3">
              <img className="w-8 h-8" src={assets.stack_icon} alt="" />
              <p className="font-bold text-lg">Your Library</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-8 h-8 hover:bg-gray-700/50 rounded-full flex items-center justify-center transition-colors duration-200">
                <img className="w-5 h-5" src={assets.arrow_icon} alt="" />
              </button>
              <button className="w-8 h-8 hover:bg-gray-700/50 rounded-full flex items-center justify-center transition-colors duration-200">
                <img className="w-5 h-5" src={assets.plus_icon} alt="" />
              </button>
            </div>
          </div>

          <div className="p-4 space-y-4">
            {/* Favorites Card */}
            <div 
              onClick={handleFavoritesClick}
              className="bg-gradient-to-br from-red-900/40 to-pink-900/40 p-6 rounded-2xl backdrop-blur-sm border border-red-700/30 hover:border-red-600/50 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <h2 className="font-bold text-lg">Liked Songs</h2>
                <span className="text-sm text-red-400 bg-red-900/30 px-2 py-1 rounded-full">{likedSongsList.length}</span>
              </div>
              <p className="text-gray-300 text-sm mb-4">Your favorite tracks all in one place</p>
              <button className="px-6 py-2.5 bg-red-500 hover:bg-red-400 text-white rounded-full text-sm font-semibold hover:scale-105 transition-all duration-200 shadow-lg">
                View Favorites
              </button>
            </div>

            {/* Podcasts Card */}
            <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 p-6 rounded-2xl backdrop-blur-sm border border-blue-700/30 hover:border-blue-600/50 transition-all duration-300">
              <h2 className="font-bold text-lg mb-2">Let's find some podcasts to follow</h2>
              <p className="text-gray-300 text-sm mb-4">We'll keep you updated on new episodes</p>
              <button className="px-6 py-2.5 bg-white text-black rounded-full text-sm font-semibold hover:scale-105 transition-all duration-200 shadow-lg">
                Browse Podcasts
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-20 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-gray-800/50 z-40">
        <div className="flex justify-around items-center py-3">
          <button 
            onClick={() => navigate('/')}
            className="flex flex-col items-center gap-1 p-2"
          >
            <img className="w-6 h-6" src={assets.home_icon} alt="" />
            <span className="text-xs text-gray-400">Home</span>
          </button>
          
          <button 
            onClick={handleSearchClick}
            className="flex flex-col items-center gap-1 p-2"
          >
            <img className="w-6 h-6" src={assets.search_icon} alt="" />
            <span className="text-xs text-gray-400">Search</span>
          </button>
          
          <button 
            onClick={handleFavoritesClick}
            className="flex flex-col items-center gap-1 p-2 relative"
          >
            <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span className="text-xs text-gray-400">Favorites</span>
            {likedSongsList.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {likedSongsList.length > 9 ? '9+' : likedSongsList.length}
              </span>
            )}
          </button>
          
          <button className="flex flex-col items-center gap-1 p-2">
            <img className="w-6 h-6" src={assets.stack_icon} alt="" />
            <span className="text-xs text-gray-400">Library</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;