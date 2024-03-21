import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext();

export const AppProvider = ({children}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    saveIsLoggedIn();
  }, [isLoggedIn]);

  const saveIsLoggedIn = async () => {
    try {
      const loggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (loggedIn !== null && loggedIn === 'true') {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error saving isLoggedIn to AsyncStorage:', error);
    }
  };

  const handleLogin = async () => {
    setIsLoggedIn(true);
    try {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      console.log('isLoggedIn set to true successfully');
    } catch (error) {
      console.error('Error setting isLoggedIn to true:', error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    AsyncStorage.setItem('isLoggedIn', 'false');
  };

  return (
    <AppContext.Provider
      value={{
        selectedItem,
        setSelectedItem,
        isLoggedIn,
        setIsLoggedIn,
        handleLogin,
        handleLogout,
      }}>
      {children}
    </AppContext.Provider>
  );
};
