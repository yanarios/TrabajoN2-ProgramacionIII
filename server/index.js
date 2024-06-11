import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/historial', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const historialSchema = new mongoose.Schema({
  city: String,
  country: String,
  temp: Number,
  condition: Number,
  icon: String,
  conditionText: String,
});

const Historial = mongoose.model('Historial', historialSchema);

app.post('/api/weather', async (req, res) => {
  const { city, country, temp, condition, icon, conditionText } = req.body;
  
  const newRecord = new Historial({ city, country, temp, condition, icon, conditionText });
  await newRecord.save();
  
  res.status(201).json(newRecord);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
