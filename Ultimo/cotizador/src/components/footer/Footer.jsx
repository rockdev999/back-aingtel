function Footer() {
  return (
    <div className="bg-black w-full mt-4 py-3 flex  justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-row gap-5 lg:gap-12">
          <a href="https://www.facebook.com/AINGTEL">
            <img
              className="border border-8 rounded-full bg-white w-12 h-12 cursor-pointer"
              src="facebook.png"
              alt="facebook"
            />
          </a>
          <a href="">
            <img
              className="border border-8 rounded-full bg-white w-12 h-12 cursor-pointer"
              src="tik-tok.png"
              alt="tiktok"
            />
          </a>
          <a href="">
            <img
              className="border border-8 rounded-full bg-white w-12 h-12 cursor-pointer"
              src="instagram.png"
              alt="instagram"
            />
          </a>
          <a href="mailto:aingtelempresa@gmail.com">
            <img
              className="border border-8 rounded-full bg-white w-12 h-12 cursor-pointer"
              src="gmail.png"
              alt="gmail"
            />
          </a>
        </div>
        <div className="font-serif text-white">Contactanos: 61233304</div>
      </div>
    </div>
  );
}

export default Footer;
