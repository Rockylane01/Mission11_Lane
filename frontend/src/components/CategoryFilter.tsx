import { useState, useEffect } from "react";

const API_BASE_URL = 'https://localhost:7211';

function CategoryFilter() {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        async function load() {
            const response = await fetch(`${API_BASE_URL}/api/books/GetCategories`);

            if (!response.ok) {
                throw new Error(`Request failed (${response.status})`);
            }

            const json = (await response.json()) as string[];
            setCategories(json);
        }

        load();
    }, []);

    return (
        <div className="container mt-3">
            <h5 className="mb-3">Category</h5>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-1">
                {categories.map((category, index) => (
                    <div key={category} className="col">
                        <div className="form-check d-flex align-items-center gap-2 h-100">
                            <input
                                className="form-check-input m-0"
                                type="checkbox"
                                id={`category-${index}`}
                                name="category"
                                value={category}
                            />
                            <label className="form-check-label m-0 small lh-sm" htmlFor={`category-${index}`}>
                                {category}
                            </label>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategoryFilter;