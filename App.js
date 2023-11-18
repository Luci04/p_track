/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigator from './navigations/BottomNavigator';
import { PaperProvider } from 'react-native-paper';
import { UserProvider } from './context/UserContext';
import { createTable, getDBConnection, getTodoItems, saveTodoItems } from './db-service'

export default function App() {

  const loadDataCallback = useCallback(async () => {
    try {
      const initTodos = [{ id: 0, value: 'go to shop' }, { id: 1, value: 'eat at least a one healthy foods' }, { id: 2, value: 'Do some exercises' }];
      const db = await getDBConnection();
      await createTable(db);
      const storedTodoItems = await getTodoItems(db);
      if (storedTodoItems.length) {
        console.log(storedTodoItems);
      } else {
        await saveTodoItems(db, initTodos);
        console.log(storedTodoItems);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadDataCallback()
  }, [loadDataCallback])


  return (
    <NavigationContainer>
      <PaperProvider>
        <UserProvider>
          <BottomNavigator />
        </UserProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}
