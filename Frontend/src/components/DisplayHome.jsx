import React, { useContext } from "react";
import Navbar from "./Navbar";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import { PlayerContext } from "../context/PlayerContext";

const DisplayHome = () => {
  const { songsData, albumsData, musicFilter, getLikedSongs, likedSongs } = useContext(PlayerContext);

  const likedSongsList = getLikedSongs();

  if (musicFilter) {
    // Show only music/songs when music filter is active
    return (
      <>
        <Navbar />
        
        {/* Music Section */}
        <div className="mb-12 mt-8">
          <div className="bg-gradient-to-r from-green-900/40 via-blue-900/40 to-purple-900/40 rounded-3xl p-8 backdrop-blur-sm border border-gray-700/30">
            <h1 className="text-4xl font-black mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              All Music
            </h1>
            <p className="text-gray-300 text-lg">Discover all your favorite songs in one place</p>
          </div>
        </div>

        {/* All Songs Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">All Songs</h2>
            <div className="h-px bg-gradient-to-r from-green-500 to-transparent flex-1 ml-6"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {songsData.map((item) => (
              <SongItem
                key={item._id}
                name={item.name}
                desc={item.desc}
                id={item._id}
                image={item.image}
              />
            ))}
          </div>
        </div>

        {/* Liked Songs Section - Only show if there are liked songs */}
        {likedSongsList.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                Liked Songs
              </h2>
              <div className="h-px bg-gradient-to-r from-red-500 to-transparent flex-1 ml-6"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {likedSongsList.map((item) => (
                <SongItem
                  key={item._id}
                  name={item.name}
                  desc={item.desc}
                  id={item._id}
                  image={item.image}
                />
              ))}
            </div>
          </div>
        )}
      </>
    );
  }

  // Default view (All content)
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="mb-12 mt-8">
        <div className="bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-blue-900/40 rounded-3xl p-8 backdrop-blur-sm border border-gray-700/30">
          <h1 className="text-4xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Hello, Rhythm-Space Fam!
          </h1>
          <p className="text-gray-300 text-lg">Ready to discover your next favorite song?</p>
        </div>
      </div>

      {/* Liked Songs Section - Show at top if there are liked songs */}
      {likedSongsList.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              Your Favorites
            </h2>
            <div className="h-px bg-gradient-to-r from-red-500 to-transparent flex-1 ml-6"></div>
          </div>
          <div className="flex overflow-x-auto gap-6 pb-4">
            {likedSongsList.slice(0, 10).map((item) => (
              <SongItem
                key={item._id}
                name={item.name}
                desc={item.desc}
                id={item._id}
                image={item.image}
              />
            ))}
          </div>
        </div>
      )}

      {/* Featured Charts Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">Featured Charts</h2>
          <div className="h-px bg-gradient-to-r from-purple-500 to-transparent flex-1 ml-6"></div>
        </div>
        <div className="flex overflow-x-auto gap-6 pb-4">
          {albumsData.map((item) => (
            <AlbumItem
              key={item._id}
              name={item.name}
              desc={item.desc}
              id={item._id}
              image={item.image}
            />
          ))}
        </div>
      </div>

      {/* Today's Hits Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">Today's Biggest Hits</h2>
          <div className="h-px bg-gradient-to-r from-green-500 to-transparent flex-1 ml-6"></div>
        </div>
        <div className="flex overflow-x-auto gap-6 pb-4">
          {songsData.map((item) => (
            <SongItem
              key={item._id}
              name={item.name}
              desc={item.desc}
              id={item._id}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;