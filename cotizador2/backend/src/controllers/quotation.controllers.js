import { connection } from "../db.js";

export const getQuotation = async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM Quotation");
    const rowCount = rows.length;
    res.json({ count: rowCount });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al obtener los datos");
  }
};

export const createQuotation = async (req, res) => {
  try {
    const {
      dealer_email,
      buyer_name,
      buyer_phone,
      buyer_email,
      buyer_address,
      total_price,
    } = req.body;

    if (
      !dealer_email ||
      !buyer_name ||
      !buyer_phone ||
      !buyer_email ||
      !buyer_address ||
      !total_price
    ) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }
    const [result] = await connection.query(
      `INSERT INTO Quotation(dealer_email, buyer_name, buyer_phone, buyer_email, buyer_address, total_price) 
        VALUES(?,?,?,?,?,?)`,
      [
        dealer_email,
        buyer_name,
        buyer_phone,
        buyer_email,
        buyer_address,
        total_price,
      ]
    );

    if (result.affectedRows > 0) {
      return res
        .status(201)
        .json({ message: "Cotización creada exitosamente" });
    } else {
      return res
        .status(500)
        .json({ message: "No se pudo crear la cotización" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
