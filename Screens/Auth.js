import React, {useState, useEffect, useContext} from 'react';
import SplashScreen from './SplashScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import LoginPage from './LoginPage';
import OtpScreen from './OtpScreen';
import HomeScreen from './HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyTripsScreen from './MyTripsScreen';
// import HelpDescScreen from './HelpDescScreen';
// import Adhac from '../assets/images/Adhac.svg';
import Car from '../assets/images/Car.svg';
// import HelpDesc from '../assets/images/HelpDesc.svg';
import Home from '../assets/images/Home.svg';
// import AdhacScreen from './AdhacScreen';
import DriverHomeScreen from './DriverHomeScreen';
import ProfileScreen from './ProfileScreen';
import Profile from '../assets/images/Profile.svg';
import FontFamily from './Styles/FontFamily';
import StartTrip from './LoginTrips/StartTrip';
import HelpDescScreen from './HelpDescScreen';
import MyTripDetails from './MyTripsScreens/MyTripDetails';
import LocationReached from './MyTripsScreens/LocationReached';
import DriveToOffice from './MyTripsScreens/DriveToOffice';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import OngoingScreen from './OngoingScreen';
import UpComingScreens from './UpComingScreens';
import RecentScreen from './RecentScreen';
import StopTripScreen from './MyTripsScreens/StopTripScreen';
import EmployeePickUp from './MyTripsScreens/EmployeePickUp';
import MyLogoutTripScreen from './LogoutMyTripScreens/MyLogoutTripScreen';
import PickUpEmployeeScreen from './LogoutMyTripScreens/PickUpEmployeeScreen';
import StartTripSCreen from './LogoutMyTripScreens/StartTripSCreen';
import DroppedCheckInScreen from './LogoutMyTripScreens/DroppedCheckInScreen';
import DropGuardScreen from './LogoutMyTripScreens/DropGuardScreen';
import {AppContext} from './Context/AppContext';
import AdhacScreeen from './AdhacScreen';
import StartLoginTripSCreen from './MyTripsScreens/StartLoginTripScreen';

const Stack = createStackNavigator();

function Auth({props, navigation}) {
  const [showSplash, setShowSplash] = useState(true);
  const {isLoggedIn} = useContext(AppContext);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 1000);
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {showSplash && (
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
        )}

        {isLoggedIn ? (
          <>
            <Stack.Screen
              name="Driver"
              component={DriverHomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MyTrip"
              component={MyTripsScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MyTripDetail"
              component={MyTripDetails}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Location"
              component={LocationReached}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="DriveToOffice"
              component={DriveToOffice}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="StopTrip"
              component={StopTripScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="PickUp"
              component={EmployeePickUp}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MyLogoutTrip"
              component={MyLogoutTripScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="PickUpEmployee"
              component={PickUpEmployeeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="StartTrip"
              component={StartTripSCreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="DroppedCheckIn"
              component={DroppedCheckInScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="DropGuard"
              component={DropGuardScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="StartTripLogin"
              component={StartLoginTripSCreen}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="LoginPage"
              component={LoginPage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Otp"
              component={OtpScreen}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Auth;
