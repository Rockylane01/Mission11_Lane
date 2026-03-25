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
        <>
            <h5>Category</h5>
            <div>
                {categories.map((category) => (
                    <div key={category}>
                        <input type="checkbox" id={category} name={category} />
                        <label htmlFor={category}>{category}</label>
                    </div>
                ))}
            </div>
        </>
    )
}

export default CategoryFilter;