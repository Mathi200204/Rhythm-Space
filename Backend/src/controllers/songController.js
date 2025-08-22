import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songModel.js";

const addSong = async (req, res) => {
  try {
    const name = req.body.name;
    const desc = req.body.desc;
    const album = req.body.album;
    const audioFile = req.files.audio[0];
    const imageFile = req.files.image[0];
    
    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "video",
    });
    
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    
    const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(
      audioUpload.duration % 60
    ).toString().padStart(2, '0')}`; 

    const songData = {
      name,
      desc,
      album,
      image: imageUpload.secure_url,
      file: audioUpload.secure_url,
      duration,
    };
    
    const song = new songModel(songData);
    await song.save();
    res.json({ success: true, message: "Song added successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const listSong = async (req, res) => {
    try {
        const allSongs = await songModel.find({});
        res.json({ 
            success: true, 
            message: "Songs fetched successfully",
            songs: allSongs 
        });
    } catch (error) {
        console.error(error);
        res.json({ 
            success: false, 
            message: error.message 
        });
    }
};

const searchSong = async (req, res) => {
    try {
        const { query } = req.query;
        
        if (!query) {
            return res.json({ 
                success: true, 
                message: "Please provide a search query",
                songs: [] 
            });
        }

        const songs = await songModel.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { album: { $regex: query, $options: 'i' } },
                { desc: { $regex: query, $options: 'i' } }
            ]
        });
        
        res.json({ 
            success: true, 
            message: "Songs fetched successfully",
            songs 
        });
    } catch (error) {
        console.error(error);
        res.json({ 
            success: false, 
            message: error.message 
        });
    }
};

const removeSong = async (req, res) => {
  try {
    const { id } = req.params; 
    
    if (!id) {
      return res.status(400).json({ 
        success: false, 
        message: "Song ID is required" 
      });
    }

    const deletedSong = await songModel.findByIdAndDelete(id);
    
    if (!deletedSong) {
      return res.status(404).json({ 
        success: false, 
        message: "Song not found" 
      });
    }

    res.json({ 
      success: true, 
      message: "Song removed successfully",
      deletedSong 
    });
  } catch (error) {
    console.error("Error removing song:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to remove song",
      error: error.message 
    });
  }
};

export { addSong, listSong, searchSong, removeSong };