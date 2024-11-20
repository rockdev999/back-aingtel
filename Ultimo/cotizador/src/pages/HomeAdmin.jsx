import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminAuthenticationContext } from "../contexts/AdminAuthentication";
// actualizado
function HomeAdmin() {
  const navigate = useNavigate();
  const { adminAuth } = useContext(AdminAuthenticationContext);

  const addProduct = () => {
    navigate("/add-products");
  };
  const addDealer = () => {
    navigate("/add-dealers");
  };
  const listProduct = () => {
    navigate("/list-products");
  };
  const listDealer = () => {
    navigate("/list-dealers");
  };
  useEffect(
    function () {
      if (!adminAuth) {
        navigate("/login");
      }
    },
    [adminAuth]
  );
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] sm:h-[77vh]">
      <div className="flex mt-14 flex-row items-center justify-center w-full h-[40%] gap-5 lg:gap-28 xl:gap-32">
        <div
          className="w-[43%] h-[190px] lg:w-[38%] xl:w-[34%] 2xl:w-[30%] flex flex-col items-center p-2 border rounded-md bg-[#08b4c4] active:bg-[#057a82] cursor-pointer"
          onClick={addProduct}
        >
          <div className="w-[90%] h-[90%]">
            <img className="w-full h-full" src="add-product.png" alt="" />
          </div>
          <button className="text-lg font-bold text-center">
            AÑADIR PRODUCTOS
          </button>
        </div>
        <div
          className="w-[43%] h-[190px] lg:w-[38%] xl:w-[34%] 2xl:w-[30%] flex flex-col items-center p-2 border rounded-md bg-[#08b4c4] active:bg-[#057a82] cursor-pointer"
          onClick={addDealer}
        >
          <div className="w-[90%] h-[90%]">
            <img className="w-full h-full" src="add-dealers.png" alt="" />
          </div>
          <button className="text-lg font-bold text-center">
            AÑADIR VENDEDORES
          </button>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center w-full h-[40%] gap-5 lg:gap-28 xl:gap-32">
        <div
          className="w-[43%] h-[190px] lg:w-[38%] xl:w-[34%] 2xl:w-[30%] flex flex-col items-center p-2 border rounded-md bg-[#08b4c4] active:bg-[#057a82] cursor-pointer"
          onClick={listProduct}
        >
          <div className="w-[90%] h-[90%] sm:w-[64%]">
            <img className="w-full h-full" src="list-product.png" alt="" />
          </div>
          <button className="text-lg font-bold text-center">
            LISTA PRODUCTOS
          </button>
        </div>
        <div
          className="w-[43%] h-[190px] lg:w-[38%] xl:w-[34%] 2xl:w-[30%] flex flex-col items-center p-2 border rounded-md bg-[#08b4c4] active:bg-[#057a82] cursor-pointer"
          onClick={listDealer}
        >
          <div className="w-[78%] h-[78%]">
            <img className="w-full h-full" src="list-dealers.png" alt="" />
          </div>
          <button className="text-lg font-bold text-center">
            LISTA VENDEDORES
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeAdmin;
