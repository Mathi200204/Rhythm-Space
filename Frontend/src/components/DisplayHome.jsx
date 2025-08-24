import React, { useContext } from "react";
import Navbar from "./Navbar";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import { PlayerContext } from "../context/PlayerContext";

const DisplayHome = () => {
  const { songsData, albumsData } = useContext(PlayerContext);

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="mb-12 mt-8">
        <div className="bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-blue-900/40 rounded-3xl p-8 backdrop-blur-sm border border-gray-700/30">
          <h1 className="text-4xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            hello! Music Enthusiast...
          </h1>
          <p className="text-gray-300 text-lg">Ready to discover your next favorite song?</p>
        </div>
      </div>

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