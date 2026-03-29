import BooksPage from './pages/BooksPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="min-vh-100 bg-body text-body">
      <Router>
        <Routes>
          <Route path="/" element={<BooksPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
