const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

app.get('/health', (req, res) => {
  res.status(200).json({ status: "Order Service Healthy" });
});

app.use('/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('Order Service is running');
});


app.listen(process.env.PORT, () => {
  console.log(`Order Service running on port ${process.env.PORT}`);
});
