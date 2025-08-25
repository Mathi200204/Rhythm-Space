import React from 'react'
import { useNavigate } from 'react-router-dom'

const AlbumItem = ({image,name,desc,id}) => {
  const navigate = useNavigate()

  return (
    <div 
      onClick={()=>navigate(`/album/${id}`)} 
      className='group min-w-[200px] p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50'
    >
      <div className='relative overflow-hidden rounded-xl mb-4'>
        <img className='w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110' src={image} alt="" />
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
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

export default AlbumItem