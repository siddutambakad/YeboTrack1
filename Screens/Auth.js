import React, {useState, useEffect} from 'react';
import SplashScreen from './SplashScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
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
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OngoingScreen from './OngoingScreen';
import UpComingScreens from './UpComingScreens';
import RecentScreen from './RecentScreen';
import StopTripScreen from './MyTripsScreens/StopTripScreen';
import EmployeePickUp from './MyTripsScreens/EmployeePickUp';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();


// Bottom tab navigation screens
// function TabNavigator({navigation}) {
//   return (
//     <BottomTab.Navigator
//       initialRouteName="Home"
//       screenOptions={{
//         headerShown: false,
//         tabBarShowLabel: false,
//         tabBarStyle: {
//           height: 70,
//           borderTopRightRadius: 25,
//           borderTopLeftRadius: 25,
//           // padding: 20,
//         },
//         tabBarLabelStyle: {
//           fontFamily: FontFamily.medium,
//           fontSize: 14,
//           color: '#C5197D',
//         },
//         tabBarHideOnKeyboard: true,
//       }}>
//       <BottomTab.Screen
//         name="Home"
//         component={DriverHomeScreen}
//         options={{
//           tabBarIcon: ({focused}) => (
//             <TouchableOpacity
//               onPress={() => {
//                 navigation.navigate('Driver');
//               }}
//               style={{
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 height: 70,
//               }}>
//               <Home style={{marginTop: 8}} />
//               <Text
//                 style={{
//                   color: '#C5197D',
//                   marginTop: 5,
//                   fontFamily: FontFamily.regular,
//                   fontSize: 14,
//                 }}>
//                 Home
//               </Text>
//             </TouchableOpacity>
//           ),
//         }}
//       />
//       <BottomTab.Screen
//         name="MyTrips"
//         component={MyTripsScreen}
//         options={{
//           tabBarIcon: ({focused}) => (
//             <View
//               style={{
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 height: 70,
//               }}>
//               <View
//                 style={{
//                   borderWidth: focused ? 1.5 : 0,
//                   width: 70,
//                   height: 2,
//                   top: -8,
//                   borderColor: focused ? '#C5197D' : 'none',
//                 }}></View>
//               <Car style={{marginTop: 8}} />
//               <Text
//                 style={{
//                   color: '#C5197D',
//                   marginTop: 5,
//                   fontFamily: FontFamily.regular,
//                   fontSize: 14,
//                 }}>
//                 My Trips
//               </Text>
//             </View>
//           ),
//         }}
//       />
//       <BottomTab.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{
//           tabBarIcon: ({focused}) => (
//             <View
//               style={{
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 height: 70,
//               }}>
//               <View
//                 style={{
//                   borderWidth: focused ? 1.5 : 0,
//                   width: 70,
//                   height: 2,
//                   top: -5,
//                   borderColor: focused ? '#C5197D' : 'none',
//                 }}></View>
//               <Profile style={{marginTop: 8}} />
//               <Text
//                 style={{
//                   color: '#C5197D',
//                   marginTop: 5,
//                   fontFamily: FontFamily.regular,
//                   fontSize: 14,
//                 }}>
//                 My Profile
//               </Text>
//             </View>
//           ),
//         }}
//       />
//     </BottomTab.Navigator>
//   );
// }

function Auth(props) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 1000);
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* {showSplash && (
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
        )}
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Otp"
          component={OtpScreen}
          options={{headerShown: false}}
        /> */}
        {/* <Stack.Screen
          name="Driver"
          component={DriverHomeScreen}
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
          name="UpcomingScreen"
          component={UpComingScreens}
          options={{headerShown: false}}
        /> */}
        {/* <Stack.Screen
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
        /> */}
        <Stack.Screen
          name="PickUp"
          component={EmployeePickUp}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Auth;
