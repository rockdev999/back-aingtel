import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UseForm from "../components/addproducts/UseForm";
import { AdminAuthenticationContext } from "../contexts/AdminAuthentication";
import axios from "axios";
// actualizado
function AddProducts() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0.0);
  const [price, setPrice] = useState(0.0);
  const [category, setCategory] = useState(0);
  const [description, setDescription] = useState("");
  const [modal, setModal] = useState(false);
  const [correct, setCorrect] = useState(false);
  const { adminAuth, setAdminAuth } = useContext(AdminAuthenticationContext);
  const [imageFile, setImageFile] = useState(null);

  const navigate = useNavigate();
  useEffect(
    function () {
      if (!adminAuth) {
        navigate("/login");
      }
    },
    [adminAuth]
  );
  const update = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const sendProduct = async () => {
    console.log(name);
    console.log(cost);
    console.log(price);
    console.log(code);
    console.log(category);
    console.log(description);
    console.log(imageFile);
    if (
      name === "" ||
      cost === 0 ||
      price === 0 ||
      code === "" ||
      category === 0 ||
      description === "" ||
      !imageFile
    ) {
      setModal(true);
      setCorrect(false);
      console.log("esta aqui");
      return;
    } else {
      setModal(true);
      setCorrect(true);
      // console.log(form);
      console.log("todo");

      const formData = new FormData();
      formData.append("code", code);
      formData.append("name", name);
      formData.append("cost", cost);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("image", imageFile);
      // console.log("imageFile");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      try {
        //AQUI ES DONDE DEBERIA IR LA RUTA DEL BACKEND
        await axios.post("http://localhost:3000/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Producto enviado");
        resetForm();
      } catch (error) {
        console.error("Error al enviar el producto:", error);
      }
      setTimeout(() => {
        setModal(false);
      }, 2000);
      // resetForm();
    }
  };
  const validatorCost = (num) => {
    if (num.includes(",")) {
      alert(
        "Los valores enteros en bolivianos no deben contener puntos, incluso si son miles. Solo los centavos deben ir separados por un punto. \nEjemplo: \n 12500.50"
      );
    } else {
      setCost(num);
    }
  };
  const validatorPrice = (num) => {
    if (num.includes(",")) {
      alert(
        "Los valores enteros en bolivianos no deben contener puntos, incluso si son miles. Solo los centavos deben ir separados por un punto. \nEjemplo: \n 12500.50"
      );
      // setAux1(aux1.slice(0, -1));
    } else {
      setPrice(num);
    }
  };
  const resetForm = () => {
    document.getElementById("form").reset();
  };
  return (
    <div className="w-full mt-20 flex flex-col items-center">
      <p className="pt-4 border-b-4 border-[#08b4c4] text-lg font-medium">
        AGREGAR PRODUCTO
      </p>
      <form id="form" className="flex flex-col items-center p-4 gap-4">
        <input
          className="w-full p-4 border-solid border-2 border-gray-400 rounded-lg placeholder:text-lg text-lg placeholder:text-gray-700"
          type="text"
          placeholder="Nombre Producto"
          name="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <div>
          <div className="flex flex-row justify-center gap-4">
            <input
              className="w-2/5 p-4 border-solid border-2 border-gray-400 rounded-lg placeholder:text-lg text-lg placeholder:text-gray-700"
              type="text"
              placeholder="Costo"
              step="0.01"
              name="cost"
              onChange={(e) => {
                validatorCost(e.target.value);
              }}
            />
            <input
              className="w-2/5 p-4 border-solid border-2 border-gray-400 rounded-lg placeholder:text-lg text-lg placeholder:text-gray-700"
              type="text"
              placeholder="Precio"
              step="0.01"
              name="price"
              onChange={(e) => {
                validatorPrice(e.target.value);
              }}
            />
          </div>
          <p className="text-sm text-gray-500 text-center dark:text-gray-500">
            solo manejar (.) en caso de decimales. 12500.70
          </p>
        </div>
        <div className="w-[95%] flex flex-col">
          <input
            className=" file:bg-[#08b4c4] file:py-4 file:px-3 file:border file:border-0 file:rounded-lg file:active:bg-[#057a82] file:cursor-pointer"
            type="file"
            name="image"
            accept="image/png, image/jpeg, image/jpg"
            onChange={update}
          />
          <p className="px-1 text-sm text-gray-500 dark:text-gray-500">
            PNG, JPG o JPEG.
          </p>
        </div>
        <input
          className="w-full p-4 border-solid border-2 border-gray-400 rounded-lg placeholder:text-lg text-lg placeholder:text-gray-700"
          type="text"
          placeholder="Codigo"
          name="code"
          onChange={(e) => {
            setCode(e.target.value);
          }}
        />
        <div className="mx-4 w-full border-solid border-2 border-gray-400 rounded-lg placeholder:text-lg text-lg">
          <select
            className="w-[95%] bg-transparent p-4 outline-none focus:ring-0 text-gray-700"
            name="category"
            onChange={(e) => {
              e.target.value === 0
                ? alert("elija una categoria")
                : setCategory(e.target.value);
            }}
          >
            <option value="0">Categoría</option>
            <option value="1">Videovigilancia</option>
            <option value="2">Redes y Comunicaciones</option>
            <option value="3">Seguridad Electrónica</option>
            <option value="4">Sistemas Domóticos</option>
            <option value="5">Sistemas para Energía y Respaldo</option>
            <option value="6">Biométricos</option>
            <option value="7">Sistemas Eléctricos</option>
          </select>
        </div>
        <textarea
          className="w-full h-[200px] p-4 border-solid border-2 border-gray-400 rounded-lg placeholder:text-lg text-lg placeholder:text-gray-700 resize-none"
          name="description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder="Descripcion"
        ></textarea>
      </form>
      <div className="flex flex-col items-center">
        <Link
          className="bg-[#08b4c4] p-4 border-solid border-2 rounded-lg active:bg-[#057a82] cursor-pointer"
          onClick={sendProduct}
        >
          Añadir Producto
        </Link>
      </div>
      {modal ? (
        <div
          className={`flex absolute w-full h-full bg-transparent bg-gray-700 bg-opacity-50 justify-center items-center`}
        >
          <div
            className={`flex p-2 w-[70%] ${
              correct
                ? "h-[22%] sm:w-[50%] lg:w-[35%] xl:w-[27%]"
                : "h-[25%] md:h-[30%]"
            } bg-white  flex-col justify-center items-center boder rounded-md md:w-[50%] md:w-[40%] xl:w-[35%]`}
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
                <strong>Producto agregado</strong>
              ) : (
                <strong>Verifique campos</strong>
              )}
            </p>
            {correct ? (
              <p className="text-center text-gray-500 text-sm">
                El producto se agrego satisfactoriamente
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

export default AddProducts;
