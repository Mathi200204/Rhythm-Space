import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddAlbum = () => {
  const [image, setImage] = useState(null);
  const [colour, setColour] = useState("#ffffff");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("bgColour", colour); 
      formData.append("image", image);

      const response = await axios.post(`${url}/api/album/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success("Album added!");
        setName("");
        setDesc("");
        setImage(null);
        setColour("#ffffff");
      } else {
        toast.error(response.data.message || "Something went wrong");
        console.error("Error:", response.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error occurred while adding album");
    }

    setLoading(false);
  };

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    <form
      className="flex flex-col items-start gap-8 text-gray-600"
      onSubmit={onSubmitHandler}
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
