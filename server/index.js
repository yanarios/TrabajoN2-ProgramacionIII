import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5173;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Schema and model
const weatherSchema = new mongoose.Schema({
  city: String,
  country: String,
  temp: Number,
  condition: String,
  icon: String,
  conditionText: String,
  date: { type: Date, default: Date.now },
});

const Weather = mongoose.model('Weather', weatherSchema);

// Routes
app.post('/api/weather', async (req, res) => {
  const weatherData = new Weather(req.body);
  try {
    await weatherData.save();
    res.status(201).send(weatherData);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
