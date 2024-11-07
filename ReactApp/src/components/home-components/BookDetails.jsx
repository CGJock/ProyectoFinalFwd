import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const { index } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('books'));
    if (savedBooks && savedBooks[index]) {
      setBook(savedBooks[index]);
    }
  }, [index]);

  if (!book) {
    return <p>El libro no se encontró.</p>;
  }

  return (
    <div className="container my-5">
      <h2>Detalles del libro</h2>
      <h3>{book.title}</h3>
      <a href={book.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
        Leer el libro
      </a>
    </div>
  );
};

export default BookDetails;
