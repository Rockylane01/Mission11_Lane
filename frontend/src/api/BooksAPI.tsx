import type { PagedBooksResponse } from '../types/book';

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
}
