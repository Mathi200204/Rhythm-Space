import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <div className="sticky top-0 z-50 bg-black/20 backdrop-blur-xl border-b border-gray-800/50 rounded-2xl mb-6">
      <div className='w-full flex justify-between items-center font-semibold p-4'>
        <div className='flex items-center gap-3'>
          <button 
            onClick={()=>navigate(-1)} 
            className='w-10 h-10 bg-black/40 backdrop-blur-sm p-2 rounded-full cursor-pointer hover:bg-black/60 transition-all duration-200 flex items-center justify-center border border-gray-700/50'
          >
            <img className='w-5 h-5' src={assets.arrow_left} alt="" />
          </button>
          <button 
            onClick={()=>navigate(1)} 
            className='w-10 h-10 bg-black/40 backdrop-blur-sm p-2 rounded-full cursor-pointer hover:bg-black/60 transition-all duration-200 flex items-center justify-center border border-gray-700/50'
          >
            <img className='w-5 h-5' src={assets.arrow_right} alt="" /> 
          </button>
        </div>
      </div>
      
      <div className='flex items-center gap-3 px-4 pb-4'>
        <button className='bg-white text-black px-6 py-2 rounded-full cursor-pointer font-semibold hover:scale-105 transition-transform duration-200'>
          All
        </button>
        <button className='bg-gray-800/60 backdrop-blur-sm text-white px-6 py-2 rounded-full cursor-pointer border border-gray-700/50 hover:bg-gray-700/60 transition-all duration-200'>
          Music
        </button>
               
      </div>
    </div>
  )
}
 
export default Navbar