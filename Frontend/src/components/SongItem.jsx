import React, { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'

const SongItem = ({name,image,desc,id}) => {
  const { playWithId, toggleLike, isLiked } = useContext(PlayerContext)

  const handleLikeClick = (e) => {
    e.stopPropagation(); // Prevent triggering play when clicking like
    toggleLike(id);
  };

  return (
    <div 
      onClick={() => playWithId(id)} 
      className='group min-w-[200px] p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50'
    >
      <div className='relative overflow-hidden rounded-xl mb-4'>
        <img className='w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110' src={image} alt="" />
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        
        {/* Like Button */}
        <button
          onClick={handleLikeClick}
          className='absolute top-2 right-2 w-8 h-8 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110'
        >
          <svg 
            className={`w-4 h-4 transition-colors duration-200 ${isLiked(id) ? 'text-red-500 fill-current' : 'text-white hover:text-red-400'}`} 
            fill={isLiked(id) ? "currentColor" : "none"}
            stroke="currentColor" 
            strokeWidth={isLiked(id) ? "0" : "2"}
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
        
        {/* Play Button */}
        <div className='absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0'>
          <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
      <h3 className='font-bold text-white text-lg mb-2 group-hover:text-green-400 transition-colors duration-300'>{name}</h3>
      <p className='text-gray-400 text-sm leading-relaxed'>{desc}</p>
    </div>
  )
}

export default SongItem