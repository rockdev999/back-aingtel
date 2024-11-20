import React, { useState, useEffect, useContext } from "react";
import { DealerAuthenticationContext } from "../contexts/DealerAuthentication";
import axios from "axios";
import UseForm from "../components/addproducts/UseForm";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import { numeroALetras } from "../components/NumeralALiteral/NumeralAliteral.js";

const Quoter = () => {
  const { dealerAuth } = useContext(DealerAuthenticationContext);
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [productosEjemplo, setProductosEjemplo] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(0);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [precio, setPrecio] = useState(0.0);
  const [listaProductos, setListaProductos] = useState([]);
  const [precioTotal, setPrecioTotal] = useState(0.0);
  const [modificar, setModificar] = useState(false);
  const [modal, setModal] = useState(false);
  const [newInput, setNewInput] = useState(0.0);
  const { form, dataForm, resetForm } = UseForm({
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
  });
  const [item, setItem] = useState(-1);
  useEffect(() => {
    // Configurar el intervalo para hacer la solicitud cada 5 segundos (5000ms)
    const intervalId = setInterval(() => {
      axios
        //AQUI DEBERIA IR LA RUTA DEL BACKEND
        .get("http://localhost:3000/quotations")
        .then((result) => {
          setItem(result.data.count); // Actualizar el estado con el nuevo conteo
        })
        .catch((error) => console.log(error));
    }, 10000); // 5000ms = 5 segundos

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);
  const [user, setUser] = useState(null);
  const [dealer, setDealer] = useState({});

  useEffect(() => {
    // Obtener los datos del usuario de localStorage
    const storedUser = localStorage.getItem("userDealer");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  useEffect(() => {
    setPrecioTotal(parseFloat(newInput));
  }, [newInput]);
  // Verificar que user no sea null antes de acceder a user.username
  useEffect(() => {
    if (user && user.username) {
      const name = user.username;

      axios
        //AQUI DEBERIA IR LA RUTA DEL BACKEND
        .get(`http://localhost:3000/dealers/${name}`)
        .then((result) => {
          setDealer(result.data);
          console.log(result.data);
        })
        .catch((error) => console.log(error));
    }
  }, [user]);

  useEffect(
    function () {
      if (!dealerAuth) {
        navigate("/login");
      }
    },
    [dealerAuth]
  );
  useEffect(() => {
    axios
      //AQUI DEBERIA IR LA RUTA DEL BACKEND
      .get("http://localhost:3000/categories")
      .then((result) => {
        setCategorias(result.data);
        console.log(result.data);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    axios
      //AQUI DEBERIA IR LA RUTA DEL BACKEND
      .get("http://localhost:3000/products")
      .then((result) => {
        setProductosEjemplo(result.data);
        console.log(result.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (categoriaSeleccionada) {
      // Simulación de productos por categoría (reemplaza esto con una llamada a tu API)
      axios
        //AQUI DEBERIA IR LA RUTA DEL BACKEND
        .get("http://localhost:3000/products")
        .then((result) => {
          setProductosEjemplo(result.data);
          // console.log("adsasd");
          // console.log(productosEjemplo);
        })
        .catch((error) => console.log(error));
      setProductos(
        productosEjemplo.filter(
          (p) => p.category === parseInt(categoriaSeleccionada)
        )
      );
    } else {
      setProductos([]);
    }
  }, [categoriaSeleccionada]);

  const handleAgregarProducto = () => {
    if (productoSeleccionado && cantidad > 0) {
      const productoConCantidad = {
        ...productoSeleccionado,
        cantidad,
        precio: productoSeleccionado.price * cantidad,
      };
      setPrecioTotal(precioTotal + precio);
      setListaProductos([...listaProductos, productoConCantidad]);
      setCategoriaSeleccionada(0);
      setProductoSeleccionado(null);
      document.getElementById("cantidad").value = "";
      setCantidad(1);
      setPrecio(0.0); // Reiniciar cantidad
    }
  };

  const handleEliminarProducto = (code) => {
    setListaProductos(listaProductos.filter((prod) => prod.code !== code));
  };

  const handleModificar = () => {
    setModificar(true);
  };
  const handleAceptar = (input) => {
    setPrecioTotal(input);
    console.log("Precio modificado newInput: " + newInput);
    console.log("Precio modificado PrecioTotal: " + precioTotal);
    setPrecioTotal(newInput);
    console.log("Precio modificado PrecioTotal2: " + precioTotal);
    setModificar(false);
  };
  const handleCliente = () => {
    if (listaProductos.length === 0) alert("Agregue Productos");
    else setModal(true);
  };
  const handleGenerarPDF = async () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Título
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("AINGTEL", pageWidth / 2, 14, { align: "center" });
    doc.setFontSize(14);
    doc.text("Alta Ingenieria y Telematica", pageWidth / 2, 20, {
      align: "center",
    });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(
      "El Alto Zona Villa Exaltación Sección 1 Calle 3 Nº8 , La Paz, Bolivia",
      pageWidth / 2,
      23.5,
      { align: "center" }
    );
    doc.text("Whatsapp. (591) 61233304", pageWidth / 2, 27, {
      align: "center",
    });
    doc.text(
      "Facebook: Aingtel      Correo: aingtelempresa@gmail.com",
      pageWidth / 2,
      30,
      { align: "center" }
    );
    doc.setLineWidth(0.5);
    doc.line(10, 31.5, pageWidth - 10, 31.5);

    doc.setFontSize(14);
    doc.text("COTIZACION", pageWidth / 2, 40, { align: "center" });
    doc.setLineWidth(0.2);
    doc.line(65, 45, pageWidth - 65, 45);
    doc.setFontSize(9);
    doc.text(`Item: ${item + 1}`, 65, 50, { align: "left" });

    // Datos del vendedor
    doc.setFontSize(12);
    doc.text("DATOS DEL VENDEDOR:", pageWidth / 2 - 50, 60, {
      align: "center",
    });
    doc.setFontSize(10);
    doc.text(`CI: ${dealer.ci}`, pageWidth / 2 - 50, 65, { align: "center" });
    doc.text(`Nombre: ${dealer.name}`, pageWidth / 2 - 50, 70, {
      align: "center",
    });
    doc.text(`Correo: ${dealer.email}`, pageWidth / 2 - 50, 75, {
      align: "center",
    });

    // Datos del comprador
    doc.setFontSize(12);
    doc.text("DATOS DEL COMPRADOR", pageWidth / 2 + 50, 60, {
      align: "center",
    });
    doc.setFontSize(10);
    doc.text(`Nombre: ${form.nombre}`, pageWidth / 2 + 50, 65, {
      align: "center",
    });
    doc.text(`Telefono: ${form.telefono}`, pageWidth / 2 + 50, 70, {
      align: "center",
    });
    doc.text(`Correo: ${form.correo}`, pageWidth / 2 + 50, 75, {
      align: "center",
    });
    doc.text(`Direccion: ${form.direccion}`, pageWidth / 2 + 50, 80, {
      align: "center",
    });

    // Agregar encabezado de la tabla de productos
    let yOffset = 105; // Posición inicial debajo de los datos
    doc.setFontSize(10);
    doc.text("Producto", 14, yOffset);
    doc.text("Cantidad", 50, yOffset);
    doc.text("Precio Unitario", 80, yOffset);
    doc.text("Total", 110, yOffset);

    // Dibujar la línea debajo del encabezado de la tabla
    doc.setLineWidth(0.2);
    doc.line(10, yOffset + 2, pageWidth - 10, yOffset + 4);

    // Incrementar yOffset para la primera fila de productos
    yOffset += 10;

    // Lista de productos
    for (let i = 0; i < listaProductos.length; i++) {
      const prod = listaProductos[i];
      const img = new Image();
      img.src = prod.image;

      img.onload = () => {
        // Renderizar el producto en el PDF
        doc.setFontSize(10);
        doc.text(prod.name, 14, yOffset);
        doc.text(prod.cantidad.toString(), 50, yOffset);
        doc.text(`${prod.price.toFixed(2)} Bs.`, 80, yOffset);
        doc.text(
          `${(prod.price * prod.cantidad).toFixed(2)} Bs.`,
          110,
          yOffset
        );
        const imgFormat = prod.image.split(".").pop().toUpperCase();
        // Agregar la imagen al PDF
        if (["PNG", "JPEG", "JPG"].includes(imgFormat)) {
          doc.addImage(img, imgFormat, 150, yOffset - 4, 20, 20);
        }
        yOffset += 20; // Espacio entre productos

        // Guardar el PDF cuando se cargue la última imagen
        if (i === listaProductos.length - 1) {
          // Agregar "PRECIO TOTAL" al final
          yOffset += 15; // Espacio adicional antes del total
          doc.setFontSize(12);
          doc.text("PRECIO TOTAL:", 20, yOffset);
          doc.text(`${parseFloat(precioTotal).toFixed(2)} Bs.`, 55, yOffset);
          doc.text(`${numeroALetras(precioTotal)}`, 55, yOffset + 6);
          doc.save("cotizacion.pdf");
        }
      };

      img.onerror = (err) => {
        console.error("Error al cargar la imagen", err);
        if (i === listaProductos.length - 1) {
          // Agregar "PRECIO TOTAL" al final si hubo error
          yOffset += 15; // Espacio adicional antes del total
          doc.setFontSize(12);
          doc.text("PRECIO TOTAL:", 20, yOffset);
          doc.text(`${precioTotal.toFixed(2)} Bs.`, 55, yOffset);
          doc.text(`${numeroALetras(precioTotal)}`, 55, yOffset + 6);

          doc.save("cotizacion.pdf");
        }
      };
    }

    // Guardar el documento si no hay imágenes
    if (listaProductos.length === 0) {
      // Agregar "PRECIO TOTAL" al final
      yOffset += 15; // Espacio adicional antes del total
      doc.setFontSize(12);
      doc.text("PRECIO TOTAL:", 20, yOffset);
      doc.text(`${precioTotal.toFixed(2)} Bs.`, 55, yOffset);
      doc.text(`${numeroALetras(precioTotal)}`, 55, yOffset + 6);
      doc.save("cotizacion.pdf");
    }
  };
  const sendQuotation = () => {
    axios
      //AQUI DEBERIA IR LA RUTA DEL BACKEND
      .post("http://localhost:3000/quotations", {
        dealer_email: dealer.email,
        buyer_name: form.nombre,
        buyer_phone: form.telefono,
        buyer_email: form.correo,
        buyer_address: form.direccion,
        total_price: precioTotal,
      })
      .then(() => {
        console.log("correct");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const sendCliente = () => {
    const { nombre, correo, telefono, direccion } = form;
    if (nombre === "" || correo === "" || telefono === "" || direccion === "") {
      alert("Llene todos los campos...!");
      console.log(form);
    } else {
      setModal(false);
      console.log(form);
      setCategoriaSeleccionada(0);
      setProductoSeleccionado(null);
      document.getElementById("cantidad").value = "";
      setPrecio(0.0);
      setListaProductos([]);
      setPrecioTotal(0.0);
      sendQuotation();
      handleGenerarPDF();
    }
  };
  // console.log(user);
  return (
    <div className="mt-24 w-full h-full flex justify-center items-center">
      <div className="flex flex-col items-center gap-3 w-full">
        <p className="font-bold text-2xl border-b-4 border-sky-700">
          COTIZACIÓN
        </p>

        {/* Desplegable de categorías */}
        {/* <label className="bg-blue-500" htmlFor="categoria">
          Categoría:
        </label> */}
        <div className="w-full min-w-[200px] flex justify-center md:w-[60%] lg:w-[50%]">
          <select
            className="w-[77%] py-2 pl-3 border border-gray-300 rounded-md"
            id="categoria"
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          >
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        {/* Desplegable de productos */}
        {/* <label htmlFor="producto">Producto:</label> */}
        <div className=" w-full min-w-[200px] flex justify-center md:w-[60%] lg:w-[50%]">
          <select
            className="w-[77%] py-2 pl-3 border border-gray-300 rounded-md"
            id="producto"
            value={productoSeleccionado ? productoSeleccionado.code : ""}
            onChange={(e) => {
              const producto = productos.find((p) => p.code === e.target.value);
              setProductoSeleccionado(producto);
              if (producto) setPrecio(producto.price * cantidad);
            }}
          >
            <option value="">Seleccione un producto</option>
            {productos.map((prod) => (
              <option key={prod.code} value={prod.code}>
                {prod.name}
              </option>
            ))}
          </select>
        </div>
        {/* Input de cantidad */}
        <div className=" w-full min-w-[200px] flex justify-center md:w-[60%] lg:w-[50%]">
          <input
            className="w-[77%] py-2 pl-3 border border-gray-300 rounded-md"
            type="number"
            id="cantidad"
            placeholder="Cantidad"
            onChange={(e) => {
              setCantidad(parseInt(e.target.value) || 1);
              if (productoSeleccionado) {
                setPrecio(productoSeleccionado.price * (e.target.value || 1));
              }
            }}
            min={0}
          />
        </div>
        {/* Mostrar precio total */}
        <div className="flex gap-2 text-xl font-semibold bg-slate-100 rounded-md p-2">
          <p>Precio:</p>
          <p className="bg-gray-300 px-2 rounded-sm">{precio} Bs</p>
        </div>

        {/* Botón de agregar */}
        <button
          onClick={handleAgregarProducto}
          className="py-2 px-3 bg-[#08b4c4] border rounded-md font-bold text-white active:bg-[#057a82]"
        >
          Agregar Producto
        </button>

        {/* Lista de productos agregados */}
        <p className="font-bold text-lg border-b-4 border-sky-700">
          Productos Agregados
        </p>
        <section className="py-1 bg-blueGray-50 w-[90%] md:w-[70%] lg:w-[60%]">
          <div className=" flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className=" w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-2 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                      #
                    </th>
                    <th className="px-2 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                      Producto
                    </th>
                    <th className="px-2 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                      Cantidad
                    </th>
                    <th className="px-2 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                      Total
                    </th>
                    <th className="px-2 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {listaProductos.map((prod, index) => (
                    <tr key={prod.code}>
                      <th className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-blueGray-700 text-center">
                        {index + 1}
                      </th>
                      <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-sm text-center whitespace-nowrap p-4 ">
                        {prod.name}
                      </td>
                      <td className="border-t-0 px-2 align-center border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center">
                        {prod.cantidad}
                      </td>
                      <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center">
                        <i className="fas fa-arrow-up text-emerald-500"></i>
                        {prod.precio}
                      </td>
                      <td
                        className="border-t-0 px-2 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center w-11"
                        onClick={() => handleEliminarProducto(prod.code)}
                      >
                        <img
                          className="cursor-pointer"
                          src="icon-close.png"
                          alt=""
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <div className="flex gap-4 text-base font-semibold bg-slate-100 rounded-md p-2">
          <div className="flex gap-2">
            {!modificar ? (
              <div className="flex gap-2">
                <p>Precio Total:</p>
                <p className="bg-gray-300 px-2 rounded-sm">{precioTotal} Bs</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="flex gap-2">
                  <p>Precio Total:</p>
                  <p className="bg-gray-300 px-2 rounded-sm">
                    {precioTotal} Bs
                  </p>
                </div>
                <div className="flex gap-2 items-center justify-center">
                  <p>Nuevo Precio:</p>
                  <input
                    type="number"
                    name="input"
                    onChange={(e) => setNewInput(e.target.value)}
                    className="bg-gray-300 px-2 rounded-sm w-[40%]"
                  />
                  <button
                    onClick={({ newInput }) => handleAceptar(newInput)}
                    className="px-2 bg-[#08b4c4] border rounded-md text-base text-white active:bg-[#057a82]"
                  >
                    Aceptar
                  </button>
                </div>
              </div>
            )}
          </div>
          {!modificar ? (
            <button
              onClick={handleModificar}
              className="px-2 bg-[#08b4c4] border rounded-md text-base text-white active:bg-[#057a82]"
            >
              Modificar
            </button>
          ) : (
            <></>
          )}
        </div>
        <button
          onClick={handleCliente}
          className="py-2 px-3 bg-[#08b4c4] border border-solid border-blue-700 border-4 rounded-md font-bold text-black active:bg-[#057a82]"
        >
          Confirmar Cotizacion
        </button>
      </div>
      {modal ? (
        <div
          className={`flex fixed w-full h-full bg-sky-300 bg-gray-800 bg-opacity-50 justify-center items-center`}
        >
          <div
            className={
              "relative flex gap-3 p-4 w-[97%] h-auto sm:w-[50%] lg:w-[35%] xl:w-[27%] bg-white  flex-col justify-center items-center boder rounded-md md:w-[50%] md:w-[40%] xl:w-[35%] bg-zinc-400"
            }
          >
            <p
              className="absolute top-1 right-2 p-2 bg-red-500 rounded-full text-white cursor-pointer"
              onClick={() => {
                resetForm();
                console.log(form);
                setModal(false);
              }}
            >
              X
            </p>
            <p className="font-bold text-lg border-b-4 border-sky-700">
              Productos Agregados
            </p>
            <form className="w-full flex flex-col gap-2">
              <input
                type="text"
                placeholder="Nombre"
                name="nombre"
                onChange={dataForm}
                className="w-full py-2 pl-3 border border-gray-300 rounded-md"
              />
              <input
                type="email"
                placeholder="Correo"
                name="correo"
                onChange={dataForm}
                className="w-full py-2 pl-3 border border-gray-300 rounded-md"
              />
              <input
                type="number"
                placeholder="Telefono"
                name="telefono"
                onChange={dataForm}
                className="w-full py-2 pl-3 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Direccion"
                name="direccion"
                onChange={dataForm}
                className="w-full py-2 pl-3 border border-gray-300 rounded-md"
              />
            </form>
            <button
              className="bg-[#08b4c4] p-4 border-solid border-2 rounded-lg active:bg-[#057a82] cursor-pointer"
              onClick={() => {
                sendCliente();
              }}
            >
              Generar PDF
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Quoter;
