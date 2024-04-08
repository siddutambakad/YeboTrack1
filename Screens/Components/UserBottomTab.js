import {
  Dimensions,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  fontPixel,
  horizontalScale,
  pixelSizeHorizontal,
  pixelSizeVertical,
  responsiveBorderRadius,
  verticalScale,
} from '../Utils/Dimensions';
import FontFamily from '../Styles/FontFamily';
import Sos from '../../assets/images/userSos.svg';
import SafeDrop from '../../assets/images/safeDrop.svg';
import MessageBox from '../../assets/images/messageBox.svg';
import RN from 'react-native';
const SCREEN_HEIGHT = RN.Dimensions.get('window').height;

const UserBottomTab = props => {
  const {activeTab, onPressAlertButton} = props;
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
    <SafeAreaView
      style={{
        width: Dimensions.get('window').width,
        backgroundColor: '#E5E5E5',
        height: verticalScale(85),
        borderTopLeftRadius: responsiveBorderRadius(35),
        borderTopRightRadius: responsiveBorderRadius(35),
        alignItems: 'center',
        alignSelf: 'center',
        // position: 'absolute',
        // bottom: 0,
        elevation: 5,
        shadowColor: 'lightgray',
        shadowOffset: {width: 0, height: -5},
        shadowOpacity: 0.3,
        shadowRadius: 5,
        justifyContent: 'center',
      }}>
      <View
        style={{
          width: Dimensions.get('window').width,
          height: verticalScale(85),
          // marginHorizontal: pixelSizeHorizontal(30),
          paddingHorizontal: pixelSizeHorizontal(30),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate('Driver');
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#C5197D',
              width: SCREEN_HEIGHT * 0.06,
              height: SCREEN_HEIGHT * 0.06,
              borderRadius: (SCREEN_HEIGHT * 0.06) / 2,
            }}>
            <SafeDrop width={horizontalScale(24)} height={verticalScale(24)} />
          </TouchableOpacity>
          <Text
            style={{
              color: 'black',
              fontFamily: FontFamily.regular,
              fontSize: fontPixel(12),
            }}>
            Safe Drop
          </Text>
        </View>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginRight: pixelSizeHorizontal(-20),
          }}>
          <TouchableOpacity
          activeOpacity={0.7}
            onPress={onPressAlertButton}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: SCREEN_HEIGHT * 0.1,
              height: SCREEN_HEIGHT * 0.1,
              borderRadius: (SCREEN_HEIGHT * 0.1) / 2,
              backgroundColor: '#E5E5E5',
            }}>
            <Sos width={SCREEN_HEIGHT * 0.08} height={SCREEN_HEIGHT * 0.08} />
          </TouchableOpacity>
          <Text
            style={{
              color: 'black',
              fontFamily: FontFamily.semiBold,
              fontSize: fontPixel(14),
              marginBottom: pixelSizeVertical(5),
            }}>
            Alert!
          </Text>
        </View>

        {/*profile */}
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate('Profile');
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#C5197D',
              width: SCREEN_HEIGHT * 0.06,
              height: SCREEN_HEIGHT * 0.06,
              borderRadius: (SCREEN_HEIGHT * 0.06) / 2,
            }}>
            <MessageBox
              width={horizontalScale(20)}
              height={verticalScale(20)}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: 'black',
              fontFamily: FontFamily.regular,
              fontSize: fontPixel(12),
            }}>
            Connect driver
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserBottomTab;

const styles = StyleSheet.create({});
