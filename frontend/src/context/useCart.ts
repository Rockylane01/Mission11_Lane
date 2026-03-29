import { useContext } from 'react';

import { CartContext } from './cart-context';

/**
 * Hook to read/update the cart from any component under `<CartProvider>`.
 * Prefer this over importing `CartContext` directly in UI components.
 */
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
