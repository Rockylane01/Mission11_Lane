/**
 * One row in the shopping cart. Kept in `src/types` so both the React context
 * and any page/component can import the same shape without circular imports.
 */
export type CartItem = {
  bookID: number;
  title: string;
  price: number;
  quantity: number;
};
