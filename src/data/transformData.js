export const getBrand = (name) => {
    const n = name.toLowerCase();

    if (n.includes("bellavita")) return "Bellavita";
    if (n.includes("calvin klein") || n.startsWith("ck ")) return "Calvin Klein";
    if (n.includes("tom ford")) return "Tom Ford";
    if (n.includes("police")) return "Police";
    if (n.includes("ferrari")) return "Ferrari";
    if (n.includes("bentley")) return "Bentley";
    if (n.includes("lattafa")) return "Lattafa";
    if (n.includes("guerlain")) return "Guerlain";
    if (n.includes("versace")) return "Versace";
    if (n.includes("hermes")) return "Hermes";

    if (n.includes("guy laroche") || n.includes("drakkar"))
        return "Guy Laroche";

    if (n.includes("armaf")) return "Armaf";
    if (n.includes("paco rabanne") || n.includes("paco")) return "Paco Rabanne";
    if (n.includes("victoria")) return "Victoria's Secret";
    if (n.includes("estee lauder") || n.includes("estee")) return "Estee Lauder";
    if (n.includes("narciso")) return "Narciso Rodriguez";
    if (n.includes("armaf club")) return "Armaf";
    if (n.includes("skai")) return "Skai";
    if (n.includes("skai aquatic")) return "Skai";
    if (n.includes("jennifer lopez") || n.includes("jennifer")) return "Jennifer Lopez";

    return "Other";
};

export const getType = (name) => {
    const n = name.toLowerCase();

    if (n.includes("eau de parfum") || n.includes("edp")) return "Eau De Parfum";
    if (n.includes("eau de toilette") || n.includes("edt")) return "Eau De Toilette";
    if (n.includes("parfum")) return "Parfum";

    return "Other";
};

export const formatTypeForURL = (type) => {
    return type.toLowerCase().replace(/\s+/g, "-");
};


export const formatTypeFromURL = (type) => {
    return type
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

export const transformData = (data) => {
    return data.map((p) => {
        return {
            ...p,
            brand: getBrand(p.pname),
            type: getType(p.pname), // ✅ ADD THIS
            gender: p.gender || "Unisex",

            priceNum: Math.round(Number(p.price.replace(/[^0-9.]/g, ""))) || 0,
            originalPriceNum:
                Math.round(Number(p.original_price.replace(/[^0-9.]/g, ""))) || 0,

            reviewsNum:
                typeof p.reviews === "string"
                    ? parseInt(p.reviews.replace(/[^0-9]/g, "")) || 0
                    : p.reviews || 0
        };
    });
};