import { RiCloseLine } from "react-icons/ri";
import { useCart } from "../../context/CartContext";
import { useEffect } from "react";


export const CartSidebar = () => {
    const {
        cart,
        increaseQty,
        decreaseQty,
        getTotal,
        isCartOpen,
        setIsCartOpen
    } = useCart();

    useEffect(() => {
        document.body.style.overflow = isCartOpen ? "hidden" : "auto";
    }, [isCartOpen]);

    return (
        <>
            {/* {OVERLAY } */}
            {isCartOpen && (
                <div onClick={() => setIsCartOpen(false)}
                    className="fixed inset-0 bg-black/30  z-40 " />
            )}
            {/* SIDEBAR */}

            <div onClick={(e) => e.stopPropagation()}
                className={`fixed top-0 py-5 z-50 right-0 h-full w-[420px] bg-white shadow-lg transition-transform duration-300 ease-in-out
        ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>

                {/* HEADER */}
                <div className="flex justify-between items-center px-6 py-5 border-b border-gray-300">
                    <h2 className="text-2xl tracking-wide font-normal font-[font2] ">CART</h2>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className=" opacity-70 hover:opacity-100 cursor-pointer ">
                        < RiCloseLine size={36} /></button>
                </div>

                {/* CONTENT */}
                <div className="px-6 py-4 overflow-y-auto h-[calc(100%-180px)] ">

                    {cart.length === 0 ? (
                        <p className="text-center mt-6 text-gray-500 text-sm ">
                            Wow... such emptiness 🥲
                        </p>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="flex gap-4 py-6 border-b ">

                                <img src={item.defimage} className="w-16 h-20 object-cover" />

                                <div className="flex-1">
                                    <h3 className="text-sm leading-tight ">{item.pname}</h3>
                                    <p className="text-xs text-gray-500">Size:{item.size}</p>

                                    {/* QUANTITY */}
                                    <div className="flex items-center gap-3 mt-3">
                                        <button onClick={() => decreaseQty(item.id)}
                                            className="px-2 border text-sm">-</button>
                                        <span className="text-sm">{item.qty}</span>
                                        <button onClick={() => increaseQty(item.id)}
                                            className="px-2 border text-sm">+</button>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="text-right text-sm font-medium">
                                    ₹{Number(item.price.replace(/[₹,]/g, "")) * item.qty}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* FOOTER */}
                {cart.length > 0 && (
                    <div className="absolute bottom-0 w-full px-6 py-5 border-t bg-white">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="tracking-widest text-gray-600 ">Subtotal</span>
                            <span className="font-medium">₹{getTotal()}</span>
                        </div>

                        {/* <p className="text-sm text-gray-500 mb-4">Shipping, taxes, and discount codes calculated at checkout.</p> */}

                        {/* CHECKOUT BUTTON */}
                        <button className="w-full bg-black text-white py-3 text-sm tracking-widest hover:opacity-90 transition  ">
                            CHECKOUT
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};