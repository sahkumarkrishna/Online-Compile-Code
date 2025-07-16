const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Route imports
const authRoutes = require("./routes/authRoutes");
const compileRoutes = require("./routes/compileRoutes");


dotenv.config();
connectDB();

const app = express();


app.use(cors({
  origin: process.env.FRONTEND_URL || "https://help-code-omega.vercel.app",
  credentials: true,
}));

// Parse JSON
app.use(express.json());

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api", compileRoutes); // ✅ Correct prefix for compile


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
