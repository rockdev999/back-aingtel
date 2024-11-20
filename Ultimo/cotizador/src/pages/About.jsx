// actualizado
function About() {
  return (
    <div className="flex  flex-col p-4 gap-4">
      <div className="flex mt-14 flex-col gap-5 lg:flex-row lg:items-center xl:mx-20">
        <div className="flex flex-col justify-center shadow-[10px_13px_15px_-10px_rgba(0,0,0,0.5)] lg:h-[223px] xl:h-[200px]">
          <div className="bg-[#04b4c4] text-2xl p-2 w-full text-start sm:text-lg md:text-xl">
            <strong>MISIÓN</strong>
          </div>
          <article className="text-lg text-justify p-4 sm:text-base">
            Proveer soluciones integrales de alta innovación tecnológicas
            adaptadas a las necesidades del cliente en cuanto a electricidad,
            electrónica, informática y telecomunicaciones asesorando de forma
            transparente y ofreciendo servicios de calidad.
          </article>
        </div>
        <div className="h-auto w-full flex justify-center sm:h-[300px] sm:w-full sm:justify-center">
          <img className="w-4/5 h-auto sm:w-[270px]" src="about.png" alt="" />
        </div>
        <div className="flex flex-col justify-center shadow-[10px_13px_15px_-10px_rgba(0,0,0,0.5)] lg:h-[222px] xl:h-[200px]">
          <div className="bg-[#04b4c4] text-2xl p-2 w-full text-start sm:text-lg md:text-xl">
            <strong>VISIÓN</strong>
          </div>
          <article className="text-lg text-justify p-4  sm:text-base">
            Posicionarnos como una empresa líder de Ingeniería, Seguridad y
            Tecnología a nivel nacional, siendo conocida por su excelencia,
            capacidad creativa, cali- dad, innovación y responsabilidad social.
          </article>
        </div>
      </div>
      <div className="my-3 grid grid-cols-2 place-items-center h-auto gap-y-3 sm:grid-cols-3 lg:grid-cols-5">
        <div className="flex flex-col items-center justify-center w-[158px] h-[270px] border rounded-md shadow-[1px_-1px_10px_1px_rgba(0,0,0,0.1)]">
          <div className="h-[140px]">
            <img className="h-full" src="honestidad.png" alt="" />
          </div>
          <div className="bg-gray-300 text-center text-sm h-auto w-full">
            <strong>HONESTIDAD</strong>
          </div>
          <article className="px-3 text-xs h-auto">
            Nuestras acciones y decisiones están enmarcadas en la transparencia
            conducta moral que nuestros clientes demandan.
          </article>
        </div>
        <div className="flex flex-col items-center justify-center w-[158px] h-[270px] border rounded-md shadow-[1px_-1px_10px_1px_rgba(0,0,0,0.1)]">
          <div className="h-[140px]">
            <img className="h-full" src="responsabilidad.png" alt="" />
          </div>
          <div className="bg-gray-300 text-center text-sm h-auto w-full">
            <strong>RESPONSABILIDAD</strong>
          </div>
          <article className="px-3 text-xs h-auto">
            Nuestras acciones y decisiones están enmarcadas en la transparencia
            conducta moral que nuestros clientes demandan.
          </article>
        </div>

        <div className="flex flex-col items-center justify-center w-[158px] h-[270px] border rounded-md shadow-[1px_-1px_10px_1px_rgba(0,0,0,0.1)]">
          <div className="h-[140px]">
            <img className="h-full" src="respeto.png" alt="" />
          </div>
          <div className="bg-gray-300 text-center text-sm h-auto w-full">
            <strong>RESPETO</strong>
          </div>
          <article className="px-3 text-xs h-auto">
            El cual es proyectado tanto en sus usuarios, el mercado, así como en
            el medio ambiente que le circunda.
          </article>
        </div>

        <div className="flex flex-col items-center justify-center w-[158px] h-[270px] border rounded-md shadow-[1px_-1px_10px_1px_rgba(0,0,0,0.1)] sm:col-span-1 sm:ml-48 lg:ml-0">
          <div className="h-[140px]">
            <img className="h-full" src="trabajo.png" alt="" />
          </div>
          <div className="bg-gray-300 text-center text-sm h-auto w-full">
            <strong>TRABAJO EN EQUIPO</strong>
          </div>
          <article className="px-3 text-xs h-auto">
            La empresa promueve el trabajo en equipo en cada una de sus
            actividades de tal manera que se realizan colaborativa y eficiente.
          </article>
        </div>
        <div className="flex flex-col items-center justify-center w-[158px] h-[270px] border rounded-md shadow-[1px_-1px_10px_1px_rgba(0,0,0,0.1)] col-span-2 sm:col-span-2 lg:col-span-1">
          <div className="h-[140px]">
            <img className="h-full" src="excelencia.png" alt="" />
          </div>
          <div className="bg-gray-300 text-center text-sm h-auto w-full">
            <strong>EXCELENCIA</strong>
          </div>
          <article className="px-3 text-xs h-auto">
            Nos esforzamos en la búsqueda constante de la calidad para exceder
            las expectativas de los clientes.
          </article>
        </div>
      </div>
    </div>
  );
}

export default About;
