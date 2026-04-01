import { useState } from "react";
import type { Book } from "../types/book";

export default function NewBookForm() {

    const [formData, setFormData] = useState<Book>({
        bookID: 0,
        title: '',
        author: '',
        publisher: '',
        isbn: '',
        classification: '',
        category: '',
        pageCount: 0,
        price: 0,
    });

    return (
        <div>
            <form>
                <h1 className="h3 m-0 text-nowrap">Add New Book</h1>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <input type="text" className="form-control" id="author" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="publisher">Publisher</label>
                    <input type="text" className="form-control" id="publisher" value={formData.publisher} onChange={(e) => setFormData({ ...formData, publisher: e.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="isbn">ISBN</label>
                    <input type="text" className="form-control" id="isbn" value={formData.isbn} onChange={(e) => setFormData({ ...formData, isbn: e.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="classification">Classification</label>
                    <input type="text" className="form-control" id="classification" value={formData.classification} onChange={(e) => setFormData({ ...formData, classification: e.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input type="text" className="form-control" id="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="pageCount">Page Count</label>
                    <input type="number" className="form-control" id="pageCount" value={formData.pageCount} onChange={(e) => setFormData({ ...formData, pageCount: Number(e.target.value) })} />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input type="number" className="form-control" id="price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} />
                </div>
            </form>
            <button type="submit" className="btn btn-primary">Add Book</button>
            <button type="button" className="btn btn-secondary">Cancel</button>
        </div>
    );
}