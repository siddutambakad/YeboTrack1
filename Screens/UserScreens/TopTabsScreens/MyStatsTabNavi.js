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

const MyStatsTabNavi = () => {

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
          height: 3
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
               My Usage
              </Text>
            </View>
          ),
        }}
        name="MyUsage"
        component={MyUsage}
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
                Adoc Booking
              </Text>
            </View>
          ),
        }}
        name="AdocBook"
        component={AdhocBooking}
      />
    </Tab.Navigator>
  );
};

export default MyStatsTabNavi;
