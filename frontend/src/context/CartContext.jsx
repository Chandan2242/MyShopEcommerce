import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ========================
  // Add To Cart
  // ========================
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item._id === product._id
      );

      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // ========================
  // Increase Quantity
  // ========================

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // ========================
  // Decrease Quantity
  // ========================

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity:
                item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }
          : item
      )
    );
  };

  // ========================
  // Remove Item
  // ========================

  const removeItem = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item._id !== id)
    );
  };

  // ========================
  // Clear Cart
  // ========================

  const clearCart = () => {
    setCartItems([]);
  };

  // ========================
  // Total Quantity
  // ========================

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // ========================
  // Total Price
  // ========================

  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.product_price) * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 99 : 0;

  const gst = subtotal * 0.18;

  const total = subtotal + shipping + gst;

  return (
    <CartContext.Provider
      value={{
        cartItems,

        addToCart,

        increaseQty,

        decreaseQty,

        removeItem,

        clearCart,

        subtotal,

        shipping,

        gst,

        total,

        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}