import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
 import bookingRoutes from "./routes/bookingRoutes.js";
 import courseRoutes from "./routes/courseRoutes.js";
 import timetableRoutes from "./routes/timetableRoutes.js";
import issueRoutes from "./routes/issueRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
const app = express();
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Vercel backend!" });
});
// Middleware
app.use(express.json());
//app.use(bodyParser.json());
app.use(cors());
app.get('/auth/google', (req, res) => {
  const authUrl = getAuthUrl();
  res.redirect(authUrl);
});

app.get('/auth/google/callback', async (req, res) => {
  const code = req.query.code;
  await getTokens(code);
  res.send('Authentication successful!');
});
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  dbName: 'smart-campus',
})
.then(() => console.log("MongoDB Connected to smart-campus"))
.catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/auth/bookings", bookingRoutes);
app.use("/api/auth/courses", courseRoutes);
app.use("/api/auth/timetable", timetableRoutes);
app.use("/api/auth/issues", issueRoutes);
app.use("/api/auth/enrollment", enrollmentRoutes);
// app.use("/api/auth/admin", adminRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
