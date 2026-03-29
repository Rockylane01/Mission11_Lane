/** One line in the shopping cart (shared by context, pages, and components). */
export type CartItem = {
  bookID: number;
  title: string;
  price: number;
  quantity: number;
};
