import { Link, useLocation } from "react-router-dom";
import perfumeData from "../data/perfumeData";
import { ProductCard } from "../components/UI/ProductCard";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export const Arrival = ({ limit }) => {
  const btnRef = useRef(null);
  const fillRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const fill = fillRef.current;
    const text = textRef.current;
    const btn = btnRef.current;

    if (!fill || !text || !btn) return;

    // initial state
    gsap.set(fill, {
      x: "-140%",
      rotation: 10,
      transformOrigin: "left center",
    });

    const tlEnter = gsap.timeline({ paused: true });
    const tlLeave = gsap.timeline({ paused: true });

    // 🌟 Hover IN (slower + smoother)
    tlEnter
      .to(fill, {
        x: "0%",
        rotation: 0,
        duration: 0.85,              // ⬅️ longer
        ease: "expo.out",            // ⬅️ premium easing
      })
      .to(
        text,
        {
          color: "#fff",
          duration: 0.35,
          ease: "power2.out",
        },
        "-=0.55"                     // ⬅️ nicer overlap
      );

    // 🌟 Hover OUT (soft exit, not abrupt)
    tlLeave
      .to(fill, {
        x: "-140%",
        rotation: 8,
        duration: 0.75,
        ease: "expo.inOut",
      })
      .to(
        text,
        {
          color: "#000",
          duration: 0.4,
          ease: "power2.inOut",
        },
        "-=0.5"
      );

    const enter = () => {
      tlLeave.pause(0);
      tlEnter.play();
    };

    const leave = () => {
      tlEnter.pause(0);
      tlLeave.play();
    };

    btn.addEventListener("mouseenter", enter);
    btn.addEventListener("mouseleave", leave);

    return () => {
      btn.removeEventListener("mouseenter", enter);
      btn.removeEventListener("mouseleave", leave);
    };
  }, []);

  const location = useLocation();
  const isHome = location.pathname === "/";

  const newArrivals = perfumeData.filter(
    (product) => product.isNewArrival === true
  );


  const displayProducts = limit
    ? newArrivals.slice(0, limit)
    : newArrivals;

  return (
    <section
      className={`w-full ${isHome ? "mt-12 md:mt-16" : "mt-28 md:mt-40"
        } px-4 sm:px-6 md:px-10 lg:px-16`}
    >
      <div className="max-w-[1265px] mx-auto flex flex-col items-center">

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-[font2] text-black mb-8 md:mb-12 text-center">
          New Arrivals
        </h2>

        {/* Products */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full">
          {displayProducts.map((item, index) => (
            <ProductCard key={index} perfume={item} />
          ))}
        </div>

        {/* Button */}
        {limit && (
          <Link to="/arrival">
            <button
              ref={btnRef}
              className="relative overflow-hidden mt-8 md:mt-10 mb-16 md:mb-20 px-8 sm:px-10 md:px-14 py-2 sm:py-2.5 border border-black cursor-pointer uppercase tracking-wide text-sm sm:text-base"
            >
              {/* Fill Layer */}
              <span
                ref={fillRef}
                className="absolute top-0 left-0 w-[130%] h-full bg-black z-10 pointer-events-none"
              />

              {/* Text */}
              <span
                ref={textRef}
                className="relative z-20 text-black"
              >
                View All
              </span>
            </button>
          </Link>
        )}
      </div>
    </section>
  );
};