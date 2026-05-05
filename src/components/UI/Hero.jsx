import { useEffect, useRef, useState } from "react";
import { heroSlides } from "../../data/heroData";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const Hero = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const imageRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const buttonRef = useRef();
  const containerRef = useRef();
  const startX = useRef(0);
  const isDragging = useRef(false);
  const nextImageRef = useRef();

  const slide = heroSlides[index];


  // 🔥 Animation on slide change
  useEffect(() => {
    const tl = gsap.timeline();

    const letters = titleRef.current.querySelectorAll("span");

    // Reset everything before animation
    gsap.set(nextImageRef.current, { opacity: 0 });
    gsap.set(imageRef.current, { opacity: 1 });
    gsap.set(imageRef.current, { clearProps: "all" });
    gsap.set(titleRef.current, { clearProps: "all" });
    gsap.set(subtitleRef.current, { clearProps: "all" });
    gsap.set(buttonRef.current, { clearProps: "all" });

    // IMAGE (common animation)
    tl.fromTo(
      imageRef.current,
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }
    );

    // 🔥 DIFFERENT TEXT ANIMATIONS
    if (slide.animation === "letters") {
      gsap.set(letters, { y: 100, opacity: 0 });

      tl.to(
        letters,
        {
          y: 0,
          opacity: 1,
          stagger: 0.03,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.6"
      );
    }

    if (slide.animation === "slide") {
      tl.fromTo(
        titleRef.current,
        { x: 150, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      );
    }

    if (slide.animation === "zoom") {
      tl.fromTo(
        titleRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8 },
        "-=0.6"
      );
    }

    // subtitle
    tl.fromTo(
      subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      "-=0.4"
    );

    // button
    tl.fromTo(
      buttonRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5 },
      "-=0.3"
    );
  }, [index]);


  // 🔁 Auto Slide
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (!isDragging.current) {
  //       setIndex((prev) => (prev + 1) % heroSlides.length);
  //     }
  //   }, 10000);

  //   return () => clearInterval(interval);
  // }, []);


  // Drag to change slide (desktop only)

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };
  const handleMouseUp = (e) => {
    if (!isDragging.current) return;

    const diff = e.clientX - startX.current;

    if (Math.abs(diff) > 80) {
      if (diff < 0) {
        // next
        setIndex((prev) => (prev + 1) % heroSlides.length);
      } else {
        // previous
        setIndex((prev) =>
          prev === 0 ? heroSlides.length - 1 : prev - 1
        );
      }
    }

    // reset opacity smoothly
    gsap.to(imageRef.current, { opacity: 1, duration: 0.3 });
    gsap.to(nextImageRef.current, { opacity: 0, duration: 0.3 });

    isDragging.current = false;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  }

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;

    const diff = e.clientX - startX.current;
    const width = window.innerWidth;

    // progress (0 → 1)
    const progress = Math.min(Math.abs(diff) / width, 1);

    if (diff < 0) {
      // 👉 dragging left (next slide)
      gsap.set(imageRef.current, { opacity: 1 - progress });
      gsap.set(nextImageRef.current, { opacity: progress });
    } else {
      // 👉 dragging right (previous slide)
      const prevIndex =
        index === 0 ? heroSlides.length - 1 : index - 1;

      nextImageRef.current.src = heroSlides[prevIndex].image;

      gsap.set(imageRef.current, { opacity: 1 - progress });
      gsap.set(nextImageRef.current, { opacity: progress });
    }
  };

  return (
    <div
      id="hero"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ touchAction: "pan-y" }}
      className="relative w-full h-[65vh] sm:h-[70vh] md:h-[71vh] lg:h-[75vh] overflow-hidden bg-black text-white select-none cursor-grab active:cursor-grabbing">

      {/* Background Image FIXED */}
      <div className="absolute inset-0 overflow-hidden">

        {/* Current Image */}
        <img
          ref={imageRef}
          src={slide.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
        />

        {/* Next Image */}
        <img
          ref={nextImageRef}
          src={heroSlides[(index + 1) % heroSlides.length].image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-0 will-change-transform"
        />

      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/15"></div>

      {/* 🔥 Dynamic Layout */}
      <div
        className={`relative z-10 h-full flex items-center px-6 md:px-20 font-bold font-[font2]
        ${slide.layout === "center"
            ? "justify-center text-center"
            : slide.layout === "right"
              ? "justify-end text-right pr-10 md:pr-24"
              : "justify-start text-left"
          }
          ${slide.vertical === 'top' ? 'items-start text-center pt-10' : slide.vertical === 'bottom' ? 'items-end pb-8' : 'items-center'}`}
      >
        <div className="max-w-6xl text-white">

          {/* 🔥 Dynamic Title */}
          <h1 ref={titleRef}
            className="text-5xl md:text-[5.2rem] font-light leading-[1.1] tracking-tight overflow-hidden text-shadow-black/30">
            {Array.isArray(slide.title) ? (
              slide.title.map((line, i) => (
                <span key={i}
                  className={`block ${i === 1 ? "ml-10 md:ml-20" : ""}`}>
                  {line}
                </span>
              ))
            ) : slide.animation === "letters" ? (slide.title.split("").map((char, i) => (
              <span key={i} className="inline-block opacity-0">
                {char === " " ? "\u00A0" : char}
              </span>
            ))
            ) : (slide.title)}
          </h1>


          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="mt-4 text-lg md:text-xl text-gray-100 font-medium font-[font2] text-shadow-black/50"
          >
            {slide.subtitle}
          </p>

          {/* Button */}
          <div className={` mb-2 flex gap-4 flex-wrap ${slide.layout === "center" ? "justify-center" : slide.layout === "right" ? "justify-end" : "justify-start"} `} >
            <button
              ref={buttonRef}
              onClick={() => navigate(slide.link)}
              className="hero-btn relative mt-6 px-8 py-2 bg-black text-white font-[font1] rounded overflow-hidden transition-all duration-300 hover:scale-105 uppercase cursor-pointer ">
              {slide.button}
            </button>
            {slide.button1 && (
              <button
                ref={buttonRef}
                className="hero-btn relative mt-6 px-8 py-2 bg-black text-white font-[font1] rounded overflow-hidden transition-all duration-300 hover:scale-105 uppercase ">
                {slide.button1}
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-1.5 h-1.5 rounded-full cursor-pointer ${i === index ? "bg-white" : "bg-gray-300"
              }`}
          ></div>
        ))}
      </div>
    </div >
  );
};

export default Hero;