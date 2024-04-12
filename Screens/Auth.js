import React, {useState, useEffect, useContext} from 'react';
import SplashScreen from './SplashScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import LoginPage from './LoginPage';
import OtpScreen from './OtpScreen';
import HomeScreen from './HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyTripsScreen from './MyTripsScreen';
import Car from '../assets/images/Car.svg';
import Home from '../assets/images/Home.svg';
import Adhac from '../assets/images/Adhac.svg';
import Help from '../assets/images/HelpDesc.svg';
import DriverHomeScreen from './DriverHomeScreen';
import ProfileScreen from './ProfileScreen';
import Profile from '../assets/images/Profile.svg';
import FontFamily from './Styles/FontFamily';
import StartTrip from './LoginTrips/StartTrip';
import HelpDescScreen from './UserScreens/HelpDescScreen';
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
import AdhacScreeen from '../Screens/UserScreens/AdhacScreen';
import UsersMyTripScreen from './UserScreens/UsersMyTripScreen';
import StartLoginTripSCreen from './MyTripsScreens/StartLoginTripScreen';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {
  fontPixel,
  horizontalScale,
  pixelSizeVertical,
  responsiveBorderRadius,
  verticalScale,
} from './Utils/Dimensions';
import MyTripStats from './UserScreens/MyTripStats';
import UserProfileScreen from './UserScreens/UserProfileScreen';
import UserMyTripsScreen from './UserScreens/UserMyTripsTopNavigator/UserMyTripsScreen';
import RaiseFeedBackScreen from './UserScreens/RaiseFeedBackScreens/RaiseFeedBackScreen';
import TicketDetails from './UserScreens/RaiseFeedBackScreens/TicketDetails';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

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
              name="MainStack"
              component={UserStack}
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

            <Stack.Screen
              name="MyTripStats"
              component={MyTripStats}
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

function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={BottomtabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserMyTrips"
        component={UserMyTripsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RaiseFeedBack"
        component={RaiseFeedBackScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TicketDetails"
        component={TicketDetails}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function BottomtabNavigator({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <BottomTab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            height: verticalScale(75),
            borderTopLeftRadius: responsiveBorderRadius(30),
            borderTopRightRadius: responsiveBorderRadius(30),
            elevation: 8,
          },
        }}>
        <BottomTab.Screen
          name="Home "
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  width: horizontalScale(80),
                  height: verticalScale(60),
                  alignItems: 'center',
                }}>
                {focused && (
                  <View
                    style={{
                      borderTopWidth: 3,
                      width: horizontalScale(50),
                      height: verticalScale(4),
                      borderColor: '#C5197D',
                      marginTop: pixelSizeVertical(-8),
                    }}></View>
                )}
                <View style={{marginTop: pixelSizeVertical(8)}}>
                  <Home
                    width={horizontalScale(25)}
                    height={verticalScale(25)}
                  />
                </View>
                <Text
                  style={{
                    color: '#C5197D',
                    fontFamily: focused
                      ? FontFamily.semiBold
                      : FontFamily.regular,
                    fontSize: focused ? fontPixel(16) : fontPixel(14),
                  }}>
                  Home
                </Text>
              </View>
            ),
          }}
        />
        <BottomTab.Screen
          name="My Trips"
          component={UserMyTripsScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <TouchableOpacity
              onPress={() => {
                navigation.navigate('UserMyTrips')
              }}
                style={{
                  width: horizontalScale(80),
                  height: verticalScale(60),
                  alignItems: 'center',
                }}>
                {focused && (
                  <View
                    style={{
                      borderTopWidth: 3,
                      width: horizontalScale(50),
                      height: verticalScale(4),
                      borderColor: '#C5197D',
                      marginTop: pixelSizeVertical(-8),
                    }}></View>
                )}
                <View style={{marginTop: pixelSizeVertical(8)}}>
                  <Car width={horizontalScale(30)} height={verticalScale(30)} />
                </View>
                <Text
                  style={{
                    color: '#C5197D',
                    fontFamily: focused
                      ? FontFamily.semiBold
                      : FontFamily.regular,
                    fontSize: focused ? fontPixel(16) : fontPixel(14),
                  }}>
                  My Trips
                </Text>
              </TouchableOpacity>
            ),
          }}
        />
        <BottomTab.Screen
          name="Adhac"
          component={AdhacScreeen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  width: horizontalScale(80),
                  height: verticalScale(60),
                  alignItems: 'center',
                }}>
                {focused && (
                  <View
                    style={{
                      borderTopWidth: 3,
                      width: horizontalScale(50),
                      height: verticalScale(4),
                      borderColor: '#C5197D',
                      marginTop: pixelSizeVertical(-8),
                    }}></View>
                )}
                <View style={{marginTop: pixelSizeVertical(8)}}>
                  <Adhac
                    width={horizontalScale(30)}
                    height={verticalScale(30)}
                  />
                </View>
                <Text
                  style={{
                    color: '#C5197D',
                    fontFamily: focused
                      ? FontFamily.semiBold
                      : FontFamily.regular,
                    fontSize: focused ? fontPixel(16) : fontPixel(14),
                  }}>
                  Adhac
                </Text>
              </View>
            ),
          }}
        />
        <BottomTab.Screen
          name="HelpDesc"
          component={HelpDescScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  width: horizontalScale(80),
                  height: verticalScale(60),
                  alignItems: 'center',
                }}>
                {focused && (
                  <View
                    style={{
                      borderTopWidth: 3,
                      width: horizontalScale(50),
                      height: verticalScale(4),
                      borderColor: '#C5197D',
                      marginTop: pixelSizeVertical(-8),
                    }}></View>
                )}
                <View style={{marginTop: pixelSizeVertical(8)}}>
                  <Help
                    width={horizontalScale(30)}
                    height={verticalScale(30)}
                  />
                </View>
                <Text
                  style={{
                    color: '#C5197D',
                    fontFamily: focused
                      ? FontFamily.semiBold
                      : FontFamily.regular,
                    fontSize: focused ? fontPixel(16) : fontPixel(14),
                  }}>
                  Help
                </Text>
              </View>
            ),
          }}
        />
      </BottomTab.Navigator>
    </SafeAreaView>
  );
}

export default Auth;
