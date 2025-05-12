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
      .json({ success: true, message: "Note created successfully", note });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to create note" });
  }
});

//Get notes

router.get("/", middleWare, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    return res.status(200).json({ success: true, notes });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Couldn't fetch notes" });
  }
});

// Edit notes

router.put("/:id", middleWare, async (req, res) => {
  try {
    const { id } = req.params;
    const updateNote = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateNote) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }
    return res.status(200).json({ success: true, updateNote });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Couldn't edit note" });
  }
});

// Delete note
router.delete("/:id", middleWare, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Couldn't delete note",
    });
  }
});

export default router;
