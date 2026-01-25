const express = require('express');
const cors = require('cors');
require('dotenv').config();

const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('Order Service is running');
});

app.listen(process.env.PORT, () => {
  console.log(`Order Service running on port ${process.env.PORT}`);
});
