import React, { createContext, useContext, useState } from 'react';

// Create a new context
const CartContext = createContext();

// Create a custom hook for using the cart context
export const useCart = () => {
  return useContext(CartContext);
};

// CartProvider component to wrap your app and provide cart functionality
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Change the variable name to 'cart'

  const addToCart = (item) => {
    setCart([...cart, item]); // Use 'cart' here
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId); // Use 'cart' here
    setCart(updatedCart); // Use 'cart' here
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}> {/* Update the context value to use 'cart' */}
      {children}
    </CartContext.Provider>
  );
};


 