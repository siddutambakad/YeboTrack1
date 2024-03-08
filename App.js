import 'react-native-gesture-handler';
import Auth from './Screens/Auth';
// import React, {useState, useEffect} from 'react';
// import SplashScreen from './Screens/SplashScreen';
// import {createStackNavigator} from '@react-navigation/stack';
// import {NavigationContainer} from '@react-navigation/native';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   Dimensions,
// } from 'react-native';
// import LoginPage from './Screens/LoginPage';
// import OtpScreen from './Screens/OtpScreen';
// import HomeScreen from './Screens/HomeScreen';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import MyTripsScreen from './Screens/MyTripsScreen';
// import HelpDescScreen from './Screens/HelpDescScreen';
// import Adhac from './assets/images/Adhac.svg';
// import Car from './assets/images/Car.svg';
// import HelpDesc from './assets/images/HelpDesc.svg';
// import Home from './assets/images/Home.svg';
// import AdhacScreen from './Screens/AdhacScreen';

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// // Define your tab navigation screens
// function TabNavigator({navigation}) {
//   return (
//     <Tab.Navigator
//       screenOptions={({route}) => ({
//         tabBarIcon: ({focused, color, size}) => {
//           let icon;

//           if (route.name === 'Home') {
//             icon = focused ? (
//               <Home width={20} height={20} />
//             ) : (
//               <Home width={20} height={20} />
//             );
//           } else if (route.name === 'MyTrips') {
//             icon = focused ? (
//               <Car width={20} height={20} />
//             ) : (
//               <Car width={20} height={20} />
//             );
//           } else if (route.name === 'Adhac') {
//             icon = focused ? (
//               <Adhac width={20} height={20} />
//             ) : (
//               <Adhac width={20} height={20} />
//             );
//           } else if (route.name === 'HelpDesc') {
//             icon = focused ? (
//               <HelpDesc width={20} height={20} />
//             ) : (
//               <HelpDesc width={20} height={20} />
//             );
//           }

//           return (
//             <TouchableOpacity
//               onPress={() => navigation.navigate(route.name)}
//               style={{alignSelf: 'center', justifyContent: 'center',}}>
//               {/* <Image
//                 source={icon}
//                 style={{
//                   width: 25,
//                   height: 25,
//                   tintColor: focused ? '#9ACD32' : 'gray',
//                 }}
//               /> */}
//             </TouchableOpacity>
//           );
//         },
//         tabBarLabelStyle: {
//           // fontSize: 14,
//           // fontFamily: 'SairaRegular'
//         },
//         tabBarLabel: ({focused, color}) => {
//           const labelStyle = {
//             fontSize: 13,
//             color: '#C5197D',
//             fontFamily: focused ?'SairaRegular' : 'SairaRegular'
//           };

//           return <Text style={labelStyle}>{route.name}</Text>;
//         },
//         headerShown: false,
//         tabBarStyle: {
//           height: 60,
//           justifyContent: 'center',
//           alignItems: 'center',
//           backgroundColor: '#FFFFFF',
//           borderTopLeftRadius: 15,
//           borderTopRightRadius: 15,
//         },
//         tabBarHideOnKeyboard: true,
//       })}>
//       <Tab.Screen name="Home " component={HomeScreen} />
//       <Tab.Screen name="MyTrips" component={MyTripsScreen} />
//       <Tab.Screen name="HelpDesc" component={HelpDescScreen} />
//       <Tab.Screen name="Adhac" component={AdhacScreen} />
//     </Tab.Navigator>
//   );
// }

// function StackNavigator() {
//   // const [showSplash, setShowSplash] = useState(true);

//   // useEffect(() => {
//   //   setTimeout(() => {
//   //     setShowSplash(false);
//   //   }, 1000);
//   // }, []);
//   return (
//     <Stack.Navigator>
//       {/* {showSplash && (
//         <Stack.Screen
//           name="SplashScreen"
//           component={SplashScreen}
//           options={{headerShown: false}}
//         />
//        )} */}
//       {/* <Stack.Screen
//         name="LoginPage"
//         component={LoginPage}
//         options={{headerShown: false}}
//       /> */}
//       {/* <Stack.Screen
//         name="Otp"
//         component={OtpScreen}
//         options={{headerShown: false}}
//       /> */}
//       <Stack.Screen
//         name="Home"
//         component={TabNavigator}
//         options={{headerShown: false}}
//       />
//       {/* <Stack.Screen
//         name="CartScreen"
//         component={CartScreen}
//         options={{headerShown: false}}
//       /> */}
//       {/* <Stack.Screen
//         name="OrderSummary"
//         component={OrderSummary}
//         options={{headerShown: false}}
//       />  */}
//     </Stack.Navigator>
//   );
// }
const App = () => {
  return (
    // <SafeAreaProvider>
    // <NavigationContainer>
    //   <StackNavigator>{/* <TabNavigator></TabNavigator> */}</StackNavigator>
    // </NavigationContainer>
    // </SafeAreaProvider>
    <Auth />
  );
};

export default App;
