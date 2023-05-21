import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BookList.scss'
export const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/books');
      setBooks(response.data);
      setFilteredBooks(response.data);
    } catch (error) {
      console.error('Error getting books:', error);
    }
  };

  const handleFilter = (event) => {
    const filterValue = event.target.value;
    setFilter(filterValue);

    const filtered = books.filter((book) =>
      book.author.toLowerCase().includes(filterValue.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const handleSort = (key) => {
    let sorted;

    if (key === 'title') {
      sorted = [...filteredBooks].sort((a, b) => a.title.localeCompare(b.title));
    } else if (key === 'publicationDate') {
      sorted = [...filteredBooks].sort((a, b) => a.publicationDate.localeCompare(b.publicationDate));
    }

    setFilteredBooks(sorted);

  };

  const handleBookClick = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  return (
    <div className='bookListMainContainer'>
      <input
        type="text"
        placeholder="Filter by author"
        value={filter}
        onChange={handleFilter}
      />

      <table className="table table-dark">
        <thead>
          <tr>
            <th className='headerSortDown' onClick={() => handleSort('title')}>Title<span>&#8597;</span></th>
            <th>Author</th>
            <th  className='headerSortDown' onClick={() => handleSort('publicationDate')}>
              Publication Date
              <span>&#8597;</span></th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book.id}>
              <td onClick={() => handleBookClick(book.id)}>
                {book.title}
              </td>
              <td>{book.author}</td>
              <td>{book.publicationDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

