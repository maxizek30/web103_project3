import { pool } from "../config/database.js";

const getEvents = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM events");
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
const getEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query("SELECT * FROM events WHERE id = $1", [
      id,
    ]);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export default {
  getEvents,
  getEvent,
};
