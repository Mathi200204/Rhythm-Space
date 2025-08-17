import { addSong, listSong, removeSong } from "../controllers/songController.js";
import express from "express";
import upload from "../middeleware/multer.js";

const songRouter = express.Router();

songRouter.post("/add", upload.fields([
  { name: "image", maxCount: 1 },
  { name: "audio", maxCount: 1 }
]), addSong);

songRouter.get("/list", listSong);
songRouter.delete("/remove/:id", removeSong); // Changed to DELETE and using params

export default songRouter;