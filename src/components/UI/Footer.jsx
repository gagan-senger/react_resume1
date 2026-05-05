import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaYoutube, FaPinterestP, FaLinkedinIn } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";

export const Footer = () => {
  return (
    <footer className="bg-black text-white pt-12 md:pt-16 pb-8 px-4 sm:px-6 md:px-10">

      <div className="
        max-w-7xl mx-auto
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-10 md:gap-12
      ">

        {/* QUICK MENU */}
        <div>
          <h3 className="text-xs tracking-widest mb-5 md:mb-6">QUICK MENU</h3>
          <ul className="space-y-2 md:space-y-3 text-sm text-gray-300">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/menproducts" className="hover:text-white">Men Perfumes</Link></li>
            <li><Link to="/womenproducts" className="hover:text-white">Women Perfumes</Link></li>
            <li><Link to="/products" className="hover:text-white">All Perfumes</Link></li>
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact us</Link></li>
          </ul>
        </div>

        {/* PRIVACY */}
        <div>
          <h3 className="text-xs tracking-widest mb-5 md:mb-6">PRIVACY & TERMS</h3>
          <ul className="space-y-2 md:space-y-3 text-sm text-gray-300">
            <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
          </ul>
        </div>

        {/* CATEGORY */}
        <div>
          <h3 className="text-xs tracking-widest mb-5 md:mb-6">CATEGORY</h3>
          <ul className="space-y-2 md:space-y-3 text-sm text-gray-300">
            <li>
              <Link to="/category/eau-de-parfum" className="hover:text-white">
                Eau De Parfum
              </Link>
            </li>
            <li>
              <Link to="/category/eau-de-toilette" className="hover:text-white">
                Eau De Toilette
              </Link>
            </li>
          </ul>
        </div>

        {/* CONNECT */}
        <div>
          <h3 className="text-xs tracking-widest mb-5 md:mb-6">CONNECT WITH US</h3>

          <p className="text-sm text-gray-300 mb-5 md:mb-6">
            Be the first to know about new products, exclusive collections.
          </p>

          <div className="flex items-center border-b border-gray-600 pb-2 mb-5 md:mb-6">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent outline-none text-sm flex-1"
            />
            <HiOutlineMail className="text-xl shrink-0" />
          </div>

          <div className="flex gap-4 md:gap-5 text-lg md:text-xl">
            <FaInstagram />
            <FaFacebookF />
            <FaYoutube />
            <FiTwitter />
            <FaPinterestP />
            <FaLinkedinIn />
          </div>
        </div>

      </div>

      <div className="text-center text-xs text-gray-400 mt-12 md:mt-16">
        © 2026 Perfume24x7.com
      </div>

    </footer>
  );
};