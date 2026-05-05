import { useParams } from "react-router-dom";
import perfumeData from "../../data/perfumeData";
import { getType, formatTypeFromURL } from "../../data/transformData";
import { ProductCard } from "./ProductCard";

export const CategoryPage = () => {
    const { type } = useParams();

    // URL → Normal text (eau-de-parfum → Eau De Parfum)
    const formattedType = formatTypeFromURL(type);

    // Filter products
    const filteredProducts = perfumeData.filter(
        product => getType(product.pname) === formattedType
    );

    return (
        <div className="max-w-7xl mx-auto px-10 py-12">

            {/* 🔥 HEADING */}
            <h2 className="text-2xl font-semibold mb-8 uppercase">
                {formattedType}
            </h2>

            {/* ❌ No products */}
            {filteredProducts.length === 0 ? (
                <p className="text-gray-500">No products found.</p>
            ) : (

                /* ✅ PRODUCTS GRID */
                <div className="grid grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} perfume={product} />
                    ))}
                </div>

            )}
        </div>
    );
};