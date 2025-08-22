import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef(null);
  const seekBg = useRef(null);
  const seekBar = useRef(null);

  const url = "http://localhost:4000";

  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [track, setTrack] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: "00",
      minute: "00",
    },
    totalTime: {
      second: "00",
      minute: "00",
    },
  });
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return { minute: "00", second: "00" };
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return {
      minute: mins < 10 ? `0${mins}` : `${mins}`,
      second: secs < 10 ? `0${secs}` : `${secs}`
    };
  };

  const updateTime = () => {
    if (audioRef.current) {
      const currentTime = formatTime(audioRef.current.currentTime);
      const totalTime = formatTime(audioRef.current.duration);
      
      setTime({
        currentTime,
        totalTime
      });

      if (seekBar.current && audioRef.current.duration) {
        const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        seekBar.current.style.width = `${progress}%`;
      }
    }
  };

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  };
  
  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };
  
  const playWithId = async (id) => {
    const song = songsData.find(item => id === item._id);
    if (song) {
      setTrack(song);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
          setPlayStatus(true);
        }
      }, 100);
    }
  };

  const playSearchResult = async (song) => {
    setTrack(song);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
        setPlayStatus(true);
      }
    }, 100);
  };

  const previous = async () => {
    if (!track) return;
    
    const currentIndex = songsData.findIndex(item => track._id === item._id);
    if (currentIndex > 0) {
      const newTrack = songsData[currentIndex - 1];
      setTrack(newTrack);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
          setPlayStatus(true);
        }
      }, 100);
    }
  };
  
  const next = async () => {
    if (!track) return;
    
    const currentIndex = songsData.findIndex(item => track._id === item._id);
    if (currentIndex < songsData.length - 1) {
      const newTrack = songsData[currentIndex + 1];
      setTrack(newTrack);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
          setPlayStatus(true);
        }
      }, 100);
    }
  };

  const seekSong = async (e) => {
    if (audioRef.current && seekBg.current) {
      audioRef.current.currentTime =
        (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
        audioRef.current.duration;
    }
  };

  const searchSongs = async (query) => {
    try {
      setSearchQuery(query);
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }
      
      const response = await axios.get(`${url}/api/song/search?query=${encodeURIComponent(query)}`);
      if (response.data.success) {
        setSearchResults(response.data.songs);
      }
    } catch (error) {
      console.error("Error searching songs:", error);
      setSearchResults([]);
    }
  };
  
  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      setSongsData(response.data.songs);
      if (response.data.songs.length > 0 && !track) {
        setTrack(response.data.songs[0]);
      }
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  const getAlbumsData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      setAlbumsData(response.data.albums);
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };

  useEffect(() => {
    getSongsData();
    getAlbumsData();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    
    if (audio) {
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', updateTime);
      audio.addEventListener('ended', () => {
        setPlayStatus(false);
        next();
      });
    }

    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', updateTime);
        audio.removeEventListener('ended', () => {
          setPlayStatus(false);
          next();
        });
      }
    };
  }, [track]);

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    playSearchResult,
    previous,
    next,
    seekSong,
    songsData,
    albumsData,
    searchResults,
    searchQuery,
    searchSongs,
    setSearchQuery
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;