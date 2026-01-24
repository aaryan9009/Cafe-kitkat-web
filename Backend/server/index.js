import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import orderRoutes from './routes/orders.js';

const app = express();

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cafeDB';

mongoose.connect(mongoURI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});