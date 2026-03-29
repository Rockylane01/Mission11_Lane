import CartProvider from './context/CartProvider.tsx';
import BooksPage from './pages/BooksPage.tsx';
import CartPage from './pages/CartPage.tsx';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="min-vh-100 bg-body text-body">
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Router>
      </CartProvider>
      
    </div>
  );
}

export default App;
