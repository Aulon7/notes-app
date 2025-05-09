// import express from "express";
// import { Note } from "../models/Note.js";
// import { auth } from "../middleware/auth.js";

// const router = express.Router();

// // Get all notes
// router.get("/", auth, async (req, res) => {
//   try {
//     const notes = await Note.find({ user: req.user._id });
//     res.json({ success: true, notes });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch notes",
//     });
//   }
// });

// // Create note
// router.post("/add", auth, async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     const note = new Note({
//       title,
//       description,
//       user: req.user._id,
//     });
//     await note.save();
//     res.status(201).json({ success: true, note });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to create note",
//     });
//   }
// });

// // Update note
// router.put("/:id", auth, async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     const note = await Note.findOneAndUpdate(
//       { _id: req.params.id, user: req.user._id },
//       { title, description },
//       { new: true }
//     );

//     if (!note) {
//       return res.status(404).json({
//         success: false,
//         message: "Note not found",
//       });
//     }

//     res.json({ success: true, note });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to update note",
//     });
//   }
// });

// // Delete note
// router.delete("/:id", auth, async (req, res) => {
//   try {
//     const note = await Note.findOneAndDelete({
//       _id: req.params.id,
//       user: req.user._id,
//     });

//     if (!note) {
//       return res.status(404).json({
//         success: false,
//         message: "Note not found",
//       });
//     }

//     res.json({ success: true });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete note",
//     });
//   }
// });

// export default router;
