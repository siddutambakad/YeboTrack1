import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Dimensions, Text, View} from 'react-native';
import FontFamily from '../../Styles/FontFamily';
import {
  fontPixel,
  horizontalScale,
  pixelSizeHorizontal,
  pixelSizeVertical,
  responsiveBorderRadius,
  verticalScale,
} from '../../Utils/Dimensions';
import MyUsage from './MyUsage';
import AdhocBooking from './AdhocBooking';

const Tab = createMaterialTopTabNavigator();

const MyStatsTabNavi = props => {
  const {screen1Name, screen1Component, screen2Name, screen2Component} = props;
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
        tabBarIndicatorStyle: {
          width: Dimensions.get('window').width * 0.35,
          backgroundColor: 'rgba(102, 39, 110, 1)',
          marginTop: 10,
          height: 3,
        },
        tabBarIndicatorContainerStyle: {
          marginLeft: pixelSizeHorizontal(30),
        },
        tabBarPressColor: 'rgba(246, 246, 246, 1)',
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({}) => (
            <View
              style={{
                width: horizontalScale(120),
                height: verticalScale(40),
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: FontFamily.semiBold,
                  fontSize: fontPixel(14),
                }}>
                {screen1Name}
              </Text>
            </View>
          ),
        }}
        name={screen1Name}
        component={screen1Component}
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
                  fontSize: fontPixel(14),
                }}>
                {screen2Name}
              </Text>
            </View>
          ),
        }}
        name={screen2Name}
        component={screen2Component}
      />
    </Tab.Navigator>
  );
};

export default MyStatsTabNavi;
