import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AdminAuthenticationContext } from "../../contexts/AdminAuthentication";
import Login from "../../pages/Login";
import { products } from "../../data";
import { DealerAuthenticationContext } from "../../contexts/DealerAuthentication";
function App() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();
  const { adminAuth, setAdminAuth } = useContext(AdminAuthenticationContext);
  const { dealerAuth, setDealerAuth } = useContext(DealerAuthenticationContext);
  useEffect(function () {
    if (!adminAuth) {
      navigate("/login");
    }
  }, []);
  useEffect(function () {
    if (!dealerAuth) {
      navigate("/login");
    }
  }, []);
  const logoutAdmin = () => {
    setAdminAuth(false);
    navigate("/login");
  };
  const logoutDealer = () => {
    setDealerAuth(false);
    navigate("/login");
  };
  return (
    <nav className="fixed w-full bg-neutral-200">
      <div className="mx-auto w-full">
        <div className="w-full flex mx-auto justify-between">
          <div className="w-full flex items-center justify-between gap-16 my-5 px-10">
            <div>
              <Link
                to="/"
                className="flex gap-1 font-bold text-gray-700 items-center"
              >
                <img className="w-24 h-full" src="logo.png" alt="" />
              </Link>
            </div>
            <div className="hidden lg:flex gap-8 w-[70%] flex justify-between">
              <div className="flex gap-24 lg:gap-10">
                <div>
                  <Link
                    to="/"
                    className="py-2 px-3 rounded hover:text-blue-700 hover:underline hover:underline-offset-8 font-semibold"
                  >
                    Inicio
                  </Link>
                </div>
                <div>
                  <Link
                    to="/about"
                    className="py-2 px-3 rounded hover:text-blue-700 hover:underline hover:underline-offset-8 font-semibold"
                  >
                    Quienes Somos
                  </Link>
                </div>
                <div>
                  <Link
                    to={"/products"}
                    className="py-2 px-3 rounded hover:text-blue-700 hover:underline hover:underline-offset-8 font-semibold"
                  >
                    Productos
                  </Link>
                </div>
              </div>
              <div>
                {adminAuth && !dealerAuth ? (
                  <>
                    <Link
                      to="/home-admin"
                      className="py-2 px-3 rounded hover:text-blue-700 hover:underline hover:underline-offset-8 font-semibold lg:w-[12px]"
                    >
                      Administrador
                    </Link>
                    <Link
                      onClick={logoutAdmin}
                      className="p-2 border-solid rounded-lg bg-red-400 active:bg-[#057a82]"
                    >
                      Cerrar Sesion
                    </Link>
                  </>
                ) : dealerAuth && !adminAuth ? (
                  <>
                    <Link
                      to="/quoter"
                      className="py-2 px-3 rounded hover:text-blue-700 hover:underline hover:underline-offset-8 font-semibold lg:w-[12px]"
                    >
                      Cotizador
                    </Link>
                    <Link
                      onClick={logoutDealer}
                      className="p-2 border-solid rounded-lg bg-red-400 active:bg-[#057a82]"
                    >
                      Cerrar Sesion
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="p-2 border-solid rounded-lg bg-[#08b4c4] active:bg-[#057a82]"
                  >
                    Iniciar Sesion
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="lg:hidden flex items-center pr-6">
              <Link onClick={() => setToggleMenu(!toggleMenu)}>
                <img src="icon-menu.png" className="h-7 w-[40px]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`fixed z-40 w-full bg-gray-100 overflow-hidden flex flex-col lg:hidden gap-2  origin-top duration-500 ${
          !toggleMenu ? "h-0" : "h-[25%]"
        }`}
      >
        <div className="px-9">
          <div className="flex flex-col gap-1">
            <Link
              to="/"
              onClick={() => setToggleMenu(false)}
              className="py-1 px-1 rounded hover:text-blue-700 hover:underline hover:underline-offset-8 font-semibold"
            >
              Inicio
            </Link>
            <Link
              to="/about"
              onClick={() => setToggleMenu(false)}
              className="py-1 px-1 rounded hover:text-blue-700 hover:underline hover:underline-offset-8 font-semibold"
            >
              Quienes Somos
            </Link>
            <Link
              to="/products"
              onClick={() => setToggleMenu(false)}
              className="py-1 px-1 rounded hover:text-blue-700 hover:underline hover:underline-offset-8 font-semibold"
            >
              Productos
            </Link>
            {adminAuth ? (
              <Link
                to="/home-admin"
                onClick={() => setToggleMenu(false)}
                className="py-1 px-1 rounded hover:text-blue-700 hover:underline hover:underline-offset-8 font-semibold"
              >
                Administrador
              </Link>
            ) : (
              <></>
            )}
            {dealerAuth ? (
              <Link
                to="/quoter"
                onClick={() => setToggleMenu(false)}
                className="py-1 px-1 rounded hover:text-blue-700 hover:underline hover:underline-offset-8 font-semibold"
              >
                Cotizador
              </Link>
            ) : (
              <></>
            )}
            {adminAuth ? (
              <Link
                onClick={() => {
                  setToggleMenu(false);
                  logoutAdmin();
                }}
                className="py-1 px-1 rounded hover:text-blue-700 hover:underline hover:underline-offset-8 font-semibold bg-red-400 active:bg-[#057a82]"
              >
                Cerrar Sesion
              </Link>
            ) : (
              <></>
            )}
            {dealerAuth ? (
              <Link
                onClick={() => {
                  setToggleMenu(false);
                  logoutDealer();
                }}
                className="py-1 px-1 rounded hover:text-blue-700 hover:underline hover:underline-offset-8 font-semibold bg-red-400 active:bg-[#057a82]"
              >
                Cerrar Sesion
              </Link>
            ) : (
              <></>
            )}
            {!adminAuth && !dealerAuth && (
              <Link
                to="/login"
                onClick={() => setToggleMenu(false)}
                className="py-1 px-1 rounded hover:text-blue-700 hover:underline hover:underline-offset-8 font-semibold bg-[#08b4c4] active:bg-[#057a82]"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default App;
