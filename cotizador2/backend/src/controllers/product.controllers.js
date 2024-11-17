import { connection } from "../db.js";
import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const disk = multer.diskStorage({
  destination: path.join(__dirname, "../../uploads"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const fileUpload = multer({
  storage: disk,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("image");
export const getProducts = async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM Product");

    // Añadir la URL completa de la imagen al objeto de cada producto
    const productsWithImages = rows.map((product) => {
      return {
        ...product,
        image: `http://localhost:3000/uploads/${product.image}`, // Cambia la URL base según tu entorno
      };
    });

    res.status(200).json(productsWithImages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
};

export const createProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No se recibió ninguna imagen" });
    }
    const { code, name, cost, price, category, description } = req.body;
    const imagePath = req.file.filename;
    if (!code || !name || !cost || !price || !category || !description) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }
    const query = `INSERT INTO product (code, name, cost, price, category, description, image) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [code, name, cost, price, category, description, imagePath];

    const [rows] = await connection.execute(query, values);

    res.status(201).json({ message: "Producto creado con éxito" });
  } catch (error) {
    console.error("Error al crear el producto:", error);
    res.status(500).json({ message: "Error al crear el producto", error });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { code } = req.params;
    const [result] = await connection.query(
      "SELECT * FROM Product WHERE code = ?",
      [code]
    );
    if (result.affectedRows && result.affectedRows === 0) {
      res.status(404).json(messagge);
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener el producto", error });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const { code } = req.params;
    if (!code) {
      return res
        .status(400)
        .json({ message: "El código del producto es requerido" });
    }
    const [result] = await connection.query(
      "DELETE FROM Product WHERE code = ?",
      [code]
    );
    if (result.affectedRows && result.affectedRows > 0) {
      res.status(202).json({ messagge: "usuario eliminado" });
    } else {
      res.status(404).json(messagge);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al eliminar el producto", error });
  }
};

// export const createProduct = async (req, res) => {
//   try {
//     // Verificar si se subió un archivo
//     if (!req.file) {
//       return res.status(400).json({ message: "La imagen es obligatoria" });
//     }

//     // Obtener la ruta de la imagen desde req.file
//     const imagePath = req.file.path; // Esto contendrá la ruta de la imagen subida

//     // Desestructurar los demás campos del cuerpo de la solicitud
//     const { code, name, category, cost, price, description } = req.body;

//     // Verificar que todos los campos estén presentes
//     if (!code || !name || !category || !cost || !price || !description) {
//       return res
//         .status(400)
//         .json({ message: "Todos los campos son obligatorios" });
//     }

//     // Insertar los datos en la base de datos, incluyendo la ruta de la imagen
//     const [result] = await connection.query(
//       `INSERT INTO Product(code, name, category, cost, price, image, description) VALUES(?,?,?,?,?,?,?)`,
//       [code, name, category, cost, price, imagePath, description]
//     );

//     if (result.affectedRows && result.affectedRows > 0) {
//       return res.status(201).json({ message: "Producto creado exitosamente" });
//     } else {
//       return res.status(500).json({ message: "No se pudo crear el producto" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Error interno del servidor" });
//   }
// };
