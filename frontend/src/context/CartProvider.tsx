import { useEffect, useState, type ReactNode } from 'react';

import type { CartItem } from '../types/cart';

import { CartContext } from './cart-context';

/** Key used in sessionStorage so the cart survives refresh (until the tab closes). */
const STORAGE_KEY = 'mission11_lane_cart';

/**
 * Reads the saved cart JSON from the browser tab session.
 * If anything is missing or invalid, we start with an empty cart.
 */
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

/**
 * Wraps the app (or a section) and holds cart state in React state.
 * Also mirrors that state to sessionStorage so a page refresh keeps the cart.
 */
export default function CartProvider({ children }: { children: ReactNode }) {
  // Lazy init: load once on first mount so we do not read storage on every render.
  const [cartItems, setCartItems] = useState<CartItem[]>(() =>
    loadCartFromSession()
  );

  // Whenever the cart changes, persist it for this browser tab/session.
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((i) => i.bookID === item.bookID);

      // Same book again → bump quantity instead of duplicating rows.
      if (existingItem) {
        return prevCartItems.map((i) =>
          i.bookID === item.bookID
            ? { ...i, quantity: (i.quantity || 0) + (item.quantity || 1) }
            : i
        );
      }

      // New book → append as a new line (default quantity 1 if missing).
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
