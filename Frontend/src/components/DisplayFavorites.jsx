import React, { useContext } from "react";
import Navbar from "./Navbar";
import { PlayerContext } from "../context/PlayerContext";
import { assets } from "../assets/assets";

const DisplayFavorites = () => {
  const { playWithId, getLikedSongs, toggleLike, isLiked } = useContext(PlayerContext);
  
  const likedSongs = getLikedSongs();

  const handleLikeClick = (e, songId) => {
    e.stopPropagation();
    toggleLike(songId);
  };

  return (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <div className="relative group">
          <div className="w-64 h-64 rounded-3xl shadow-2xl shadow-red-500/20 bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center">
            <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-pink-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="flex flex-col">
          <p className="text-red-400 font-semibold mb-2 text-sm uppercase tracking-wider">Playlist</p>
          <h2 className="text-6xl font-black mb-6 md:text-8xl bg-gradient-to-r from-white via-red-200 to-pink-200 bg-clip-text text-transparent">Liked Songs</h2>
          <h4 className="text-gray-300 text-lg mb-4 leading-relaxed">Your favorite tracks collected in one place</h4>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <img className="w-6 h-6" src={assets.rhythm_space} alt="" />
            <span className="font-bold text-white">Rhythm-Space</span>
            <span>•</span>
            <span className="text-red-400">{likedSongs.length} songs</span>
            {likedSongs.length > 0 && (
              <>
                <span>•</span>
                <span>about {Math.ceil(likedSongs.length * 3 / 60)} hr</span>
              </>
            )}
          </div>
        </div>
      </div>

      {likedSongs.length > 0 ? (
        <>
          {/* Play Button */}
          <div className="mt-8 mb-6">
            <button 
              onClick={() => playWithId(likedSongs[0]._id)}
              className="w-16 h-16 bg-red-500 hover:bg-red-400 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-red-500/40"
            >
              <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
          </div>

          <div className="bg-gray-900/30 rounded-2xl backdrop-blur-sm border border-gray-700/50 overflow-hidden">
            <div className="grid grid-cols-3 sm:grid-cols-4 px-6 py-4 text-gray-400 border-b border-gray-700/50 text-sm font-medium">
              <p><span className="mr-4">#</span>Title</p>
              <p>Album</p>
              <p className="hidden sm:block">Date Added</p>
              <div className="flex justify-center">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>
            
            {likedSongs.map((item, index) => (
              <div 
                onClick={() => playWithId(item._id)} 
                key={item._id} 
                className="grid grid-cols-3 sm:grid-cols-4 gap-4 px-6 py-4 items-center text-gray-300 hover:bg-white/5 cursor-pointer transition-all duration-200 group border-b border-gray-800/30 last:border-b-0"
              >
                <div className="flex items-center text-white">
                  <span className="mr-4 text-gray-400 font-medium w-4 text-right group-hover:hidden">{index + 1}</span>
                  <svg className="mr-4 w-4 h-4 text-red-400 hidden group-hover:block" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  <img className="w-12 h-12 rounded-lg mr-4 shadow-md hidden sm:block" src={item.image} alt="" />
                  <div className="flex flex-col">
                    <span className="font-medium group-hover:text-red-400 transition-colors duration-200">{item.name}</span>
                    <span className="text-gray-400 text-sm hidden sm:block">{item.desc.slice(0, 30)}...</span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">Single</p>
                <p className="text-gray-400 text-sm hidden sm:block">Recently added</p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={(e) => handleLikeClick(e, item._id)}
                    className="text-red-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-200"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </button>
                  <p className="text-gray-400 text-sm">{item.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-20 mt-12">
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-red-900/40 to-pink-900/40 rounded-full flex items-center justify-center backdrop-blur-sm border border-red-700/30">
            <svg className="w-16 h-16 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
            No liked songs yet
          </h2>
          <p className="text-gray-400 text-lg mb-8">Songs you like will appear here</p>
          <button 
            onClick={() => window.history.back()}
            className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Find music you love
          </button>
        </div>
      )}
    </>
  );
};

export default DisplayFavorites;