import { useState, useEffect, useContext } from "react";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { AdminAuthenticationContext } from "../contexts/AdminAuthentication.jsx";
import { DealerAuthenticationContext } from "../contexts/DealerAuthentication.jsx";
import axios from "axios";
// sm:bg-red-500 md:bg-orange-500 lg:bg-pink-500 xl:bg-blue-500 2xl:bg-sky-500
function Login() {
  const [users, setUsers] = useState([]);

  const [username, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [view, setView] = useState(false);
  const [userAdmin, setUserAdmin] = useState(null);
  const [userDealer, setUserDealer] = useState(null);
  const navigate = useNavigate();
  const { adminAuth } = useContext(AdminAuthenticationContext);
  const { dealerAuth } = useContext(AdminAuthenticationContext);

  const { setAdminAuth } = useContext(AdminAuthenticationContext);
  const { setDealerAuth } = useContext(DealerAuthenticationContext);

  const verify = () => {
    if (username === "" || pass === "") {
      alert("Llene todos los campos");
      return;
    }
    const found = users.find((user) => {
      return user.username === username && user.password === pass;
    });
    // console.log(found);
    if (found) {
      if (found.rol === "admin") {
        setUserAdmin(found);
        setAdminAuth(true);
        // console.log(userAdmin);
      } else {
        if (found.rol === "dealer") {
          setUserDealer(found);
          setDealerAuth(true);
        } else {
          alert("Usuario o Contraseña incorrectos");
        }
      }
    } else {
      alert("Usuario o Contraseña incorrectos");
    }
  };
  useEffect(
    function () {
      if (!adminAuth) {
        navigate("/login");
      }
    },
    [adminAuth]
  );
  useEffect(
    function () {
      if (!dealerAuth) {
        navigate("/login");
      }
    },
    [dealerAuth]
  );
  useEffect(() => {
    if (userAdmin) {
      navigate("/home-admin");
    }
  }, [userAdmin]);
  useEffect(() => {
    if (userDealer) {
      localStorage.setItem("userDealer", JSON.stringify(userDealer));
      navigate("/quoter");
    }
  }, [userDealer]);
  useEffect(() => {
    axios
      //AQUI DEBERIA IR LA RUTA DEL BACKEND
      .get("http://localhost:3000/users")
      .then((result) => {
        setUsers(result.data);
        console.log(users);
      })
      .catch((error) => console.log(error));
  }, []);
  // useEffect(() => {
  //   console.log("Usuarios cargados o actualizados:", users);
  //   // Puedes realizar acciones adicionales cuando los usuarios cambien
  // }, [users]);
  return (
    <div className="mt-8 sm:w-full h-[70vh] sm:h-[77vh] flex items-center justify-center">
      <div className="w-full mt-14 h-full sm:w-[50%] md:w-[42%] lg:w-[35%] xl:w-[30%] 2xl:w-[25%] sm:p-3 sm:border-solid  sm:border-current sm:rounded-md sm:shadow-[0px_-1px_5px_1px_rgba(0,0,0,0.5)] flex flex-col items-center sm:h-[75%]">
        <div className="flex flex-col items-center py-9 gap-4 sm:py-2">
          <div className="w-28">
            <img className="w-full h-full" src="about.png" alt="" />
          </div>
          <p className="text-2xl">LOGIN</p>
        </div>
        <form className="w-[85%] flex flex-col justify-center gap-4">
          <div className="w-[100%] px-4 py-2 flex flex-row items-center border border-2 border-gray-300 rounded-md ">
            <input
              className="w-full m-1 mr-2 text-lg placeholder:text-lg focus:outline-none bg-inherit"
              type="email"
              placeholder="Usuario"
              onChange={(event) => {
                setUserName(event.target.value);
              }}
              value={username}
            />
            <FaUser />
          </div>
          <div className="w-[100%] px-4 py-2 flex flex-row items-center border border-2 border-gray-300 rounded-md ">
            <input
              className="w-full m-1 mr-2 text-lg placeholder:text-lg focus:outline-none bg-inherit"
              type={view ? "text" : "password"}
              placeholder="Contraseña"
              onChange={(event) => {
                setPass(event.target.value);
              }}
              value={pass}
            />
            <div
              onClick={() => {
                setView(!view);
              }}
            >
              {view ? (
                <FaEye className="cursor-pointer" />
              ) : (
                <FaEyeSlash className="cursor-pointer" />
              )}
            </div>
          </div>
        </form>
        <button
          className="my-3 py-4 px-20 bg-[#08b4c4] border rounded-full font-bold text-white active:bg-[#057a82]"
          onClick={() => {
            verify();
          }}
        >
          Ingresar
        </button>
      </div>
    </div>
  );
}

export default Login;
