const pool = require('../db');

exports.createFarmer = async (req, res) => {
  try {
    const { name, location } = req.body;

    if (!name || !location) {
      return res.status(400).json({ message: "Name and location are required" });
    }

    const result = await pool.query(
      'INSERT INTO farmers (name, location) VALUES ($1, $2) RETURNING *',
      [name, location]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating farmer' });
  }
};

exports.getAllFarmers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM farmers ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching farmers' });
  }
};

exports.getFarmerById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM farmers WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching farmer' });
  }
};

exports.deleteFarmer = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM farmers WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    res.json({ message: 'Farmer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting farmer' });
  }
};
