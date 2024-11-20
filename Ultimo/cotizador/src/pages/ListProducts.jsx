import { AdminAuthenticationContext } from "../contexts/AdminAuthentication";
import { useNavigate } from "react-router-dom";
import { useContext, useDebugValue, useEffect, useState } from "react";
import axios from "axios";
function ListProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [xcode, setXcode] = useState("");
  const [act, setAct] = useState(false);
  const [found, setFound] = useState([]);
  const navigate = useNavigate();
  const { adminAuth, setAdminAuth } = useContext(AdminAuthenticationContext);
  const getProducts = () => {
    axios
      //AQUI DEBERIA IR LA RUTA DEL BACKEND
      .get("http://localhost:3000/products")
      .then((result) => {
        setProducts(result.data);
        console.log(result.data);
      })
      .catch((error) => console.log(error));
  };
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
  useEffect(
    function () {
      if (adminAuth) {
        getProducts();
      } else {
        navigate("/login");
      }
    },
    [adminAuth]
  );
  // console.log(products);
  const cate = (product) => {
    const categoryFound = categories.find(
      (category) => category.id === product.category
    );
    return categoryFound ? categoryFound.name : "Categoría no encontrada";
  };

  const filter = (param) => {
    const productFound = products.find((product) => product.code === param);
    if (productFound) {
      // console.log("Producto encontrado:", productFound);
      setAct(true);
      setFound(productFound);
      return productFound;
    } else {
      alert("Producto no encontrado");
    }
  };
  const eliminar = (code) => {
    axios
      //AQUI DEBERIA IR LA RUTA DEL BACKEND
      .delete(`http://localhost:3000/products/${code}`)
      .then((result) => {
        getProducts();
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="pt-20">
      <div className="w-full flex justify-center items-center py-5 flex-col gap-2">
        <div className="w-[70%] sm:w-[50%] md:w-[40%] lg:w-[30%] xl:w[25%] flex border border-2 rounded-md p-2">
          <input
            id="search"
            className="w-[90%] focus:outline-none bg-inherit px-2 placeholder:bg-inherit"
            type="text"
            placeholder="Introduzca codigo"
            onChange={(e) => {
              setXcode(e.target.value);
            }}
            value={xcode}
          />
          <button
            className="cursor-pointer active:bg-gray-300 p-2  rounded-md"
            onClick={() => filter(xcode)}
          >
            Buscar
          </button>
        </div>
        <div>
          <button
            className="py-4 px-2 bg-[#08b4c4] border rounded-full font-bold text-white active:bg-[#057a82]"
            onClick={() => {
              setAct(false);
              setXcode("");
            }}
          >
            Mostrar Productos
          </button>
        </div>
      </div>
      <div className="w-[90%] bg-gray-300 h-[3px] mx-auto"></div>
      <div className="p-4 gap-5 grid grid-cols-1 lg:grid-cols-2 place-items-center">
        {!act ? (
          products.map((product) => (
            <div
              key={product.code}
              className="w-full p-3 border-solid h-[100%] border-black rounded-md md:w-[80%] shadow-[1px_-1px_10px_1px_rgba(0,0,0,0.5)] flex gap-2 items-center"
            >
              <div className="w-2/5">
                <img src={product.image} alt="" />
              </div>
              <div className="flex flex-col w-[55%]">
                <p>
                  <strong>Nombre: </strong>
                  {product.name}
                </p>
                <div className="flex gap-6">
                  <p>
                    <strong>Costo: </strong>
                    {product.cost}
                  </p>
                  <p>
                    <strong>Precio: </strong>
                    {product.price}
                  </p>
                </div>
                <p>
                  <strong>Categoria: </strong>
                  {cate(product)}
                </p>
                <p>
                  <strong>Codigo: </strong>
                  {product.code}
                </p>
                <p>
                  <strong>Descripcion: </strong>
                  {product.description}
                </p>
                <div className="w-full flex justify-end">
                  <button
                    className="w-[50%] p-3 rounded-md bg-red-500 active:bg-red-700"
                    onClick={() => {
                      eliminar(product.code);
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full p-3 border-solid h-[100%] border-black rounded-md md:w-[80%] shadow-[1px_-1px_10px_1px_rgba(0,0,0,0.5)] flex gap-2 items-center">
            <div className="w-2/5">
              <img src={found.image} alt="" />
            </div>
            <div className="flex flex-col">
              <p>
                <strong>Nombre: </strong>
                {found.name}
              </p>
              <div className="flex gap-6">
                <p>
                  <strong>Costo: </strong>
                  {found.cost}
                </p>
                <p>
                  <strong>Precio: </strong>
                  {found.price}
                </p>
              </div>
              <p>
                <strong>Categoria: </strong>
                {cate(found)}
              </p>
              <p>
                <strong>Codigo: </strong>
                {found.code}
              </p>
              <p>
                <strong>Descripcion: </strong>
                {found.desciption}
              </p>
              <div className="w-full flex justify-end">
                <button
                  className="w-[50%] p-3 rounded-md bg-red-500 active:bg-red-700"
                  onClick={() => {
                    eliminar(found.code);
                    setAct(false);
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
// actualizado
export default ListProducts;
