import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {APIS} from '../APIURLS/ApiUrls';
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = ({children}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [ongoingRoasters, setOngoingRoasters] = useState([]);
  // const [upcomingRoasters, setUpcomingRoasters] = useState([]);
  const [driverRoasterList, setDriverRoasterList] = useState({
    upcoming: [],
    onGoing: [],
    recent: [],
  });
  const [employeeRoasterList, setEmployeeRoasterList] = useState({
    upcoming: [],
    onGoing: [],
    recent: [],
  });
  // console.log(
  //   '🚀 ~ AppProvider ~ employeeRoasterList:',
  //   employeeRoasterList?.onGoing,
  // );
  const [driverId, setDriverId] = useState(null);
  // const [driverDetails, setDriverDetails] = useState(null);
  const [tripDetailsResponse, setTripDetailsResponse] = useState(null);
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [idTrips, setIdTrips] = useState(0);
  const [userRoles, setUserRoles] = useState('');
  const [userId, setUserId] = useState('');
  const [idEmployee, setIdEmployee] = useState('');
  const [driverName, setDriverName] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    saveIsLoggedIn();
    getUserAndDriverDetails();
  }, [isLoggedIn]);

  const getTripDetails = async idRoasterDays => {
    setLoader(true);
    try {
      const apiUrl = `${APIS.getTripDeatils}/${idRoasterDays}`;
      const response = await axios.get(apiUrl);
      const responseData = response?.data;
      // stepperPointChanger(responseData?.returnLst?.tripDetail);
      setTripDetailsResponse(responseData?.returnLst);
      setIdTrips(responseData?.returnLst?.tripDetail?.idTrip);
      setEmployeeDetails(responseData?.returnLst?.roasterEmpDetails);
    } catch (error) {
      console.log('error from the tripdetail', error);
    } finally {
      setLoader(false);
    }
  };

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

  const getUserAndDriverDetails = async () => {
    try {
      const userRole = await AsyncStorage.getItem('userRole');
      setUserRoles(userRole);
      const idUser = await AsyncStorage.getItem('idUser');
      setUserId(idUser);
      const idEmployee = await AsyncStorage.getItem('idEmployee');
      setIdEmployee(idEmployee);
      const idDriver = await AsyncStorage.getItem('idDriver');
      setDriverId(idDriver);
      const driverName = await AsyncStorage.getItem('driverName');
      setDriverName(driverName);
    } catch (error) {
      console.log('error in fetching the local storage', error);
    }
  };

  useEffect(() => {
    if (driverId) {
      getDriverList(driverId);
    } else if (idEmployee) {
      getUserList(idEmployee);
    }
  }, [driverId, idEmployee]);

  const getDriverList = async driverId => {
    try {
      const apiUrl = `${APIS.getDriverRoasterList}/${driverId}`;
      const response = await axios.get(apiUrl);
      const data = response.data;

      // seggerate data based on "roasterStatus"
      let keys = {upcoming: 0, onGoing: 1, recent: 2};

      let seggerateData = Object.entries(keys).reduce(
        (prvObj, [key, value]) => {
          let filterData = data.returnLst.filter(
            filObj => filObj.roasterStatus == value,
          );
          return {...prvObj, ...Object.fromEntries([[key, filterData]])};
        },
        {},
      );
      setDriverRoasterList(seggerateData);

      // const ongoing = data.returnLst.filter(
      //   roaster => roaster.roasterStatus === 1,
      // );
      // const upcoming = data.returnLst.filter(
      //   roaster => roaster.roasterStatus === 0,
      // );
      // setOngoingRoasters(ongoing);
      // setUpcomingRoasters(upcoming);
      // console.log('Ongoing Roasters:', data);
    } catch (error) {
      console.error('Error fetching driver list:', error);
    }
  };

  const getUserList = async idEmployee => {
    console.log('🚀 ~ getUserList ~ idEmployee:', idEmployee);
    setLoader(true);
    try {
      const apiUrl = `${APIS.getUserList}/${idEmployee}`;
      console.log('apiUrl', apiUrl);
      const response = await axios.get(apiUrl);
      const data = response.data;

      // seggerate data based on "roasterStatus"
      let keys = {upcoming: 0, onGoing: 1, recent: 2};

      let seggerateData = Object.entries(keys).reduce(
        (prvObj, [key, value]) => {
          let filterData = data.returnLst.filter(
            filObj => filObj.roasterStatus == value,
          );
          return {...prvObj, ...Object.fromEntries([[key, filterData]])};
        },
        {},
      );
      setEmployeeRoasterList(seggerateData);
    } catch (error) {
      console.error('Error fetching user list:', error?.message);
    } finally {
      setLoader(false);
    }
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
        // driverDetails,
        driverName,
        driverRoasterList,
        driverId,
        tripDetailsResponse,
        getTripDetails,
        loader,
        employeeDetails,
        setLoader,
        setEmployeeDetails,
        idTrips,
        getDriverList,
        driverId,
        userRoles,
        userId,
        employeeRoasterList,
        getUserList,
        idEmployee
      }}>
      {children}
    </AppContext.Provider>
  );
};
