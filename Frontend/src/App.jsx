import React, { useContext } from 'react';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Display from './components/Display';
import { PlayerContext } from './context/PlayerContext';

const App = () => {
  const { audioRef, track } = useContext(PlayerContext);

  return (
    <div className='h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden'>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <div className='h-[90%] flex relative z-10'>
        <Sidebar />
        <Display />
      </div>
      <Player />
      <audio 
        ref={audioRef} 
        src={track ? track.file : ""} 
        preload='auto'
        onEnded={() => console.log('Audio ended')}
        onError={(e) => console.error('Audio error:', e)}
      ></audio>
    </div>
  );
};

export default App;