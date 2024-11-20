import React, { useEffect, useState } from "react";
import axios from "axios";
// import { products } from "../data";

function ProductCards() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      //AQUI DEBERIA IR LA RUTA DEL BACKEND
      .get("http://localhost:3000/products")
      .then((result) => {
        setProducts(result.data);
        console.log(result.data);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    axios
      //AQUI DEBERIA IR LA RUTA DEL BACKEND
      .get("http://localhost:3000/categories")
      .then((result) => {
        setCategories(result.data);
        console.log(result.data);
      })
      .catch((error) => console.log(error));
  }, []);
  const cate = (product) => {
    const categoryFound = categories.find(
      (category) => category.id === product.category
    );
    return categoryFound ? categoryFound.name : "Categoría no encontrada";
  };
  return (
    <div className="mt-16 p-8 bg-gray-100">
      <div className="w-full flex justify-center">
        <p className="font-bold text-2xl border-b-4 border-sky-700 ">
          COTIZACIÓN
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
        {products.map((product) => (
          <div
            key={product.code}
            className="bg-white border border-black rounded-lg shadow-lg p-4"
          >
            <div className="w-full h-24 mb-4 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-w-full max-h-full object-contain rounded-md"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              {product.name.toUpperCase()}
            </h3>
            <p className="text-gray-600">
              <strong>Categoria: </strong>
              {cate(product)}
            </p>
            <p className="text-gray-600">
              <strong>Descripcion: </strong> {product.description}
            </p>
            <div className="mt-2 text-gray-500 text-xs"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCards;
