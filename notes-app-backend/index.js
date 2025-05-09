import express from "express";
import connectionToMongoDB from "./dababase/index.js";
import cors from "cors";
import authRouter from "./routes/auth.js";
// import noteRoutes from "./routes/note.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);

// Start server;
app.listen(5000, () => {
  connectionToMongoDB();
  console.log(`Server is running..`);
});
