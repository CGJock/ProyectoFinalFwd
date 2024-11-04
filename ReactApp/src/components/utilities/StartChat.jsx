import React, { useEffect, useState } from 'react';
import { useTwilio } from '../../context/AuthContext';
import Chat from './TwilioChat';

const StartChat = () => {
    const { twilioClient, initializeTwilio } = useTwilio();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [conversation, setConversation] = useState(null);

    useEffect(() => {
        const getTwilioToken = async () => {
            try {
                // Solicita el token de Twilio desde tu backend
                const response = await fetch('/api/get-twilio-token');
                if (!response.ok) {
                    throw new Error('No se pudo obtener el token de Twilio.');
                }
                const data = await response.json();
                initializeTwilio(data.token);
            } catch (err) {
                console.error("Error al obtener el token de Twilio", err);
                setError(err.message);
            }
        };

        getTwilioToken();
    }, [initializeTwilio]);

    useEffect(() => {
        if (twilioClient) {
            console.log('Twilio inicializado correctamente');
        } else {
            console.error('Twilio no está inicializado');
        }
    }, [twilioClient]);

    const handleStartChat = async () => {
        if (!twilioClient) {
            setError("Twilio no está inicializado.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Solicita un psicólogo disponible
            const response = await fetch('/api/psicologo-disponible/');
            if (!response.ok) {
                throw new Error("No hay psicólogos disponibles en la línea de ayuda.");
            }
            const data = await response.json();
            const { conversation_sid } = data;

            // Conéctate a la conversación de Twilio
            const conversation = await twilioClient.getConversationBySid(conversation_sid);
            setConversation(conversation);
            alert("Conectado a la conversación con el psicólogo");
        } catch (err) {
            setError(err.message);
            console.error('Error al iniciar la conversación', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Iniciar Chat con un Psicólogo Disponible</h2>
            <button onClick={handleStartChat} disabled={loading}>
                {loading ? 'Conectando...' : 'Iniciar Chat'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {conversation && <Chat conversation={conversation} />}
        </div>
    );
};

export default StartChat;
