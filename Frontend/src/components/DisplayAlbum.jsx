import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const DisplayAlbum = () => {
  const { id } = useParams();
  const [albumData, setAlbumData] = useState(null);
  const { playWithId, albumsData, songsData } = useContext(PlayerContext);
 
  useEffect(() => {
    const album = albumsData.find(item => item._id === id);
    if (album) {
      setAlbumData(album);
    }
  }, [id, albumsData]);

  if (!albumData) return null;

  const albumSongs = songsData.filter(item => item.album === albumData.name);

  return (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <div className="relative group">
          <img className="w-64 h-64 rounded-3xl shadow-2xl shadow-purple-500/20 object-cover" src={albumData.image} alt="" />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="flex flex-col">
          <p className="text-green-400 font-semibold mb-2 text-sm uppercase tracking-wider">Playlist</p>
          <h2 className="text-6xl font-black mb-6 md:text-8xl bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">{albumData.name}</h2>
          <h4 className="text-gray-300 text-lg mb-4 leading-relaxed">{albumData.desc}</h4>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <img className="w-6 h-6" src={assets.spotify_logo} alt="" />
            <span className="font-bold text-white">Rhythm-Space</span>
            <span>•</span>
            <span className="text-green-400">321,233 likes</span>
            <span>•</span>
            <span className="font-bold text-white">{albumSongs.length} songs</span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      {/* Play Button */}
      <div className="mt-8 mb-6">
        <button 
          onClick={() => albumSongs.length > 0 && playWithId(albumSongs[0]._id)}
          className="w-16 h-16 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-green-500/40"
        >
          <svg className="w-7 h-7 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
      </div>

      <div className="bg-gray-900/30 rounded-2xl backdrop-blur-sm border border-gray-700/50 overflow-hidden">
        <div className="grid grid-cols-3 sm:grid-cols-4 px-6 py-4 text-gray-400 border-b border-gray-700/50 text-sm font-medium">
          <p><span className="mr-4">#</span>Title</p>
          <p >Album</p>
          <p className="hidden sm:block">Date Added</p>
          <div className="flex justify-center">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        </div>
        
        {albumSongs.map((item, index) => (
          <div 
            onClick={() => playWithId(item._id)} 
            key={item._id} 
            className="grid grid-cols-3 sm:grid-cols-4 gap-4 px-6 py-4 items-center text-gray-300 hover:bg-white/5 cursor-pointer transition-all duration-200 group border-b border-gray-800/30 last:border-b-0"
          >
            <div className="flex items-center text-white">
              <span className="mr-4 text-gray-400 font-medium w-4 text-right group-hover:hidden">{index + 1}</span>
              <svg className="mr-4 w-4 h-4 text-green-400 hidden group-hover:block" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <img className="w-12 h-12 rounded-lg mr-4 shadow-md hidden sm:block" src={item.image} alt="" />
              <span className="font-medium group-hover:text-green-400 transition-colors duration-200 ">{item.name}</span>
            </div>
            <p  className="text-gray-400 text-sm ">{albumData.name}</p>
            <p className="text-gray-400 text-sm hidden sm:block">5 days ago</p>
            <p className="text-gray-400 text-sm text-center">{item.duration}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default DisplayAlbum;