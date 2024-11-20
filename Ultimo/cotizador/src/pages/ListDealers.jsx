import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AdminAuthenticationContext } from "../contexts/AdminAuthentication";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
// actualizado
function ListDealers() {
  const [dealers, setDealers] = useState([]);
  const [xuser, setXuser] = useState("");
  const [act, setAct] = useState(false);
  const [found, setFound] = useState([]);
  const navigate = useNavigate();
  const { adminAuth, setAdminAuth } = useContext(AdminAuthenticationContext);
  const [view, setView] = useState(false);
  const getDealers = () => {
    //AQUI DEBERIA IR LA RUTA DEL BACKEND
    axios
      .get("http://localhost:3000/dealers")
      .then((result) => {
        setDealers(result.data);
        console.log(dealers);
      })
      .catch((error) => console.log(error));
  };
  useEffect(
    function () {
      if (adminAuth) {
        getDealers();
      } else {
        navigate("/login");
      }
    },
    [adminAuth]
  );
  // console.log(dealers);
  const filter = (param) => {
    const userFound = dealers.find((dealer) => dealer.ci === parseInt(param));
    if (userFound) {
      // console.log("Producto encontrado:", userFound);
      setAct(true);
      setFound(userFound);
      return userFound;
    } else {
      alert("Vendedor no encontrado");
      console.log(typeof param);
    }
  };

  const eliminar = (ci) => {
    axios
      //AQUI DEBERIA IR LA RUTA DEL BACKEND
      .delete(`http://localhost:3000/dealers/${ci}`)
      .then((result) => {
        getDealers();
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="pt-20">
      <div className="w-full flex justify-center items-center py-5 flex-col gap-2">
        <div className="w-[70%] sm:w-[50%] md:w-[40%] lg:w-[30%] xl:w[25%] flex border border-2 rounded-md p-2">
          <input
            id="search"
            className="w-[90%] focus:outline-none bg-inherit px-2"
            type="number"
            placeholder="Introduzca CI"
            onChange={(e) => {
              setXuser(e.target.value);
            }}
            value={xuser}
          />
          <button
            className="cursor-pointer active:bg-gray-300 p-2  rounded-md"
            onClick={() => filter(xuser)}
          >
            Buscar
          </button>
        </div>
        <div>
          <button
            className="py-4 px-2 bg-[#08b4c4] border rounded-full font-bold text-white active:bg-[#057a82]"
            onClick={() => {
              setAct(false);
              setXuser("");
            }}
          >
            Mostrar Vendedores
          </button>
        </div>
      </div>
      <div className="w-[90%] bg-gray-300 h-[3px] mx-auto"></div>

      <div className="w-full flex flex-col items-center p-4 gap-4 grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3">
        {!act ? (
          dealers.map((dealer) => (
            <div
              key={dealer.ci}
              className="w-full sm:w-[80%] p-3 border-solid  border-black rounded-md shadow-[1px_-1px_10px_1px_rgba(0,0,0,0.5)]"
            >
              <div className="w-full h-full m-1 flex items-center">
                <img className="m-1 h-full w-4" src="icon-user.png" alt="" />
                <p>Nombre: {dealer.name}</p>
              </div>
              <div className="w-full h-full m-1 flex items-center">
                <div className="w-full flex items-center">
                  <img className="m-1 h-full w-4" src="icon-phone.png" alt="" />
                  <p>Celular: {dealer.phone}</p>
                </div>
                <div className="w-full flex items-center">
                  <img className="m-1 h-full w-6" src="icon-dni.png" alt="" />
                  <p>C.I.: {dealer.ci}</p>
                </div>
              </div>
              <div className="w-full h-full m-1 flex items-center">
                <img className="m-1 h-full w-4" src="address.png" alt="" />
                <p>Direccion: {dealer.address}</p>
              </div>
              <div className="w-full h-full m-1 flex items-center">
                <img className="mx-1 h-full w-5" src="icon-email.png" alt="" />
                <p>
                  Correo:
                  <strong> {dealer.email}</strong>
                </p>
              </div>
              <div className="w-full h-full m-1 flex items-center ">
                <img className="mx-1 h-full w-5" src="pass.png" alt="" />
                <p>
                  Contraseña:
                  <strong> {dealer.password}</strong>
                  {/* {view ? (
                <strong> {dealer.password}</strong>
              ) : (
                <strong> ************* </strong>
              )} */}
                </p>
                {/* <div
              className="mx-5"
              onClick={() => {
                setView(!view);
              }}
            >
              {view ? (
                <FaEye className="cursor-pointer" />
              ) : (
                <FaEyeSlash className="cursor-pointer" />
              )}
            </div> */}
              </div>
              <div className="w-full flex justify-evenly">
                <button
                  className="p-3 rounded-md bg-red-500 active:bg-red-700"
                  onClick={() => {
                    eliminar(dealer.ci);
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full sm:w-[80%] p-3 border-solid  border-black rounded-md shadow-[1px_-1px_10px_1px_rgba(0,0,0,0.5)]">
            <div className="w-full h-full m-1 flex items-center">
              <img className="m-1 h-full w-4" src="icon-user.png" alt="" />
              <p>Nombre: {found.name}</p>
            </div>
            <div className="w-full h-full m-1 flex items-center">
              <div className="w-full flex items-center">
                <img className="m-1 h-full w-4" src="icon-phone.png" alt="" />
                <p>Celular: {found.phone}</p>
              </div>
              <div className="w-full flex items-center">
                <img className="m-1 h-full w-6" src="icon-dni.png" alt="" />
                <p>C.I.: {found.ci}</p>
              </div>
            </div>
            <div className="w-full h-full m-1 flex items-center">
              <img className="m-1 h-full w-4" src="address.png" alt="" />
              <p>Direccion: {found.address}</p>
            </div>
            <div className="w-full h-full m-1 flex items-center">
              <img className="mx-1 h-full w-5" src="icon-email.png" alt="" />
              <p>
                Correo:
                <strong> {found.email}</strong>
              </p>
            </div>
            <div className="w-full h-full m-1 flex items-center ">
              <img className="mx-1 h-full w-5" src="pass.png" alt="" />
              <p>
                Contraseña:
                <strong> {found.password}</strong>
                {/* {view ? (
                <strong> {dealer.password}</strong>
              ) : (
                <strong> ************* </strong>
              )} */}
              </p>
              {/* <div
              className="mx-5"
              onClick={() => {
                setView(!view);
              }}
            >
              {view ? (
                <FaEye className="cursor-pointer" />
              ) : (
                <FaEyeSlash className="cursor-pointer" />
              )}
            </div> */}
            </div>
            <div className="w-full flex justify-evenly">
              <button
                className="p-3 rounded-md bg-red-500 active:bg-red-700"
                onClick={() => {
                  eliminar(found.ci);
                  setAct(false);
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListDealers;
