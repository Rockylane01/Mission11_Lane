import { useState } from 'react';
import './App.css'
import BookList from './components/BookList'
import CategoryFilter from './components/CategoryFilter'

function App() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <>
      <div className="container">
        <h1>Book Store</h1>
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
    </>
  )
}

export default App
