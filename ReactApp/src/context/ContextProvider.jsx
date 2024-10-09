import { createContext, useContext, useState } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <MyContext.Provider value={{ username, setUsername, password, setPassword }}>
            {children}
        </MyContext.Provider>
    );
};

export const useTheContext = () => {
    return useContext(MyContext);
};
