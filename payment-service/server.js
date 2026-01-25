const express = require('express');
const cors = require('cors');
require('dotenv').config();

const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/payments', paymentRoutes);

app.get('/', (req, res) => {
  res.send('Payment Service is running');
});

app.listen(process.env.PORT, () => {
  console.log(`Payment Service running on port ${process.env.PORT}`);
});
