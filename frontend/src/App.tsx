import './App.css'
import BooksPage from './pages/BooksPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<BooksPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
