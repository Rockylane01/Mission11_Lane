import { useEffect, useMemo, useState } from 'react';

import { useCart } from '../context/useCart';

type Book = {
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

type PagedBooksResponse = {
  items: Book[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

const API_BASE_URL = 'https://localhost:7211';

function getPageNumbers(currentPage: number, totalPages: number) {
  const windowSize = 5;
  const start = Math.max(1, currentPage - windowSize);
  const end = Math.min(totalPages, currentPage + windowSize);

  const pages: number[] = [];
  for (let p = start; p <= end; p++) {
    pages.push(p);
  }

  return pages;
}

export default function BookList({selectedCategories}: {selectedCategories: string[]}) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortByTitle, setSortByTitle] = useState(false);

  const [data, setData] = useState<PagedBooksResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { addToCart } = useCart();

  const sortParam = useMemo(() => (sortByTitle ? 'title' : ''), [sortByTitle]);

  useEffect(() => {
    setPage(1);
  }, [selectedCategories]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      // Build the URL with the parameters that are needed
      try {
        const url = new URL('/api/books', API_BASE_URL);
        url.searchParams.set('page', String(page));
        url.searchParams.set('pageSize', String(pageSize));

        selectedCategories.forEach((c) => url.searchParams.append('categories', c));

        if (sortParam) {
          url.searchParams.set('sort', sortParam);
        }

        // Fetch the data
        const response = await fetch(url);

        // Check if the request was successful and if not, throw an error
        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`);
        }

        // Parse the response as JSON and set the data
        const json = (await response.json()) as PagedBooksResponse;
        setData(json);
      } 
      catch (e) {
        const message = e instanceof Error ? e.message : 'Unknown error';
        setError(message);
        setData(null);
      } 
      finally {
        setLoading(false);
      }
    }

    load();
  }, [page, pageSize, sortParam, selectedCategories]);

  // If page size changes, jump back to page 1.
  function handlePageSizeChange(newPageSize: number) {
    setPageSize(newPageSize);
    setPage(1);
  }

  const totalPages = data?.totalPages ?? 1;
  const pageNumbers = useMemo(
    () => getPageNumbers(page, totalPages),
    [page, totalPages]
  );

  const handleAddToCart = (bookID: number, title: string, price: number) => {
    addToCart({
      bookID,
      title,
      price,
      quantity: 1,
    });
  };

  return (
    <div className="container py-4">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
        <h1 className="h3 m-0 text-nowrap">Book List</h1>

        <div className="d-flex flex-wrap align-items-center gap-3 flex-shrink-0">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="sortByTitle"
              checked={sortByTitle}
              onChange={(e) => {
                setSortByTitle(e.target.checked);
                setPage(1);
              }}
            />
            <label className="form-check-label" htmlFor="sortByTitle">
              Sort by title
            </label>
          </div>

          <div className="d-flex align-items-center gap-2">
            <label className="form-label m-0" htmlFor="pageSize">
              Results per page
            </label>
            <select
              id="pageSize"
              className="form-select form-select-sm"
              style={{ width: 140 }}
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="card shadow-sm">
        <div className="card-body">
          {loading && <div>Loading...</div>}

          {!loading && data && (
            <>
              <div className="table-responsive">
                <table className="table table-striped align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Publisher</th>
                      <th>ISBN</th>
                      <th>Classification</th>
                      <th>Category</th>
                      <th className="text-end">Pages</th>
                      <th className="text-end">Price</th>
                      <th className="text-end text-nowrap">Add to Cart</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.items.map((b) => (
                      <tr key={b.bookID}>
                        <td>{b.title}</td>
                        <td>{b.author}</td>
                        <td>{b.publisher}</td>
                        <td>{b.isbn}</td>
                        <td>{b.classification}</td>
                        <td>{b.category}</td>
                        <td className="text-end">{b.pageCount}</td>
                        <td className="text-end">
                          {b.price.toLocaleString(undefined, {
                            style: 'currency',
                            currency: 'USD',
                          })}
                        </td>
                        <td className="text-end">
                          <button
                            type="button"
                            className="btn btn-primary text-nowrap"
                            onClick={() => handleAddToCart(b.bookID, b.title, b.price)}
                          >
                            Add to Cart
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mt-3">
                <div className="text-muted">
                  Page {data.page} of {data.totalPages} ({data.totalItems} total
                  books)
                </div>

                <nav aria-label="Book pages">
                  <ul className="pagination pagination-sm mb-0">
                    <li className={`page-item ${page <= 1 ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                      >
                        Previous
                      </button>
                    </li>

                    {pageNumbers.map((p) => (
                      <li
                        key={p}
                        className={`page-item ${p === page ? 'active' : ''}`}
                      >
                        <button className="page-link" onClick={() => setPage(p)}>
                          {p}
                        </button>
                      </li>
                    ))}

                    <li
                      className={`page-item ${
                        page >= totalPages ? 'disabled' : ''
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

