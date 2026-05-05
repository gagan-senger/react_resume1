import { useParams } from "react-router-dom";
import perfumeData from "../../data/perfumeData";
import { useState } from "react";
import { useCart } from "../../context/CartContext";

export const ProductDetails = () => {
    const { id } = useParams();
    const product = perfumeData.find(p => p.id === Number(id));

    const { addToCart } = useCart();

    const [isZoomOpen, setIsZoomOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [openSection, setOpenSection] = useState("description");

    const [qty, setQty] = useState(1);
    const [selectedSize, setSelectedSize] = useState(product?.size || "100ml");
    const [activeImage, setActiveImage] = useState(
        product?.images?.[0] || product?.defimage
    );

    if (!product) return <p className="p-10">Product not found</p>;

    const handleAddToCart = () => {
        addToCart({
            ...product,
            qty,
            size: selectedSize
        });
    };

    return (
        <>
            <div className="max-w-7xl mx-auto px-8 py-12 flex gap-16">

                {/* ================= LEFT SIDE ================= */}
                <div className="flex gap-6">

                    {/* THUMBNAILS */}
                    <div className="flex flex-col gap-4">
                        {(product.images || [product.defimage]).map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                onClick={() => {
                                    setActiveImage(img);
                                    setCurrentIndex(index);
                                }}
                                className={`w-20 h-24 object-cover cursor-pointer border p-1 bg-white
                                ${activeImage === img ? "border-black" : "border-gray-300"}`}
                            />
                        ))}
                    </div>

                    {/* MAIN IMAGE */}
                    <div className="bg-white p-6">
                        <img
                            src={activeImage}
                            onClick={() => setIsZoomOpen(true)}
                            className="w-[380px] h-[480px] object-contain cursor-zoom-in"
                        />
                    </div>
                </div>

                {/* ================= RIGHT SIDE ================= */}
                <div className="flex-1 max-w-xl">

                    {/* Breadcrumb */}
                    <p className="text-sm text-gray-400 mb-2">
                        Home / Collections / Best Sellers Men
                    </p>

                    {/* Title */}
                    <h1 className="text-2xl font-semibold mb-4 uppercase">
                        {product.pname}
                    </h1>

                    {/* Price */}
                    <div className="flex items-center gap-3 mb-2">
                        <span className="line-through text-gray-400 text-sm">
                            {product.original_price}
                        </span>
                        <span className="text-lg font-semibold">
                            {product.price}
                        </span>
                        <span className="text-blue-500 text-sm">
                            Save 30%
                        </span>
                    </div>

                    <p className="text-xs text-gray-500 mb-4">
                        Tax included. Shipping calculated at checkout.
                    </p>

                    {/* Rating */}
                    <div className="text-yellow-400 mb-4 text-sm">
                        ★★★★☆
                    </div>

                    {/* SIZE */}
                    <div className="mb-6">
                        <p className="text-xs tracking-widest mb-2">SIZE</p>
                        <button className="px-5 py-2 border border-black text-sm">
                            {product.size}
                        </button>
                    </div>

                    {/* ADD TO CART */}
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-black text-white py-3 text-sm tracking-widest mb-6"
                    >
                        ADD TO CART
                    </button>

                    {/* DELIVERY */}
                    <div className="mb-6">
                        <p className="text-sm mb-2 font-medium">DELIVERY ESTIMATE</p>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Enter delivery pincode"
                                className="flex-1 border px-4 py-2 text-sm outline-none"
                            />
                            <button className="bg-gray-800 text-white px-4 text-sm">
                                CHECK
                            </button>
                        </div>
                    </div>

                    {/* INFO */}
                    <div className="space-y-2 text-sm text-gray-700 mb-6">
                        <p>✔ 100% Authentic Products</p>
                        <p>✔ Trusted by 80000+ customers</p>
                    </div>

                    {/* PERFECT FOR */}
                    <div className="mb-6 p-4 bg-pink-50 text-sm rounded">
                        ❤️ Perfect For: Casual
                    </div>

                    {/* SNAPSHOT */}
                    <div className="p-5">
                        <h3 className="font-semibold mb-2 text-sm">
                            ✨ FRAGRANCE SNAPSHOT
                        </h3>

                        <p className="text-gray-700 my-2">
                            Best suited for those who enjoy fresh, clean everyday scents.
                        </p>

                        <p className="text-gray-900 py-2">
                            Fragrance Family: <span className="text-gray-600">Aquatic</span>
                        </p>

                        <div className="grid grid-cols-2 gap-y-4 text-sm">
                            <div>
                                <p className="text-gray-900">Smells Like</p>
                                <p className="text-gray-600">Fresh</p>
                            </div>

                            <div>
                                <p className="text-gray-900">Best For</p>
                                <p className="text-gray-600">Daily</p>
                            </div>

                            <div>
                                <p className="text-gray-900">When to Wear</p>
                                <p className="text-gray-600">Day</p>
                            </div>

                            <div>
                                <p className="text-gray-900">Season</p>
                                <p className="text-gray-600">Summer</p>
                            </div>
                        </div>
                    </div>

                    {/* ================= ACCORDION ================= */}
                    <div className="mt-8 border-t">

                        {/* DESCRIPTION */}
                        <div className="border-b">
                            <button
                                onClick={() =>
                                    setOpenSection(openSection === "description" ? "" : "description")
                                }
                                className="w-full flex justify-between items-center text-center py-4 text-sm font-[font2] tracking-widest hover:text-black text-gray-900"
                            >
                                DESCRIPTION
                                <span>{openSection === "description" ? "⌃" : "⌄"}</span>
                            </button>

                            {openSection === "description" && (
                                <div className="pb-6 text-sm font-[font2] text-gray-700 space-y-4">

                                    <p>
                                        Davidoff Cool Water Eau De Toilette For men. Experience the refreshing and invigorating scent of Davidoff Cool Water Eau De Toilette for Men. This iconic fragrance features a unique blend of marine and aromatic notes, evoking a feeling of energy and vitality. Perfect for any occasion, this eau de toilette exudes confidence and sophistication.
                                    </p>

                                    <p>
                                        Top Notes - Sea water, Lavender, Mint
                                    </p>

                                    <p>
                                        Middle Notes - Sandalwood, Neroli, Jasmine
                                    </p>

                                    <p>
                                        Base Notes - Musk, Amber, Cedar
                                    </p>

                                    <p>Country of Origin - France</p>
                                </div>
                            )}
                        </div>

                        {/* AUTH */}
                        <div className="border-b">
                            <button
                                onClick={() =>
                                    setOpenSection(openSection === "auth" ? "" : "auth")
                                }
                                className="w-full flex justify-between items-center py-4 text-sm tracking-widest"
                            >
                                AUTHENTICITY & QUALITY
                                <span>{openSection === "auth" ? "⌃" : "⌄"}</span>
                            </button>

                            {openSection === "auth" && (
                                <div className="pb-6 text-sm text-gray-700 space-y-3">
                                    <p>100% genuine product</p>
                                    <p>No replicas or clones</p>
                                    <p>Factory sealed & authentic</p>
                                </div>
                            )}
                        </div>

                    </div>

                </div>
            </div>

            {/* ================= ZOOM MODAL ================= */}
            {isZoomOpen && (
                <div className="fixed inset-0 bg-[#f4f4f4] z-50 flex items-center justify-center">

                    <img
                        src={product.images[currentIndex]}
                        className="max-h-full object-contain drop-shadow-xl"
                    />

                    {/* CONTROLS */}
                    <div className="absolute bottom-10 flex gap-6">

                        <button
                            onClick={() =>
                                setCurrentIndex(prev =>
                                    prev === 0 ? product.images.length - 1 : prev - 1
                                )
                            }
                            className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center text-xl"
                        >
                            ‹
                        </button>

                        <button
                            onClick={() => setIsZoomOpen(false)}
                            className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center"
                        >
                            ✕
                        </button>

                        <button
                            onClick={() =>
                                setCurrentIndex(prev =>
                                    prev === product.images.length - 1 ? 0 : prev + 1
                                )
                            }
                            className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center text-xl"
                        >
                            ›
                        </button>

                    </div>

                </div>
            )}
            {/* ================= EXTRA SECTIONS ================= */}
            <div className="bg-[#f5f5f5] py-20 px-50 my-25">

                {/* ===== SECTION 1 ===== */}
                <div className="max-w-6xl mx-auto flex items-center justify-between mb-50">

                    {/* IMAGES */}
                    <div className="relative w-[500px] h-[420px] ">
                        <img
                            src="/images/perfume/wear.webp"
                            className="absolute left-0 top-28 w-[300px] h-[300px] object-cover shadow-lg z-10"
                        />
                        <img
                            src="/images/perfume/wear1.jpg"
                            className="absolute left-60 top-0 w-[360px] h-[420px] object-cover shadow-lg"
                        />
                    </div>

                    {/* TEXT */}
                    <div className="max-w-md text-center">
                        <h2 className="text-3xl font-[font2] font-light mb-4 tracking-wide">
                            BEST WAY TO WEAR A PERFUME?
                        </h2>

                        <p className="text-sm font-[font2] font-medium  text-gray-800 mb-6">
                            Never apply your perfume directly on clothes as it might leave a stain.
                            Instead wrap your pulse points with it.
                        </p>

                        <p className="text-sm font-[font2] font-medium  text-gray-800">
                            Be it your neck, shoulder, wrist & inner elbow, mid riff, Perfume tends to radiate more if you apply at these warm places.  In addition, women can also apply the perfume just below your mid riff, behind the knee, calves & ankles.
                        </p>
                    </div>
                </div>

                {/* ===== SECTION 2 ===== */}
                <div className="max-w-6xl mx-auto flex items-center justify-between ">

                    {/* TEXT */}
                    <div className="max-w-md font-[font2]">
                        <h2 className="text-3xl font-light mb-4 tracking-wide">
                            FREE GIFT WRAP
                        </h2>

                        <p className="text-sm font-medium text-gray-800 mb-4">
                            Is it a gift? No problem!
                        </p>

                        <p className="text-sm font-medium text-gray-800 mb-4">
                            If you need your perfume to be gift-wrapped, just leave us a note in your order & your smile is on us.
                        </p>

                        <p className="text-sm font-medium text-gray-800">
                            Add some text and we will send it across with your perfume. Now gifting a friend or family is just a click away.
                        </p>
                    </div>

                    {/* IMAGES */}
                    <div className="relative w-[500px] h-[400px]">
                        <img
                            src="/images/perfume/gift.webp"
                            className="absolute right-75 top-20 w-[300px] h-[310px] object-cover shadow-lg z-10"
                        />
                        <img
                            src="/images/perfume/gift1.webp"
                            className="absolute right-0 top-0 w-[350px] h-[350px] object-cover shadow-lg"
                        />
                    </div>
                </div>

            </div>
        </>
    );
};