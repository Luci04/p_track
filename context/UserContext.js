import React, { createContext, useEffect, useState } from 'react';
import { getDataItem } from '../utility/storage';

const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [periodStart, setPeriodStart] = useState(null);
    const [loading, setLoading] = useState(false);
    const [periodLength, setPeriodLength] = useState(7);
    const [UserName, setUserName] = useState(null);
    const [periodCycle, setPeriodCycle] = useState(28);
    const [markedPeriodDate, setMarkedPeriodDate] = useState([]);
    const [DateHistory, setDateHistory] = useState({});
    const [authenticated, setAuthenticated] = useState(false)

    const setAllData = async () => {
        const name = await getDataItem('YourName');
        if (name) {
            setUserName(name);
        } else {
            setUserName(null);
        }
    }

    useEffect(() => {
        setAllData();
    }, [])


    return (
        <UserContext.Provider value={{ periodStart, setPeriodStart, periodLength, periodCycle, markedPeriodDate, setMarkedPeriodDate, DateHistory, setDateHistory, authenticated, setAuthenticated, UserName, setUserName, loading, setLoading, setPeriodLength, setPeriodCycle }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
