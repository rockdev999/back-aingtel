import { connection } from "../db.js";

export const getDealers = async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM Dealer");
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while fetching dealers",
      error: error.message,
    });
  }
};

export const createDealer = async (req, res) => {
  try {
    const { ci, name, email, password, phone, address } = req.body;
    if (!ci || !name || !email || !password || !phone || !address) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const [result] = await connection.query(
      `INSERT INTO Dealer(ci, name, email, password, phone, address) VALUES(?,?,?,?,?,?)`,
      [ci, name, email, password, phone, address]
    );

    if (result.affectedRows && result.affectedRows > 0) {
      return res.status(201).json({ message: "Dealer creado exitosamente" });
    } else {
      return res.status(500).json({ message: "No se pudo crear el dealer" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getDealer = async (req, res) => {
  try {
    const { email } = req.params;
    const [result] = await connection.query(
      "SELECT * FROM Dealer WHERE email = ?",
      [email]
    );
    if (result.length === 0) {
      res.status(404).json({ message: "Usuario no encontrado" });
    } else {
      res.status(200).json(result[0]);
    }
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
    console.error(error);
  }
};

export const deleteDealer = async (req, res) => {
  try {
    const { ci } = req.params;
    const [result] = await connection.query(
      `DELETE FROM Dealer WHERE ci = ${ci}`
    );
    if (result.affectedRows && result.affectedRows > 0) {
      res.status(202).json({ messagge: "usuario eliminado" });
    } else {
      res.status(404).json(messagge);
    }
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
    console.log(error);
  }
};
