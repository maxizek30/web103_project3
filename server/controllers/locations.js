import { pool } from "../config/database.js";

const getLocations = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM locations");
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
const getLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query("SELECT * FROM locations WHERE id = $1", [
      id,
    ]);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export default {
  getLocations,
  getLocation,
};
