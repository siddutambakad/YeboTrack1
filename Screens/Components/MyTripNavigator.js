import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import UpComingScreens from '../UpComingScreens';
import OngoingScreen from '../OngoingScreen';
import RecentScreen from '../RecentScreen';
import {Text, View} from 'react-native';
import FontFamily from '../Styles/FontFamily';

const Tab = createMaterialTopTabNavigator();

const MyTripNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'rgba(0, 0, 0, 1)',
        tabBarInactiveTintColor: 'rgba(0, 0, 0, 1)',
        labelStyle: {fontSize: 14, fontWeight: 'bold'},
        tabBarContentContainerStyle: {height: 65},
        tabBarStyle: {
          paddingTop: 10,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          backgroundColor: 'rgba(246, 246, 246, 1)',
          elevation: 0,
        },
        tabBarItemStyle: {
          marginHorizontal: 16,
          justifyContent: 'flex-end',
          // borderWidth: 2,
        },
        tabBarIndicatorStyle: {
          width: '25%',
          backgroundColor: 'rgba(102, 39, 110, 1)',
        },
        tabBarIndicatorContainerStyle: {
          marginLeft: 16,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({}) => (
            <View style={{width: 70, alignItems: 'center', marginLeft: -20}}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: FontFamily.semiBold,
                  fontSize: 16,
                }}>
                Ongoing
              </Text>
            </View>
          ),
        }}
        name="OnGoing"
        component={OngoingScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({}) => (
            <View style={{width: 75, alignItems: 'center', marginLeft: -20}}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: FontFamily.semiBold,
                  fontSize: 16,
                }}>
                Upcoming
              </Text>
            </View>
          ),
        }}
        name="UpComing"
        component={UpComingScreens}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({}) => (
            <View style={{width: 70, alignItems: 'center', marginLeft: -20}}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: FontFamily.semiBold,
                  fontSize: 16,
                }}>
                Recent
              </Text>
            </View>
          ),
        }}
        name="Recent"
        component={RecentScreen}
      />
    </Tab.Navigator>
  );
};

export default MyTripNavigator;
