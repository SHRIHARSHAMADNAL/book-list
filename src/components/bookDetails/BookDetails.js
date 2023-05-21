import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const BookDetails = () => {
  const [book, setBook] = useState(null);
  const { bookId } = useParams();

  useEffect(() => {
    getBook();
  }, []);

  const getBook = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/books/${bookId}`); 
      setBook(response?.data)
    } catch (error) {
      console.error('An Error Occured', error);
    }
  };

  if (!book) {
    return <div>Waiting For Data...</div>;
  }

  return (
    <div>
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Publication Date: {book.publicationDate}</p>
      <p>{book?.details}</p>
    </div>
  );
};