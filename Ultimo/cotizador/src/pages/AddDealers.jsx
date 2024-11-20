import { React, useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UseForm from "../components/addproducts/UseForm";
import { AdminAuthenticationContext } from "../contexts/AdminAuthentication";
import axios from "axios";
function AddDealers() {
  const [modal, setModal] = useState(false);
  const [correct, setCorrect] = useState(false);
  const { form, dataForm } = UseForm({
    ci: 0,
    name: "",
    email: "",
    password: "",
    phone: 0,
    address: "",
  });
  const [dealer, setDealer] = useState({});
  const sendData = () => {
    const { ci, name, email, password, phone, address } = form;
    if (
      ci === 0 ||
      name === "" ||
      email === "" ||
      password === "" ||
      phone === 0 ||
      address === ""
    ) {
      setModal(true);
      setCorrect(false);
      return;
    } else {
      //AQUI ES DONDE DEBERIA IR LA RUTA DEL BACKEND
      axios
        .post("http://localhost:3000/dealers", form)
        .then(() => {
          setModal(true);
          setCorrect(true);
          resetForm();
        })
        .catch((error) => {
          setModal(true);
          setCorrect(false);
        });
      setTimeout(() => {
        setModal(false);
      }, 2000);
    }
  };
  const navigate = useNavigate();
  const { adminAuth, setAdminAuth } = useContext(AdminAuthenticationContext);
  useEffect(
    function () {
      if (!adminAuth) {
        navigate("/login");
      }
    },
    [adminAuth]
  );
  const resetForm = () => {
    document.getElementById("form").reset();
  };
  return (
    <div className="w-full mt-20 flex flex-col items-center">
      <p className="pt-4 border-b-4 border-[#08b4c4] text-lg font-medium">
        AGREGAR VENDEDOR
      </p>
      <form id="form" className="w-96 flex flex-col items-center p-4 gap-4">
        <input
          className="w-full p-4 border-solid border-2 border-gray-400 rounded-lg placeholder:text-lg text-lg placeholder:text-gray-700"
          type="number"
          placeholder="Carnet de Identidad"
          name="ci"
          onChange={dataForm}
        />
        <input
          className="w-full p-4 border-solid border-2 border-gray-400 rounded-lg placeholder:text-lg text-lg placeholder:text-gray-700"
          type="text"
          placeholder="Nombre"
          name="name"
          onChange={dataForm}
        />
        <input
          className="w-full p-4 border-solid border-2 border-gray-400 rounded-lg placeholder:text-lg text-lg placeholder:text-gray-700"
          type="email"
          placeholder="Correo Electronico"
          name="email"
          onChange={dataForm}
        />
        <input
          className="w-full p-4 border-solid border-2 border-gray-400 rounded-lg placeholder:text-lg text-lg placeholder:text-gray-700"
          type="password"
          placeholder="Contraseña"
          name="password"
          onChange={dataForm}
        />
        <input
          className="w-full p-4 border-solid border-2 border-gray-400 rounded-lg placeholder:text-lg text-lg placeholder:text-gray-700"
          type="tel"
          placeholder="Telefono"
          name="phone"
          onChange={dataForm}
        />
        <input
          className="w-full p-4 border-solid border-2 border-gray-400 rounded-lg placeholder:text-lg text-lg placeholder:text-gray-700"
          type="text"
          placeholder="Dirección"
          name="address"
          onChange={dataForm}
        />
      </form>
      <div className="flex flex-col items-center">
        <Link
          className="bg-[#08b4c4] p-4 border-solid border-2 rounded-lg"
          onClick={sendData}
        >
          GUARDAR
        </Link>
      </div>
      {modal ? (
        <div
          className={`flex absolute w-full h-full bg-transparent bg-gray-700 bg-opacity-50 justify-center pt-52`}
        >
          <div
            className={`flex p-2 w-[70%] ${
              correct
                ? "h-[22%] sm:w-[50%] lg:w-[35%] xl:w-[27%]"
                : "h-[35%] md:h-[35%]"
            } bg-white  flex-col justify-center items-center boder rounded-md md:w-[50%] md:w-[40%] xl:w-[35%]
            sm:h-[25%]`}
          >
            <div className="w-[22%] h-[36%]">
              {correct ? (
                <img className="w-full h-full" src="correct.png" alt="" />
              ) : (
                <img className="w-full h-full" src="incorrect.png" alt="" />
              )}
            </div>
            <p>
              {correct ? (
                <strong>Vendedor agregado</strong>
              ) : (
                <strong>Verifique campos</strong>
              )}
            </p>
            {correct ? (
              <p className="text-center text-gray-500 text-sm">
                El vendedor se agrego satisfactoriamente
              </p>
            ) : (
              <p className="text-center text-gray-500 text-sm">
                Verifique que todos los campos esten llenados.
              </p>
            )}
            {!correct ? (
              <button
                className="bg-[#08b4c4] p-4 border-solid border-2 rounded-lg active:bg-[#057a82] cursor-pointer"
                onClick={() => setModal(false)}
              >
                Aceptar
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default AddDealers;
