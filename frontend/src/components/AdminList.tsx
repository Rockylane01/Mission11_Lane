import { useEffect, useMemo, useState } from "react";
import type { Book, PagedBooksResponse } from "../types/book";
import { fetchBooks } from "../api/BooksAPI";
import Pagination from "./Pagination";
import NewBookForm from "./NewBookForm";
import EditBookForm from "./EditBookForm";

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

const AdminList = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [sortByTitle, setSortByTitle] = useState(false);

    const [data, setData] = useState<PagedBooksResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const [showNewBookForm, setShowNewBookForm] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                setError(null);
                const response = await fetchBooks(page, pageSize, [], sortByTitle ? 'title' : '');
                setData(response);
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

        // Load the data when the page or page size changes
        load();
    }, [page, pageSize, sortByTitle]);

    function handlePageSizeChange(newPageSize: number) {
        setPageSize(newPageSize);
        setPage(1);
    }

    const totalPages = data?.totalPages ?? 1;
    const pageNumbers = useMemo(
      () => getPageNumbers(page, totalPages),
      [page, totalPages]
    );
    
    return (
        <>
          {showNewBookForm && (
              <div className="mt-4 mt-md-5">
                <NewBookForm
                    onSuccess={() => {
                        setShowNewBookForm(false);
                        fetchBooks(page, pageSize, [], sortByTitle ? 'title' : '').then((data) =>
                          setData(data)
                        );
                    }}
                    onCancel={() => {
                        setShowNewBookForm(false);
                    }}
                />
              </div>
          )}

          {editingBook && (
              <div className="mt-4 mt-md-5">
                <EditBookForm
                    book={editingBook}
                    onSuccess={() => {
                        setEditingBook(null);
                        fetchBooks(page, pageSize, [], sortByTitle ? 'title' : '').then((data) =>
                          setData(data)
                        );
                    }}
                    onCancel={() => {
                        setEditingBook(null);
                    }}
                />
              </div>
          )}

          <div className="py-4">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
              <h1 className="h3 m-0 text-nowrap">Book List</h1>
      
              <div className="d-flex flex-wrap align-items-center justify-content-end gap-3 flex-shrink-0 ms-auto">
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

                {!showNewBookForm && (
                  <button
                    className="btn btn-primary"
                    onClick={() => setShowNewBookForm(true)}
                  >
                    Add New Book
                  </button>
                )}
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
                              <td>
                                  <button className="btn btn-primary btn-sm" onClick={() => setEditingBook(b)}>Edit</button>
                              </td>
                              <td>
                                  <button className="btn btn-danger btn-sm">Delete</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <Pagination page={page} totalPages={totalPages} setPage={setPage} pageNumbers={pageNumbers} totalItems={data.totalItems} />
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      );
}

export default AdminList;