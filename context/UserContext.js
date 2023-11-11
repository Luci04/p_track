import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [periodStart, setPeriodStart] = useState('2023-11-04');
    const [periodLength, setPeriodLength] = useState(6);
    const [periodCycle, setPeriodCycle] = useState(28);
    const [markedPeriodDate, setMarkedPeriodDate] = useState([]);
    const [DateHistory, setDateHistory] = useState({});


    return (
        <UserContext.Provider value={{ periodStart, setPeriodStart, periodLength, periodCycle, markedPeriodDate, setMarkedPeriodDate, DateHistory, setDateHistory }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
