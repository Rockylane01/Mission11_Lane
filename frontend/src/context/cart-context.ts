import { createContext } from 'react';

import type { CartItem } from '../types/cart';

/**
 * Describes everything the cart exposes through React context.
 * The actual state lives in `CartProvider`; this object is only the "contract".
 */
export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
}

/**
 * React context object. `undefined` before a provider wraps the tree — `useCart`
 * checks for that and throws a helpful error if hooks run outside `CartProvider`.
 */
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
