import React, {createContext, useState, useContext} from 'react';

export const UpcomingLists = createContext();

export const AppProvider = ({children}) => {
  // const [data, setData] = useState([1, 1, 1, 1, 1]);
  // const [data1, setData2] = useState([1, 1, 1, 1, 1]);
  const [selectedItem, setSelectedItem] = useState(null)
  return (
    <UpcomingLists.Provider
      value={{
        // data,
        // data1,
        selectedItem,
        setSelectedItem
      }}>
      {children}
    </UpcomingLists.Provider>
  );
};
