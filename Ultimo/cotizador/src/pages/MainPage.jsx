import React from "react";
// actualizado
function MainPage() {
  return (
    <div className="flex flex-col items-center p-4 gap-4">
      <div className="flex mt-14 justify-center lg:w-[95%] lg:flex lg:justify-start">
        <div className="w-full flex flex-col border-black rounded-md shadow-[1px_-1px_10px_1px_rgba(0,0,0,0.5)] md:flex-row md:items-center md:w-[90%] lg:w-[80%] mt-5">
          <div className="w-full p-4 md:h-[90%]">
            <img
              className="rounded-md w-full h-full"
              src="nuestra-empresa.png"
              alt=""
            />
          </div>
          <article className="px-5 py-1 text-justify md:w-[80%] md:p-5 md:text-justify md:text-md lg:text-lg xl:text-xl xl:p-5">
            Aingtel "Alta Ingeniería & Telemática" Nuestro objetivo es
            proporcionar soluciones integrales completas adecuadas a cada
            cliente usando tecnología y metodología avanzada en las áreas de
            electricidad, electrónica, informática y telecomunicaciones con
            personal altamente calificado '(cualificado)' que satisfacen las
            necesidades del cliente, cumpliendo criterios de eficacia, calidad,
            competitividad y rentabilidad.
          </article>
        </div>
      </div>
      <div className="flex justify-center lg:w-[95%] lg:flex lg:justify-end">
        <div className="w-full flex flex-col-reverse border-black rounded-md shadow-[1px_-1px_10px_1px_rgba(0,0,0,0.5)] md:flex-row md:items-center md:w-[90%] lg:w-[80%] mt-5">
          <article className="px-5 py-1 text-justify md:w-[80%] md:p-5 md:text-justify md:text-md lg:text-lg xl:text-xl xl:p-5">
            Iniciamos proyectos desde el año 2002, contamos con un centenar de
            clientes y amplia experiencia plagada de casos de éxito que
            consolida a nuestra empresa dentro de su sector. <br />
            Esta posición nos ha permitido especializarnos en diversas áreas de
            negocio que están contribuyendo a mejorar la calidad que caracteriza
            nuestras soluciones, incrementando el valor añadido ofrecido.
          </article>
          <div className="w-full p-4 md:h-[90%]">
            <img
              className="rounded-md w-full h-full"
              src="nuestra-empresa2.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
