import 'react-native-gesture-handler';
import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import Auth from './Screens/Auth'; // Assuming Auth component contains your authentication flow
import {AppContext, AppProvider} from './Screens/Context/AppContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
 

  return (
    <SafeAreaProvider>
      {/* <AppProvider > */}
        <Auth  />
      {/* </AppProvider> */}
    </SafeAreaProvider>
  );
};

export default App;
