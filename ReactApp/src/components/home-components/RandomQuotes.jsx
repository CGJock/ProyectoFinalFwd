import React, { useState, useEffect } from "react";
import "../../styles/home-styles/random-quotes.css";

const RandomQuotes = () => {
  const quotes = [
    "La paciencia es la clave del éxito.",
    "No hay atajos para los lugares que valen la pena.",
    "Cada día es una nueva oportunidad.",
    "El cambio comienza con un solo paso.",
    "Mantén la calma y sigue adelante.",
    "El éxito es la suma de pequeños esfuerzos repetidos cada día."
  ];

  // Estado para la frase actual
  const [currentQuote, setCurrentQuote] = useState("");

  useEffect(() => {
    // Función para seleccionar una frase aleatoria
    const getRandomQuote = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    };

    // Actualizar la frase cada 10 segundos
    const intervalId = setInterval(getRandomQuote, 10000);

    // Ejecutar la primera frase inmediatamente
    getRandomQuote();

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, [quotes]);

  return (
    <div className="quote-container">
      <p className="quote-text">{currentQuote}</p>
    </div>
  );
};

export default RandomQuotes;
