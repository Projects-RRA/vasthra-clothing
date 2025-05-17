"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { fetchCartItems } from "@/app/utils/cartUtils";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const loadCart = async () => {
    const items = await fetchCartItems();
    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
    setCartItems(items);
    setCartCount(totalCount);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ cartCount, setCartCount, cartItems, setCartItems, loadCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
