import React, { useState } from "react";
import { assets } from "../assets/assets";

const AddAlbum = () => {
  const [image, setImage] = useState(false);
  const [colour, setColour] = useState("#ffffff");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    setLoading(true);

    
    const albumData = {
      name,
      desc,
      colour,
      image,
    };

    console.log("Album Added:", albumData);

    
    setTimeout(() => {
      setLoading(false);
      setImage(false);
      setName("");
      setDesc("");
      setColour("#ffffff");
    }, 1000);
  };

  return (
    <form
      className="flex flex-col items-start gap-8 text-gray-600"
      onSubmit={handleSubmit}
    >
     
      <div className="flex flex-col gap-4">
        <p>Upload Image</p>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          accept="image/*"
          hidden
        />
        <label htmlFor="image">
          <img
            className="w-24 cursor-pointer"
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            alt=""
          />
        </label>
      </div>

      
      <div className="flex flex-col gap-2.5">
        <p>Album name</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          type="text"
          placeholder="type here"
        />
      </div>

      
      <div className="flex flex-col gap-2.5">
        <p>Album description</p>
        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          type="text"
          placeholder="type here"
        />
      </div>

      
      <div className="flex flex-col gap-3">
        <p>Background Colour</p>
        <input
          type="color"
          value={colour}
          onChange={(e) => setColour(e.target.value)}
        />
      </div>

      
      <button
        className="text-base bg-black text-white py-2.5 px-14 cursor-pointer"
        type="submit"
        disabled={loading}
      >
        {loading ? "Adding..." : "ADD"}
      </button>
    </form>
  );
};

export default AddAlbum;
