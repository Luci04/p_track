import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [value, setValue] = useState('2023-10-4');

    return (
        <UserContext.Provider value={{ value }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
