import Image from "next/image";
import logo from "../../public/assets/logo.png";
const Footer = () => {
  return (
    <footer className="bg-slate-100 text-blue-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Image
              src={logo}
              alt="BookNest Logo"
              height={20}
              width={20}
              className="h-10 w-auto mb-1"
            />
            <p className="text-blue-950 ">
              Your one-stop shop for all things books!
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-blue-950  hover:text-blue-600 transition"
            >
              Facebook
            </a>
            <a
              href="#"
              className="text-blue-950  hover:text-blue-600 transition"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-blue-950  hover:text-blue-600 transition"
            >
              Instagram
            </a>
          </div>
        </div>
        <div className="border-t border-gray-500 mt-6 pt-6 text-center text-gray-700">
          <p>&copy; 2023 BookNest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
