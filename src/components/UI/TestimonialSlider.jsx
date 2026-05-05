import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import testimonials from "../../data/testimonials";
import { RiArrowLeftLongLine, RiArrowRightLongLine } from "react-icons/ri";

const positions = [-3, -2, -1, 0, 1, 2, 3];

const TestimonialSlider = () => {
  const [active, setActive] = useState(0);
  const [showArrows, setShowArrows] = useState(false);

  const refs = useRef([]);
  const textRef = useRef(null);
  const starsRef = useRef(null);

  const startX = useRef(0);
  const currentX = useRef(0);
  const isDragging = useRef(false);
  const hideTimer = useRef(null);

  const total = testimonials.length;
  const gap = 220;

  const getIndex = (i) => (i + total) % total;

  // layout
  const setLayout = (offset = 0) => {
    positions.forEach((pos, i) => {
      const el = refs.current[i];
      if (!el) return;

      const x = pos * gap + offset;
      const distance = Math.abs(pos);

      let scale = 1;
      let opacity = 1;

      if (distance === 0) {
        scale = 1.4;
      } else if (distance === 1) {
        scale = 1;
        opacity = 0.6;
      } else {
        scale = 0.75;
        opacity = 0.3;
      }

      gsap.set(el, { x, scale, opacity });
    });
  };

  const animateContent = () => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5 }
    );

    gsap.fromTo(
      starsRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.5 }
    );
  };

  useEffect(() => {
    setLayout(0);
  }, []);

  useEffect(() => {
    setLayout(0);
    animateContent();
  }, [active]);

  // drag
  const handleDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };

  const handleMove = (e) => {
    if (!isDragging.current) return;

    const diff = e.clientX - startX.current;
    currentX.current = diff;

    setLayout(diff);
  };

  const handleUp = () => {
    if (!isDragging.current) return;

    const diff = currentX.current;
    const movedIndex = Math.round(diff / gap);

    if (movedIndex !== 0) {
      setActive((p) => getIndex(p - movedIndex));
    } else {
      setLayout(0);
    }

    currentX.current = 0;
    isDragging.current = false;
  };

  const next = () => setActive((p) => getIndex(p + 1));
  const prev = () => setActive((p) => getIndex(p - 1));

  const handleMouseEnter = () => {
    setShowArrows(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
  };

  const handleMouseLeave = () => {
    // delay hide so user can move into arrow safely
    hideTimer.current = setTimeout(() => {
      setShowArrows(false);
    }, 200);
  };

  const handleArrowEnter = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setShowArrows(true);
  };

  return (
    <section className="w-full py-15 bg-[#f3f3f3] text-center select-none ">

      <h2 className="text-xl tracking-[3px] text-gray-700 mb-16">
        WHAT OUR CUSTOMERS HAVE TO SAY
      </h2>

      {/* OUTER WRAPPER (850px reference box) */}
      <div className="relative w-[850px] h-[140px] mx-auto flex justify-center items-center overflow-visible">

        {/* LEFT ARROW (OUTSIDE EDGE) */}
        <button
          onClick={prev}
          onMouseEnter={handleArrowEnter}
          className={`
            absolute -left-10 top-1/2 -translate-y-1/2 z-50
            transition-all duration-300
            ${showArrows ? "opacity-100 " : "opacity-0 pointer-events-none"}
            text-gray-600 hover:text-black
          `}
        >
          <RiArrowLeftLongLine size={28} />
        </button> 

        {/* IMAGE AREA */}
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative w-full h-full flex justify-center items-center overflow-hidden"
        >
          {/* IMAGES */}
          <div
            onMouseDown={handleDown}
            onMouseMove={handleMove}
            onMouseUp={handleUp}
            onMouseLeave={handleUp}
            className="relative w-full h-full flex justify-center items-center cursor-grab active:cursor-grabbing"
          >
            {positions.map((pos, i) => {
              const dataIndex = getIndex(active + pos);
              const item = testimonials[dataIndex];

              return (
                <img
                  key={i}
                  ref={(el) => (refs.current[i] = el)}
                  src={item.image}
                  draggable="false"
                  className="absolute w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover shadow-md"
                />
              );
            })}
          </div>
        </div>

        {/* RIGHT ARROW (OUTSIDE EDGE) */}
        <button
          onClick={next}
          onMouseEnter={handleArrowEnter}
          className={`
            absolute -right-10 top-1/2 -translate-y-1/2 z-50
            transition-all duration-300
            ${showArrows ? "opacity-100 " : "opacity-0  pointer-events-none"}
            text-gray-600 hover:text-black
          `}
        >
          <RiArrowRightLongLine size={28} />
        </button>

      </div>




      {/* ⭐ STARS */}
      <div ref={starsRef} className="mt-10 text-yellow-400 text-2xl font-[font2]">
        ★★★★★
      </div>

      {/* 💬 TEXT */}
      <div ref={textRef} key={active}>
        <p className="mt-4 max-w-2xl mx-auto text-gray-700 font-[font2] font-medium text-lg ">
          {testimonials[active].review}
        </p>

        <p className="mt-4 text-lg font-[font] font-light tracking-wider  text-gray-500">
          — {testimonials[active].name}
        </p>

        <p className=" mt-2 text-sm text-gray-400 font-[font2] font-light">
          {testimonials[active].username}
        </p>
      </div>

    </section>
  );
};

export default TestimonialSlider;