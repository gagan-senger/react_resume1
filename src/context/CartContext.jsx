import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // 🔥 ADD TO CART
    const addToCart = (product) => {
        setCart((prev) => {
            const exists = prev.find(item => item.id === product.id);

            if (exists) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, qty: item.qty + product.qty }
                        : item
                );
            }

            return [...prev, product    ];
        });

        setIsCartOpen(true); // open sidebar
    };

    // ➕ increase
    const increaseQty = (id) => {
        setCart(prev =>
            prev.map(item =>
                item.id === id ? { ...item, qty: item.qty + 1 } : item
            )
        );
    };

    // ➖ decrease
    const decreaseQty = (id) => {
        setCart(prev =>
            prev
                .map(item =>
                    item.id === id
                        ? { ...item, qty: item.qty - 1 }
                        : item
                )
                .filter(item => item.qty > 0)
        );
    };

    // 💰 total
    const getTotal = () => {
        return cart.reduce((total, item) => {
            const price = Number(item.price.replace(/[₹,]/g, ""));
            return total + price * item.qty;
        }, 0);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                increaseQty,
                decreaseQty,
                getTotal,
                isCartOpen,
                setIsCartOpen
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);