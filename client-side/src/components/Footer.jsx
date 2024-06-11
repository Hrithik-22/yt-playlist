const Footer = () => {
  return (
    <footer className="bg-black w-full p-5 md:p-8">
      <p className="text-center text-white text-sm sm:text-base font-medium tracking-wide">
        Developed with
        <button className="link heart-btn scale-100 hover:scale-125 transition-all">
          <span role="img" aria-label="heart" className="animate-pulse">❤️</span>
        </button>
        by <span className="text-white">Hrithik Kedare</span>
      </p>
    </footer>
  );
};

export default Footer;
