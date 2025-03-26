// CartContext.tsx
import axios from "axios";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
  bookId: string;
  title: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (bookId: string) => void;
  checkout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// Add typing for `children` prop here
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.bookId === item.bookId);
      if (existingItem) {
        return prev.map((i) =>
          i.bookId === item.bookId ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (bookId: string) => {
    setCartItems((prev) => prev.filter((item) => item.bookId !== bookId));
  };

  const checkout = async () => {
    try {
      const response = await axios.post("/api/checkout", {}, { headers: { Authorization: "Bearer <YOUR_TOKEN>" } });
      alert(`Checkout successful! Total: ${response.data.orderTotal}`);
      setCartItems([]); // Clear the cart after checkout
    } catch (error) {
      alert("Error during checkout!");
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, checkout }}>
      {children}
    </CartContext.Provider>
  );
};
