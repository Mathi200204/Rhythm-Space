import React, { useContext } from "react";
import { assets } from "../assets/assets.js";
import { PlayerContext } from "../context/PlayerContext.jsx";

const Player = () => {
  const { track, seekBar, seekBg, playStatus, play, pause, time, previous, next, seekSong } =
    useContext(PlayerContext);

  return track ? (
    <div className="h-[10%] bg-gradient-to-r from-gray-900 via-black to-gray-900 flex justify-between items-center text-white px-6 backdrop-blur-xl border-t border-gray-800/50">
      {/* Track Info */}
      <div className="hidden lg:flex items-center gap-4 min-w-[300px]">
        <div className="relative group">
          <img className="w-14 h-14 rounded-lg shadow-lg" src={track.image} alt="" />
          <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        </div>
        <div>
          <p className="font-semibold text-white hover:underline cursor-pointer">{track.name}</p>
          <p className="text-gray-400 text-sm">{track.desc.slice(0, 12)}</p>
        </div>
        <button className="text-green-500 hover:text-green-400 ml-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center gap-2 flex-1 max-w-[600px]">
        <div className="flex gap-6 items-center">
          <button className="text-gray-400 hover:text-white transition-colors duration-200">
            <img className="w-4 h-4" src={assets.shuffle_icon} alt="" />
          </button>
          
          <button 
            onClick={previous} 
            className="text-gray-400 hover:text-white transition-all duration-200 hover:scale-110"
          >
            <img className="w-5 h-5" src={assets.prev_icon} alt="" />
          </button>

          <button 
            onClick={playStatus ? pause : play}
            className="w-12 h-12  rounded-full flex items-center justify-center hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-white/20"
          >
            {playStatus ? (
              <img className="w-5 h-5" src={assets.pause_icon} alt="" />
            ) : (
              <img className="w-5 h-5 ml-1" src={assets.play_icon} alt="" />
            )}
          </button>

          <button 
            onClick={next} 
            className="text-gray-400 hover:text-white transition-all duration-200 hover:scale-110"
          >
            <img className="w-5 h-5" src={assets.next_icon} alt="" />
          </button>

          <button className="text-gray-400 hover:text-white transition-colors duration-200">
            <img className="w-4 h-4" src={assets.loop_icon} alt="" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-4 w-full">
          <span className="text-xs text-gray-400 min-w-[40px] text-right">
            {time.currentTime.minute}:{time.currentTime.second}
          </span>
          <div
            ref={seekBg}
            onClick={seekSong}
            className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer hover:h-1.5 transition-all duration-200 group"
          >
            <div
              ref={seekBar}
              className="h-full bg-white rounded-full relative group-hover:bg-green-400 transition-colors duration-200"
              style={{ width: '0%' }}
            >
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </div>
          </div>
          <span className="text-xs text-gray-400 min-w-[40px]">
            {time.totalTime.minute}:{time.totalTime.second}
          </span>
        </div>
      </div>

      {/* Volume and Other Controls */}
      <div className="hidden lg:flex items-center gap-4 min-w-[300px] justify-end">
        <button className="text-gray-400 hover:text-white transition-colors duration-200">
          <img className="w-4 h-4" src={assets.mic_icon} alt="" />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors duration-200">
          <img className="w-4 h-4" src={assets.queue_icon} alt="" />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors duration-200">
          <img className="w-4 h-4" src={assets.speaker_icon} alt="" />
        </button>
        
        <div className="flex items-center gap-2">
          <img className="w-4 h-4" src={assets.volume_icon} alt="" />
          <div className="w-24 h-1 bg-gray-600 rounded-full cursor-pointer hover:h-1.5 transition-all duration-200 group">
            <div className="w-16 h-full bg-white rounded-full group-hover:bg-green-400 transition-colors duration-200"></div>
          </div>
        </div>
        
        <button className="text-gray-400 hover:text-white transition-colors duration-200">
          <img className="w-4 h-4" src={assets.mini_player_icon} alt="" />
        </button>
      </div>
    </div>
  ) : null
};

export default Player;