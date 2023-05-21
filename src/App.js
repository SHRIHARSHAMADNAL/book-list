import './App.css';
import {
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import {BookList } from './components/bookList/BookList'
import {BookDetails} from './components/bookDetails/BookDetails';
function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/*" element={<Navigate replace to="/book-list" />} />
        <Route path="/book-list" element={<BookList />} />
        <Route path="/books/:bookId" element={<BookDetails />} />
   
      </Routes>

    </div>

  );
}

export default App;
