import { useEffect, useState, type ChangeEvent } from 'react';

const API_BASE_URL = 'https://localhost:7211';

/**
 * Loads category names from the API once, then drives `selectedCategories`
 * in the parent via checkboxes (BooksPage passes the setter down).
 */
function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
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

  function handleCategoryChange(e: ChangeEvent<HTMLInputElement>) {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== value));
    }
  }

  return (
    <div className="mt-3">
      <h5 className="mb-2 mb-md-3">Category</h5>
      <div className="d-flex flex-row flex-wrap gap-2 flex-md-column align-items-start">
        {categories.map((category, index) => (
          <div
            key={category}
            className="form-check d-flex align-items-center gap-2 mb-md-0 flex-shrink-0 border border-secondary-subtle rounded px-2 py-1"
          >
            <input
              className="form-check-input m-0"
              type="checkbox"
              id={`category-${index}`}
              name="category"
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={handleCategoryChange}
            />
            <label
              className="form-check-label m-0 small lh-sm"
              htmlFor={`category-${index}`}
            >
              {category}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
