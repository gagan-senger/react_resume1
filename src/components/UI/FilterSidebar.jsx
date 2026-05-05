import { useState } from "react";
import { Range, getTrackBackground } from "react-range";

export const FilterSidebar = ({
    filters,
    setFilters,
    brands,
    types,
    showGender = true
}) => {

    const [openSections, setOpenSections] = useState({
        gender: true,
        brand: true,
        product: false,
        size: false,
        price: false,
    });

    const MIN = 0;
    const MAX = 4000;

    const toggleSection = (key) => {
        setOpenSections((prev) => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const FilterSection = ({ title, sectionKey, children }) => (
        <div className="border-b py-4">
            <div
                onClick={() => toggleSection(sectionKey)}
                className="flex justify-between items-center cursor-pointer"
            >
                <h3 className="uppercase tracking-widest text-gray-500 text-sm">
                    {title}
                </h3>

                <span
                    className={`transition-transform duration-300 ${openSections[sectionKey] ? "rotate-180" : ""}`}
                >
                    ▼
                </span>
            </div>

            {openSections[sectionKey] && (
                <div className="mt-3 space-y-2 text-sm">{children}</div>
            )}
        </div>
    );

    return (
        <div className="
            w-full md:w-64
            text-sm
            md:sticky md:top-32
            md:h-[calc(100vh-7rem)]
            overflow-y-auto
            bg-white
        ">

            {showGender && (
                <FilterSection title="Gender" sectionKey="gender">
                    {["Men", "Women", "Unisex"].map((g) => (
                        <label key={g} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                className="accent-black"
                                checked={filters.gender?.includes(g)}
                                onChange={(e) => {
                                    const checked = e.target.checked;
                                    setFilters((prev) => ({
                                        ...prev,
                                        gender: checked
                                            ? [...prev.gender, g]
                                            : prev.gender.filter((x) => x !== g)
                                    }));
                                }}
                            />
                            {g}
                        </label>
                    ))}
                </FilterSection>
            )}

            <FilterSection title="Brand" sectionKey="brand">
                {brands.map((b) => (
                    <label key={b} className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            className="accent-black"
                            checked={filters.brand.includes(b)}
                            onChange={(e) => {
                                const checked = e.target.checked;
                                setFilters((prev) => ({
                                    ...prev,
                                    brand: checked
                                        ? [...prev.brand, b]
                                        : prev.brand.filter((x) => x !== b)
                                }));
                            }}
                        />
                        {b}
                    </label>
                ))}
            </FilterSection>

            <FilterSection title="Product Type" sectionKey="product">
                {types.map((t) => (
                    <label key={t} className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            className="accent-black"
                            checked={filters.type.includes(t)}
                            onChange={(e) => {
                                const checked = e.target.checked;
                                setFilters((prev) => ({
                                    ...prev,
                                    type: checked
                                        ? [...prev.type, t]
                                        : prev.type.filter((x) => x !== t)
                                }));
                            }}
                        />
                        {t}
                    </label>
                ))}
            </FilterSection>

            <FilterSection title="Size" sectionKey="size">
                {["30ml", "50ml", "100ml"].map((s) => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            className="accent-black"
                            checked={filters.size.includes(s)}
                            onChange={(e) => {
                                const checked = e.target.checked;
                                setFilters((prev) => ({
                                    ...prev,
                                    size: checked
                                        ? [...prev.size, s]
                                        : prev.size.filter((x) => x !== s)
                                }));
                            }}
                        />
                        {s}
                    </label>
                ))}
            </FilterSection>

            <FilterSection title="Price" sectionKey="price">
                <div className="flex flex-col gap-4 px-4">

                    <div className="flex justify-between text-sm">
                        <span>Rs. {filters.price.min}</span>
                        <span>Rs. {filters.price.max}</span>
                    </div>

                    <Range
                        step={100}
                        min={MIN}
                        max={MAX}
                        values={[filters.price.min, filters.price.max]}
                        onChange={(values) => {
                            const [min, max] = values;
                            setFilters((prev) => ({
                                ...prev,
                                price: { min, max },
                            }));
                        }}
                        renderTrack={({ props, children }) => (
                            <div
                                {...props}
                                className="h-1 w-full rounded"
                                style={{
                                    ...props.style,
                                    background: getTrackBackground({
                                        values: [filters.price.min, filters.price.max],
                                        colors: ["#ccc", "#000", "#ccc"],
                                        min: MIN,
                                        max: MAX,
                                    }),
                                }}
                            >
                                {children}
                            </div>
                        )}
                        renderThumb={({ props }) => (
                            <div {...props} className="h-4 w-4 bg-black rounded-full shadow-md" />
                        )}
                    />
                </div>
            </FilterSection>
        </div>
    );
};