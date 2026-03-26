import { useState, useEffect } from "react";


const API_BASE_URL = 'https://localhost:7211';

function CategoryFilter({
    selectedCategories, setSelectedCategories
}: {
    selectedCategories: string[], 
    setSelectedCategories: (categories: string[]) => void
}) {
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


    function handleCategoryChange({target}: React.ChangeEvent<HTMLInputElement> & {target: HTMLInputElement}) {
        const updatedCategories = selectedCategories.includes(target.value) ? selectedCategories.filter(c => c !== target.value) : [...selectedCategories, target.value];
        setSelectedCategories(updatedCategories);
    }

    return (
        <div className="container mt-3">
            <h5 className="mb-3">Category</h5>
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 g-1">
                {categories.map((category, index) => (
                    <div key={category} className="col">
                        <div className="form-check d-flex align-items-center gap-2 h-100">
                            <input
                                className="form-check-input m-0"
                                type="checkbox"
                                id={`category-${index}`}
                                name="category"
                                value={category}
                                onChange={handleCategoryChange}
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