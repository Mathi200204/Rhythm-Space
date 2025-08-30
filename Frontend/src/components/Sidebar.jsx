import React, { useState, useContext } from "react";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { setSearchQuery, searchSongs } = useContext(PlayerContext);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearchClick = () => {
    setIsSearchActive(true);
    navigate("/search");
  };

  return (
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
         
          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 p-6 rounded-2xl backdrop-blur-sm border border-purple-700/30 hover:border-purple-600/50 transition-all duration-300">
            <h2 className="font-bold text-lg mb-2"> your favorite playlist</h2>
            <p className="text-gray-300 text-sm mb-4">show your favorites</p>
            <button className="px-6 py-2.5 bg-white text-black rounded-full text-sm font-semibold hover:scale-105 transition-all duration-200 shadow-lg">
              favorites
            </button>
          </div>

          {/* Podcasts Card */}
          <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 p-6 rounded-2xl backdrop-blur-sm border border-blue-700/30 hover:border-blue-600/50 transition-all duration-300">
            <h2 className="font-bold text-lg mb-2">Let's find some podcasts to follow</h2>
            <p className="text-gray-300 text-sm mb-4">We'll keep you updated on new episodes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;