/** One row returned by `GET /api/books`. */
export type Book = {
  bookID: number;
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  classification: string;
  category: string;
  pageCount: number;
  price: number;
};

/** Paged API envelope: items plus paging metadata for the book list UI. */
export type PagedBooksResponse = {
  items: Book[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};
