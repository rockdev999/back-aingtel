import { connection } from "../db.js";

export const getCategories = async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM Category");
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "An error occurred while fetching categories",
        error: error.message,
      });
  }
};
