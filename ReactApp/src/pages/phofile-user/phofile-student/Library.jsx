import React, { useState } from 'react';
import '../../../styles/library.css';
/**
 * Componente que representa una biblioteca para agregar y listar libros.
 *
 * Este componente permite a los usuarios ingresar el título y la URL de un libro,
 * y los muestra en una lista que incluye un enlace para leer el libro.
 */

const Library = () => {
  const [books, setBooks] = useState([]);  // Estado para almacenar la lista de libros
  const [bookTitle, setBookTitle] = useState(''); // Estado para el título del libro
  const [bookUrl, setBookUrl] = useState(''); // Estado para la URL del libro
  /**
   * Maneja la adición de un nuevo libro a la lista.
   * 
   * @param {Event} e - Evento de envío del formulario.
   */
  const handleAddBook = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
     // Verifica que el título y la URL no estén vacíos
    if (bookTitle && bookUrl) {
      setBooks([...books, { title: bookTitle, url: bookUrl }]);
      setBookTitle('');// Reinicia el campo de título
      setBookUrl('');// Reinicia el campo de URL
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
        {books.length > 0 ? ( // Verifica si hay libros en la lista
          <ul className="list-group">
            {books.map((book, index) => (  // Mapea los libros a una lista
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{book.title}</span>
                <a href={book.url} target="_blank" rel="noopener noreferrer" className="btn btn-info btn-sm">
                  Leer
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No hay libros en la biblioteca.</p> // Mensaje si no hay libros
        )}
      </div>
    </div>
  );
};

export default Library;
