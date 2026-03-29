import { useEffect, useState, type ReactNode } from 'react';

import type { CartItem } from '../types/cart';

import { CartContext } from './cart-context';

const STORAGE_KEY = 'mission11_lane_cart';

function loadCartFromSession(): CartItem[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed as CartItem[];
  } catch {
    return [];
  }
}

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() =>
    loadCartFromSession()
  );

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((i) => i.bookID === item.bookID);
      if (existingItem) {
        return prevCartItems.map((i) =>
          i.bookID === item.bookID
            ? { ...i, quantity: (i.quantity || 0) + (item.quantity || 1) }
            : i
        );
      }
      return [...prevCartItems, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const removeFromCart = (item: CartItem) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((i) => i.bookID !== item.bookID)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
