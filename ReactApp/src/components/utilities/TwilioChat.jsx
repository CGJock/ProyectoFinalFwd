import React, { useEffect, useState } from 'react';
import { useTwilio } from '../../context/AuthContext';

const Chat = () => {
    const { conversation } = useTwilio(); 
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        if (!conversation) return; // Exit if conversation is undefined

        const loadMessages = async () => {
            const messageList = await conversation.getMessages();
            setMessages(messageList.items);
        };

        loadMessages();

        const messageAddedHandler = (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        conversation.on('messageAdded', messageAddedHandler);

        // Cleanup function to unsubscribe from the event listener
        return () => {
            conversation.off('messageAdded', messageAddedHandler);
        };
    }, [conversation]);

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            await conversation.sendMessage(newMessage);
            setNewMessage('');
        }
    };

    return (
        <div>
            <h2>Chat</h2>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.author}:</strong> {msg.body}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Escribe tu mensaje"
            />
            <button onClick={handleSendMessage}>Enviar</button>
        </div>
    );
};

export default Chat;
