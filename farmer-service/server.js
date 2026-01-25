const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const farmerRoutes = require('./routes/farmerRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

app.get('/health', (req, res) => {
  res.status(200).json({ status: "Farmer Service Healthy" });
});

app.use('/farmers', farmerRoutes);

app.get('/', (req, res) => {
  res.send('Farmer Service is running');
});

app.listen(process.env.PORT, () => {
  console.log(`Farmer Service running on port ${process.env.PORT}`);
});
