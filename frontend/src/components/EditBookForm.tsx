import { type ChangeEvent, useState } from 'react';

import type { Book } from '../types/book';
import { updateBook } from '../api/BooksAPI';

export default function EditBookForm({
  book,
  onCancel,
  onSuccess,
}: {
  book: Book;
  onCancel: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState<Book>(book);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    if (type === 'number') {
      setFormData((prev) => ({ ...prev, [id]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBook(formData.bookID, formData);
    onSuccess();
  };
  
  return (
    <form onSubmit={handleSubmit}>
        <div className="row g-3">
            <div className="col-12">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                autoComplete="off"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="author" className="form-label">
                Author
              </label>
              <input
                type="text"
                className="form-control"
                id="author"
                autoComplete="off"
                value={formData.author}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="publisher" className="form-label">
                Publisher
              </label>
              <input
                type="text"
                className="form-control"
                id="publisher"
                autoComplete="off"
                value={formData.publisher}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="isbn" className="form-label">
                ISBN
              </label>
              <input
                type="text"
                className="form-control"
                id="isbn"
                autoComplete="off"
                value={formData.isbn}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="classification" className="form-label">
                Classification
              </label>
              <input
                type="text"
                className="form-control"
                id="classification"
                autoComplete="off"
                value={formData.classification}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <input
                type="text"
                className="form-control"
                id="category"
                autoComplete="off"
                value={formData.category}
                onChange={handleChange}
              />
            </div>
            <div className="col-6 col-md-4 col-lg-3">
              <label htmlFor="pageCount" className="form-label">
                Page count
              </label>
              <input
                type="number"
                className="form-control"
                id="pageCount"
                min={0}
                step={1}
                value={formData.pageCount}
                onChange={handleChange}
              />
            </div>
            <div className="col-6 col-md-4 col-lg-3">
              <label htmlFor="price" className="form-label">
                Price (USD)
              </label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  min={0}
                  step={0.01}
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
            </div>
        </div>

        <div className="d-flex flex-wrap justify-content-end gap-2 mt-4 pt-3 border-top border-secondary-subtle">
            <button type="button" className="btn btn-secondary text-white" onClick={onCancel}>
                Cancel
            </button>
            <button type="submit" className="btn btn-primary px-4">
                Update book
            </button>
        </div>
    </form>
  );
}
