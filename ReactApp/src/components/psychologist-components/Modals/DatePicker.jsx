
import React, { useState } from "react";
import "../../../styles/psycho-container/date_picker.css";
import { POST } from "../../../services/crud";
import { useParams } from "react-router-dom";

function SessionInput() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, -8)
  );
  const { id_expedient } = useParams();

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSubmit = async () => {
    const apiPost = "http://localhost:8000/api/psychologist/create-session/";
    const formattedDate = new Date(selectedDate).toISOString();
    const sessionData = {
      session_date: formattedDate,
      id_expedient: id_expedient,
    };
    try {
      const response = await POST(apiPost, sessionData);

      // Responde al éxito de la creación de sesión
      console.log("Sesión creada:", response);

      // Opcional: Puedes mostrar un mensaje de éxito al usuario aquí.
    } catch (error) {
      console.error("Error al crear la sesión:", error);
    }
  };

  return (
    <>
      <h2>Secciona una Fecha para la proxima session: </h2>
      <div>
        <label>
          Selecciona fecha y hora:
          <input
            type="datetime-local"
            value={selectedDate}
            onChange={handleDateChange}
            style={{ width: "100%", padding: "5px", fontSize: "16px" }}
          />
        </label>

        <button onClick={handleSubmit}>Guardar Sesión</button>
      </div>
    </>
  );
}

export default SessionInput;
