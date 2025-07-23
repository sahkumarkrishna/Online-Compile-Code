import mongoose from 'mongoose'; // or use `require('mongoose')` in CommonJS

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
  }
};

export default connectDB; // use `module.exports = connectDB` if CommonJS
