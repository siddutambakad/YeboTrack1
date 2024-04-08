import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { fontPixel, horizontalScale, pixelSizeHorizontal, responsiveBorderRadius, verticalScale } from '../../Utils/Dimensions';
import FontFamily from '../../Styles/FontFamily';
import UserOngoingTrip from './UserOngoingTrip';
import UserUpcoming from './UserUpcoming';
import UserRecent from './UserRecent';

const Tab = createMaterialTopTabNavigator();

const UserTopTabNavigator = () => {
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
        name="UserOngoing"
        component={UserOngoingTrip}
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
        name="UserUpcoming"
        component={UserUpcoming}
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
        name="UserRecent"
        component={UserRecent}
      />
    </Tab.Navigator>
  );
};

export default UserTopTabNavigator;

const styles = StyleSheet.create({});
