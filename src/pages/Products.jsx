import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import perfumeData from "../data/perfumeData";
import { ProductCard } from "../components/UI/ProductCard";
import { transformData } from "../data/transformData";
import { FilterSidebar } from "../components/UI/FilterSidebar";
import { useSearch } from "../context/SearchContext";

export const Products = () => {
  const { search } = useSearch();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);
  const isHome = location.pathname === "/";
  const allProducts = transformData(perfumeData);

  const [filters, setFilters] = useState({
    brand: [],
    gender: [],
    type: [],
    size: [],
    price: { min: 0, max: 4000 },
  });

  const [sort, setSort] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  let filtered = allProducts.filter((p) => {
    return (
      (filters.brand.length === 0 || filters.brand.includes(p.brand)) &&
      (filters.gender.length === 0 || filters.gender.includes(p.gender)) &&
      (filters.type.length === 0 || filters.type.includes(p.type)) &&
      (search.trim() === "" ||
        p.pname.toLowerCase().includes(search.toLowerCase())) &&
      p.priceNum >= filters.price.min &&
      p.priceNum <= filters.price.max
    );
  });

  if (sort === "low") filtered.sort((a, b) => a.priceNum - b.priceNum);
  if (sort === "high") filtered.sort((a, b) => b.priceNum - a.priceNum);

  const brands = [...new Set(allProducts.map((p) => p.brand))];
  const types = [...new Set(allProducts.map((p) => p.type))];

  return (
    <section className="w-full px-4 md:px-16 mt-20 mb-20 md:mb-24 lg:mb-28">

      {/* HEADER (UNCHANGED DESIGN) */}
      <div className="mb-16 text-center font-[font2]">
        <div className="text-sm text-gray-500 mb-2">
          <Link to="/" className="hover:underline">Home</Link>

          {pathnames.map((name, index) => {
            const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
            const isLast = index === pathnames.length - 1;

            return (
              <span key={name}>
                {" / "}
                {isLast ? (
                  <span className="text-gray-800 capitalize">{name}</span>
                ) : (
                  <Link to={routeTo} className="hover:underline capitalize">
                    {name}
                  </Link>
                )}
              </span>
            );
          })}
        </div>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-[font2]">
          All Perfumes
        </h1>
      </div>

      {/* MOBILE TOP BAR */}
      <div className="md:hidden flex justify-between items-center mb-4">
        <button
          onClick={() => setShowFilters(true)}
          className="border px-4 py-2 text-sm"
        >
          Filters
        </button>

        <select
          className="border px-3 py-2 text-sm"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="featured">Featured</option>
          <option value="low">Price low</option>
          <option value="high">Price high</option>
        </select>
      </div>

      {/* MAIN LAYOUT */}
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-6 md:gap-16">

        {/* DESKTOP SIDEBAR */}
        <div className="hidden md:block">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            brands={brands}
            types={types}
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1">

          {/* DESKTOP TOP BAR */}
          <div className="hidden md:flex justify-between items-center mb-8">
            <p className="text-sm text-gray-500">
              {filtered.length} products
            </p>

            <select
              className="border px-4 py-2 text-sm"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="low">Price, low to high</option>
              <option value="high">Price, high to low</option>
            </select>
          </div>

          {/* GRID */}
          <div className="
            grid
            grid-cols-2
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-4 md:gap-6 lg:gap-10
            my-6 md:my-10
          ">
            {filtered.map((item) => (
              <ProductCard key={item.id} perfume={item} />
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      <div className={`fixed top-0 left-0 w-full h-full bg-black/40 z-50 transition ${showFilters ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        <div className={`w-[80%] max-w-sm h-full bg-white p-5 overflow-y-auto transition-transform duration-300 ${showFilters ? "translate-x-0" : "-translate-x-full"}`}>

          <div className="flex justify-end mb-4">
            <button onClick={() => setShowFilters(false)}>✕</button>
          </div>

          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            brands={brands}
            types={types}
          />
        </div>
      </div>

    </section >
  );
};