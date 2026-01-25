const pool = require('../db');
const axios = require('axios');
require('dotenv').config();

exports.createOrder = async (req, res) => {
  try {
    const { farmer_id, product, quantity } = req.body;

    if (!farmer_id || !product || !quantity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🔹 CALL FARMER SERVICE TO CHECK IF FARMER EXISTS
    try {
      await axios.get(
        `${process.env.FARMER_SERVICE_URL}/farmers/${farmer_id}`
      );
    } catch (error) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    // 🔹 CREATE ORDER
    const result = await pool.query(
      'INSERT INTO orders (farmer_id, product, quantity) VALUES ($1, $2, $3) RETURNING *',
      [farmer_id, product, quantity]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating order" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM orders ORDER BY id ASC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};
