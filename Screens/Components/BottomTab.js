import React, {useEffect, useState} from 'react';
import {Keyboard, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Car from '../../assets/images/Car.svg';
import Home from '../../assets/images/Home.svg';
import Profile from '../../assets/images/Profile.svg';
import {useNavigation} from '@react-navigation/native';
import FontFamily from '../Styles/FontFamily';
import {
  fontPixel,
  horizontalScale,
  pixelSizeHorizontal,
  pixelSizeVertical,
  responsiveBorderRadius,
  verticalScale,
} from '../Utils/Dimensions';

const BottomTab = props => {
  const {activeTab} = props;
  const navigation = useNavigation();

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  if (isKeyboardVisible) {
    return null; // Hide the BottomTab when the keyboard is visible
  }

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: 'white',
        height: verticalScale(80),
        borderTopLeftRadius: responsiveBorderRadius(35),
        borderTopRightRadius: responsiveBorderRadius(35),
        alignItems: 'center',
        // position: 'absolute',
        // bottom: 0,
        elevation: 5,
        shadowColor: 'lightgray',
        shadowOffset: {width: 0, height: -5},
        shadowOpacity: 0.3,
        shadowRadius: 5,
        overflow: 'visible',
        // borderWidth: 1
      }}>
      <View
        style={{
          width: '90%',
          height: verticalScale(80),
          marginHorizontal: pixelSizeHorizontal(30),
          paddingHorizontal: pixelSizeHorizontal(20),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Driver');
          }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            // padding: 10,
          }}>
          <View
            style={{
              borderTopWidth: activeTab == 'Home' ? 2 : 0,
              width: 60,
              top: pixelSizeVertical(-15),
              borderColor: 'rgba(197, 25, 125, 1)',
            }}></View>
          <Home width={horizontalScale(25)} height={verticalScale(25)} />
          <Text
            style={{
              color: 'rgba(197, 25, 125, 1)',
              fontFamily: FontFamily.medium,
              fontSize: fontPixel(14),
              paddingTop: 5,
              marginBottom: -5,
            }}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MyTrip');
          }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              borderTopWidth: activeTab == 'MyTrips' ? 3 : 0,
              width: horizontalScale(60),
              top: pixelSizeVertical(-12),
              borderColor: 'rgba(197, 25, 125, 1)',
            }}></View>
          <Car width={horizontalScale(40)} height={verticalScale(35)} />
          <Text
            style={{
              color: 'rgba(197, 25, 125, 1)',
              fontFamily: FontFamily.medium,
              fontSize: fontPixel(14),
            }}>
            My Trips
          </Text>
        </TouchableOpacity>
        {/*profile */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile');
          }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              borderTopWidth: activeTab == 'Profile' ? 3 : 0,
              width: horizontalScale(60),
              top: pixelSizeVertical(-16),
              borderColor: 'rgba(197, 25, 125, 1)',
            }}></View>
          <Profile width={horizontalScale(25)} height={verticalScale(25)} />
          <Text
            style={{
              color: 'rgba(197, 25, 125, 1)',
              fontFamily: FontFamily.medium,
              fontSize: fontPixel(14),
              paddingTop: 5,
              marginBottom: -5,
            }}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomTab;

const styles = StyleSheet.create({});
