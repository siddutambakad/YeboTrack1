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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Define your tab navigation screens
function TabNavigator({navigation}) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          // padding: 20,
        },
        tabBarLabelStyle: {
          fontFamily: FontFamily.medium,
          fontSize: 14,
          color: '#C5197D',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={DriverHomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Driver');
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 80,
              }}>
              <View
                style={{
                  borderWidth: focused ? 1.5 : 0,
                  width: 70,
                  height: 2,
                  top: -9,
                  borderColor: focused ? '#C5197D' : 'none',
                }}></View>
              <Home style={{marginTop: 8}} />
              <Text
                style={{
                  color: '#C5197D',
                  marginTop: 5,
                  fontFamily: FontFamily.regular,
                  fontSize: 14,
                }}>
                Home
              </Text>
            </TouchableOpacity>
          ),

        }}
      />
      <Tab.Screen
        name="MyTrips"
        component={MyTripsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 80,
              }}>
              <View
                style={{
                  borderWidth: focused ? 1.5 : 0,
                  width: 70,
                  height: 2,
                  top: -13,
                  borderColor: focused ? '#C5197D' : 'none',
                }}></View>
              <Car style={{marginTop: 8}} />
              <Text
                style={{
                  color: '#C5197D',
                  marginTop: 5,
                  fontFamily: FontFamily.regular,
                  fontSize: 14,
                }}>
                My Trips
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 80,
              }}>
              <View
                style={{
                  borderWidth: focused ? 1.5 : 0,
                  width: 70,
                  height: 2,
                  top: -9,
                  borderColor: focused ? '#C5197D' : 'none',
                }}></View>
              <Profile style={{marginTop: 8}} />
              <Text
                style={{
                  color: '#C5197D',
                  marginTop: 5,
                  fontFamily: FontFamily.regular,
                  fontSize: 14,
                }}>
                My Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

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
        )} */}
        {/* <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{headerShown: false}}
        /> */}
        {/* <Stack.Screen
          name="Otp"
          component={OtpScreen}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="Driver"
          component={DriverHomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyTrip"
          component={TabNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Auth;
