import React, { useContext, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import DisplayHome from './DisplayHome';
import DisplayAlbum from './DisplayAlbum';
import DisplaySearch from './DisplaySearch';
import { PlayerContext } from '../context/PlayerContext';

const Display = () => {
  const { albumsData } = useContext(PlayerContext);
  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const isSearch = location.pathname.includes("search");
  const albumId = isAlbum ? location.pathname.split("/").pop() : "";
  const album = albumsData.find(x => x._id === albumId);
  const bgColor = album ? album.bgColour : "#0f0f23";

  useEffect(() => {
    if (displayRef.current) {
      if (isAlbum && albumId && album) {
        displayRef.current.style.background = `linear-gradient(135deg, ${bgColor}40, #0f0f23, #1a1a2e)`;
      } else {
        displayRef.current.style.background = `linear-gradient(135deg, #0f0f23, #1a1a2e, #16213e)`;
      }
    }
  }, [isAlbum, bgColor, albumId, album]);

  return (
    <div ref={displayRef} className='w-[100%] m-2 px-6 pt-4 rounded-3xl text-white overflow-auto lg:w-[75%] lg:ml-0 backdrop-blur-xl border border-gray-800/50 shadow-2xl'>
      <Routes>
        <Route path='/' element={<DisplayHome />} />
        <Route path='/album/:id' element={<DisplayAlbum />} />
        <Route path='/search' element={<DisplaySearch />} />
      </Routes>
    </div>
  );
};

export default Display;