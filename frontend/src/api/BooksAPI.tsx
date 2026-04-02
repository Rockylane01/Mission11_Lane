import type { Book, PagedBooksResponse } from '../types/book';

const API_BASE_URL = 'https://localhost:7211';

/**
 * GET /api/books with paging, optional sort, and category filters.
 * Response shape matches the ASP.NET controller (items + paging fields).
 */
export async function fetchBooks(
  page: number,
  pageSize: number,
  selectedCategories: string[],
  sortParam: string
): Promise<PagedBooksResponse> {
  const url = new URL('/api/books', API_BASE_URL);
  url.searchParams.set('page', String(page));
  url.searchParams.set('pageSize', String(pageSize));

  selectedCategories.forEach((c) => url.searchParams.append('categories', c));

  if (sortParam) {
    url.searchParams.set('sort', sortParam);
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  return (await response.json()) as PagedBooksResponse;
};

export async function addBook(book: Book): Promise<Book> {
  const response = await fetch(`${API_BASE_URL}/api/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  return (await response.json()) as Book;
};

export async function updateBook(bookID: number, book: Book): Promise<Book> {
  const response = await fetch(`${API_BASE_URL}/api/books/${bookID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  return (await response.json()) as Book;
};

export async function deleteBook(bookID: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/books/${bookID}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }
};
