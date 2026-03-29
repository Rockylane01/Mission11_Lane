import { useState } from 'react';

import BookList from '../components/BookList';
import CategoryFilter from '../components/CategoryFilter';
import Welcome from '../components/Welcome';

/**
 * Home / books route: header, sidebar category checkboxes, main book table.
 * Selected categories are lifted here so both filter and list stay in sync.
 */
export default function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container">
      <Welcome />
      <div className="row">
        <div className="col-md-3">
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className="col-md-9">
          <BookList selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
}
