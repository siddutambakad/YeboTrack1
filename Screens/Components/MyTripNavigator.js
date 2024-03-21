import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import UpComingScreens from '../UpComingScreens';
import OngoingScreen from '../OngoingScreen';
import RecentScreen from '../RecentScreen';
import {Text, View} from 'react-native';
import FontFamily from '../Styles/FontFamily';
import {
  fontPixel,
  horizontalScale,
  pixelSizeHorizontal,
  pixelSizeVertical,
  responsiveBorderRadius,
  verticalScale,
} from '../Utils/Dimensions';

const Tab = createMaterialTopTabNavigator();

const MyTripNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'rgba(0, 0, 0, 1)',
        tabBarInactiveTintColor: 'rgba(0, 0, 0, 1)',
        tabBarContentContainerStyle: {height: verticalScale(70)},
        tabBarStyle: {
          // paddingTop: 10,
          borderTopLeftRadius: responsiveBorderRadius(50),
          borderTopRightRadius: responsiveBorderRadius(50),
          backgroundColor: 'rgba(246, 246, 246, 1)',
          elevation: 0,
          justifyContent: 'center',
        },
        tabBarItemStyle: {
          // marginHorizontal: 16,
          // justifyContent: 'flex-end',
          // borderWidth: 2,
        },
        tabBarIndicatorStyle: {
          width: horizontalScale(100),
          backgroundColor: 'rgba(102, 39, 110, 1)',
          marginTop: 10,
        },
        tabBarIndicatorContainerStyle: {
          marginLeft: pixelSizeHorizontal(20),
        },
        tabBarPressColor: 'rgba(246, 246, 246, 1)',
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({}) => (
            <View
              style={{
                width: horizontalScale(100),
                height: verticalScale(40),
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: FontFamily.semiBold,
                  fontSize: fontPixel(18),
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
            <View
              style={{
                width: horizontalScale(100),
                height: verticalScale(40),
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: FontFamily.semiBold,
                  fontSize: fontPixel(18),
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
            <View
              style={{
                width: horizontalScale(100),
                height: verticalScale(40),
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: FontFamily.semiBold,
                  fontSize: fontPixel(18),
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
