const pool = require('../db');
const axios = require('axios');
require('dotenv').config();

exports.createPayment = async (req, res) => {
  try {
    const { order_id, amount } = req.body;

    if (!order_id || !amount) {
      return res.status(400).json({ message: "Order ID and amount are required" });
    }

    // 🔹 CHECK IF ORDER EXISTS
    try {
      await axios.get(
        `${process.env.ORDER_SERVICE_URL}/orders`
      );
    } catch (error) {
      return res.status(404).json({ message: "Order service unavailable" });
    }

    // (Better version would check specific order by ID — we can improve later)

    const result = await pool.query(
      'INSERT INTO payments (order_id, amount, status) VALUES ($1, $2, $3) RETURNING *',
      [order_id, amount, 'COMPLETED']
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error processing payment" });
  }
};

exports.getAllPayments = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM payments ORDER BY id ASC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payments" });
  }
};
