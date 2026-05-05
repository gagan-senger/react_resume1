import { IoCheckmarkCircle } from "react-icons/io5";
import { IoIosStar } from "react-icons/io";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

export const ProductCard = ({ perfume }) => {
  const {
    defimage,
    hvrimage,
    pname,
    rating,
    reviews,
    price,
    original_price,
  } = perfume;

  const { addToCart } = useCart();
  const cardRef = useRef();

  useEffect(() => {
    const el = cardRef.current;
    if (!el || window.innerWidth < 768) return; // ❗ disable on mobile

    const enter = () => {
      gsap.to(el, {
        y: -10,
        scale: 1.02,
        boxShadow: "0px 15px 30px rgba(0,0,0,0.2)",
        duration: 0.4,
      });
    };

    const leave = () => {
      gsap.to(el, {
        y: 0,
        scale: 1,
        boxShadow: "0px 6px 15px rgba(0,0,0,0.1)",
        duration: 0.4,
      });
    };

    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);

    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative w-full bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
    >
      {/* IMAGE */}
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        <Link to={`/product/${perfume.id}`}>
          <img
            src={defimage}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:opacity-0 group-hover:scale-105"
            alt={pname}
          />
          <img
            src={hvrimage}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
            alt=""
          />
        </Link>
      </div>

      {/* TEXT */}
      <div className="p-3 sm:p-4 flex flex-col gap-2">
        <Link to={`/product/${perfume.id}`}>
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-1 hover:underline">
            {pname}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <IoIosStar className="text-yellow-400" />
            {rating}
          </span>
          <span className="flex items-center gap-1">
            <IoCheckmarkCircle className="text-blue-500" />
            {reviews}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-base sm:text-lg font-semibold text-black">
            {price}
          </span>
          <span className="text-gray-400 line-through text-xs sm:text-sm">
            {original_price}
          </span>
        </div>
      </div>

      {/* BUTTON */}
      <button
        onClick={() =>
          addToCart({
            ...perfume,
            qty: 1,
            size: perfume.size,
          })
        }
        className="w-full py-2.5 sm:py-3 bg-black text-white text-xs sm:text-sm uppercase tracking-wide"
      >
        Add to Cart
      </button>
    </div>
  );
};