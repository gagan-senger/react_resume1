import { useEffect, useState } from "react";
import { RiShoppingCartFill } from "react-icons/ri";
import { NavLink, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useSearch } from "../../context/SearchContext";
import { FiSearch } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

export const Header = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const { search, setSearch } = useSearch();
    const { setIsCartOpen } = useCart();

    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === "/";

    const textColor =
        isHome && !isScrolled ? "text-white" : "text-black";

    const logoSrc =
        isHome && !isScrolled ? "/images/logo.png" : "/images/logo2.png";

    useEffect(() => {
        if (!isHome) return;

        const handleScroll = () => {
            const hero = document.getElementById("hero");
            if (!hero) return;
            setIsScrolled(window.scrollY > hero.offsetHeight - 100);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [isHome]);

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full pt-2 md:pt-3 z-50 transition-all duration-300 
                ${isHome
                        ? isScrolled
                            ? "bg-white border-b border-gray-300"
                            : "bg-transparent"
                        : "bg-white border-b border-gray-300"
                    }`}
            >
                <div className="px-4 md:px-6">
                    <nav className="flex items-center justify-between h-20 md:h-24 max-w-7xl mx-auto">

                        {/* LEFT */}
                        <div className="flex items-center gap-4">
                            <HiOutlineMenuAlt3
                                size={26}
                                className={`md:hidden cursor-pointer ${textColor}`}
                                onClick={() => setMenuOpen(true)}
                            />

                            <FiSearch
                                size={22}
                                className={`cursor-pointer ${textColor}`}
                                onClick={() => setShowSearch((prev) => !prev)}
                            />
                        </div>

                        {/* CENTER NAV (DESKTOP ONLY) */}
                        <ul className="hidden md:flex items-center gap-16">
                            <li><NavLink className={`${textColor} text-[1.1rem] md:text-[1.3rem] lg:text-[1.5rem] font-[font] `} to="/">Home</NavLink></li>
                            <li><NavLink className={`${textColor} text-[1.1rem] md:text-[1.3rem] lg:text-[1.5rem] font-[font] `} to="/menproducts">Men</NavLink></li>

                            {/* LOGO */}
                            <li>
                                <NavLink to="/">
                                    <img
                                        src={logoSrc}
                                        alt="logo"
                                        className="h-15 object-contain"
                                    />
                                </NavLink>
                            </li>

                            <li><NavLink className={`${textColor} text-[1.1rem] md:text-[1.3rem] lg:text-[1.5rem] font-[font] font-medium`} to="/womenproducts">Women</NavLink></li>
                            <li><NavLink className={`${textColor} text-[1.1rem] md:text-[1.3rem] lg:text-[1.5rem] font-[font] font-medium`} to="/products">All Perfumes</NavLink></li>
                        </ul>

                        {/* MOBILE LOGO */}
                        <div className="md:hidden">
                            <NavLink to="/">
                                <img src={logoSrc} alt="logo" className="h-10" />
                            </NavLink>
                        </div>

                        {/* RIGHT */}
                        <div
                            onClick={() => setIsCartOpen(true)}
                            className={`cursor-pointer ${textColor}`}
                        >
                            <RiShoppingCartFill size={22} />
                        </div>

                    </nav>
                </div>

                {/* SEARCH BAR */}
                {showSearch && (
                    <div className="absolute top-full left-0 w-full bg-white shadow-md p-4">
                        <div className="flex items-center gap-4">
                            <input
                                type="text"
                                placeholder="Search perfumes..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="flex-1 border px-3 py-2 rounded-md outline-none"
                            />
                            <AiOutlineClose
                                size={20}
                                className="cursor-pointer"
                                onClick={() => {
                                    setSearch("");
                                    setShowSearch(false);
                                }}
                            />
                        </div>
                    </div>
                )}
            </header>

            {/* MOBILE MENU */}
            <div
                onClick={() => setMenuOpen(false)}
                className={`fixed top-0 left-0 h-full w-full z-50 bg-black/40 transition ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
            >

                <div
                    onClick={(e) => e.stopPropagation()}
                    className={`h-full w-[85%] max-w-[320px] bg-white p-5 overflow-y-auto transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
                >

                    {/* CLOSE */}
                    <div className="flex items-center justify-between mb-6">

                        {/* LEFT (optional space or logo later) */}
                        <div />

                        {/* RIGHT SIDE */}
                        <div className="flex items-center gap-4">

                            {/* CART ICON */}
                            <div
                                onClick={() => {
                                    setIsCartOpen(true);
                                    setMenuOpen(false); // close menu after click
                                }}
                                className="cursor-pointer"
                            >
                                <RiShoppingCartFill size={22} />
                            </div>

                            {/* CLOSE BUTTON */}
                            <AiOutlineClose
                                size={22}
                                className="cursor-pointer shrink-0"
                                onClick={() => setMenuOpen(false)}
                            />
                        </div>
                    </div>

                    {/* MENU ITEMS */}
                    <ul className="flex flex-col gap-6 text-lg">
                        <li><NavLink to="/" onClick={() => setMenuOpen(false)}>HOME</NavLink></li>
                        <li><NavLink to="/menproducts" onClick={() => setMenuOpen(false)}>MEN</NavLink></li>
                        <li><NavLink to="/womenproducts" onClick={() => setMenuOpen(false)}>WOMEN</NavLink></li>
                        <li><NavLink to="/products" onClick={() => setMenuOpen(false)}>BRANDS</NavLink></li>
                    </ul>
                </div>
            </div>
        </>
    );
};
