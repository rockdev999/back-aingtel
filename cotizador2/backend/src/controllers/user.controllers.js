import { connection } from "../db.js";

export const getUsers = async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM User");
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.send(500).status(500);
  }
};
