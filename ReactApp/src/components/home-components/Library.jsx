import React, { useState } from 'react';
import '../../styles/library.css';

const Library = () => {
  const [books, setBooks] = useState([]);
  const [bookTitle, setBookTitle] = useState('');
  const [bookUrl, setBookUrl] = useState('');

  const handleAddBook = (e) => {
    e.preventDefault();
    if (bookTitle && bookUrl) {
      setBooks([...books, { title: bookTitle, url: bookUrl }]);
      setBookTitle('');
      setBookUrl('');
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Biblioteca</h2>
      <form className="mb-4" onSubmit={handleAddBook}>
        <div className="form-group">
          <label htmlFor="bookTitle">Título del libro</label>
          <input
            type="text"
            className="form-control"
            id="bookTitle"
            placeholder="Ingrese el título del libro"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="bookUrl">URL del libro</label>
          <input
            type="url"
            className="form-control"
            id="bookUrl"
            placeholder="Ingrese la URL del libro"
            value={bookUrl}
            onChange={(e) => setBookUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Agregar libro
        </button>
      </form>

      <div className="book-list">
        {books.length > 0 ? (
          <ul className="list-group">
            {books.map((book, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{book.title}</span>
                <a href={book.url} target="_blank" rel="noopener noreferrer" className="btn btn-info btn-sm">
                  Leer
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No hay libros en la biblioteca.</p>
        )}
      </div>
    </div>
  );
};

export default Library;
