import React, { createContext, useEffect, useState } from 'react';
import { getDataItem } from '../utility/storage';

const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [periodStart, setPeriodStart] = useState('2023-11-04');
    const [periodLength, setPeriodLength] = useState(6);
    const [UserName, setUserName] = useState(null);
    const [periodCycle, setPeriodCycle] = useState(28);
    const [markedPeriodDate, setMarkedPeriodDate] = useState([]);
    const [DateHistory, setDateHistory] = useState({});
    const [authenticated, setAuthenticated] = useState(true)

    const setAllData = async () => {
        const name = getDataItem('YourName');
        if (data) {
            setUserName(data);
        } else {
            setUserName(null);
        }
    }

    useEffect(() => {
        setAllData();
    }, [])


    return (
        <UserContext.Provider value={{ periodStart, setPeriodStart, periodLength, periodCycle, markedPeriodDate, setMarkedPeriodDate, DateHistory, setDateHistory, authenticated, setAuthenticated, UserName, setUserName }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
