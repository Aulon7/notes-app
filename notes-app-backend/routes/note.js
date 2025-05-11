import express from "express";
import Note from "../models/Note.js";
import middleWare from "../middleware/middleware.js";

const router = express.Router();

// Create note
router.post("/add", middleWare, async (req, res) => {
  try {
    const { title, description } = req.body;
    const note = new Note({
      title,
      description,
      userId: req.user.id,
    });
    await note.save();
    return res
      .status(200)
      .json({ success: true, message: "Note created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to create note" });
  }
});

//Get notes data

router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    return res.status(200).json({ success: true, notes });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Couldn't fetch notes" });
  }
});

export default router;
