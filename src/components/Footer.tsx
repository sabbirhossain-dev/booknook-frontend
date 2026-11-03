import Image from "next/image";
import Link from "next/link";
import logo from "../../public/assets/logo.png";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaHeart,
  FaMapMarkerAlt,
  FaBookOpen,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-50 text-blue-950">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Logo & Description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src={logo}
                alt="BookNest Logo"
                width={45}
                height={45}
                className="h-10 md:h-11 w-10 md:w-11 object-contain"
              />

              <span className="text-xl md:text-2xl font-extrabold tracking-tight">
                Book<span className="text-blue-600">Nook</span>
              </span>
            </Link>

            <p className="mt-3 md:mt-5 max-w-sm text-sm leading-6 md:leading-7 text-slate-600">
              Your one-stop destination for discovering, borrowing, and enjoying
              books. Explore new stories and make reading a habit.
            </p>

            {/* Social Links */}
            <div className="mt-4 md:mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm transition-all hover:-translate-y-1 hover:bg-blue-600 hover:text-white"
              >
                <FaFacebookF size={17} />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sky-500 shadow-sm transition-all hover:-translate-y-1 hover:bg-sky-500 hover:text-white"
              >
                <FaTwitter size={17} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-pink-500 shadow-sm transition-all hover:-translate-y-1 hover:bg-pink-600 hover:text-white"
              >
                <FaInstagram size={17} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 md:mb-5 text-base font-bold sm:text-lg">
              Quick Links
            </h3>

            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <Link href="/" className="transition hover:text-blue-600">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/all-books"
                  className="transition hover:text-blue-600"
                >
                  All Books
                </Link>
              </li>

              <li>
                <Link
                  href="/my-books"
                  className="transition hover:text-blue-600"
                >
                  My Books
                </Link>
              </li>

              <li>
                <Link
                  href="/add-book"
                  className="transition hover:text-blue-600"
                >
                  Add Book
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-3 md:mb-5 text-base font-bold sm:text-lg">
              Categories
            </h3>

            <ul className="space-y-2.5 text-sm text-slate-600">
              {["Fiction", "Science", "History", "Technology"].map(
                (category) => (
                  <li key={category}>
                    <Link
                      href={`/all-books?category=${encodeURIComponent(category)}`}
                      className="transition hover:text-blue-600"
                    >
                      {category}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 md:mb-5 text-base font-bold sm:text-lg">
              Get In Touch
            </h3>

            <p className="mb-5 text-sm leading-6 md:leading-7 text-slate-600">
              Have questions or suggestions? Feel free to contact us.
            </p>

            <a
              href="mailto:support@booknest.com"
              className="inline-flex max-w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 md:py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <FaEnvelope size={16} />
              Contact Us
            </a>

            <div className="mt-5 flex items-center gap-2 text-sm text-slate-600">
              <FaMapMarkerAlt className="shrink-0 text-blue-600" />
              <span>Available Online Worldwide</span>
            </div>

            <div className="mt-2 md:mt-4 flex items-center gap-2 text-sm text-slate-600">
              <FaBookOpen className="shrink-0 text-blue-600" />
              <span>Read More. Discover More.</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 border-t border-blue-200 sm:my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-1 md:gap-5 text-center sm:flex-row sm:text-left">
          <p className="text-xs leading-6 text-slate-500 sm:text-sm">
            © {new Date().getFullYear()} BookNest. All rights reserved.
          </p>

          <p className="flex flex-wrap items-center justify-center gap-1 text-xs text-slate-500 sm:text-sm">
            Made with
            <FaHeart className="text-red-500" />
            for book lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
