import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  StatusBar,
  Platform,
  LogBox,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {APIS} from './APIURLS/ApiUrls';
import Loader from './Components/Loader';
import fontFamily from './Styles/FontFamily';
import {
  fontPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  responsiveBorderRadius,
  verticalScale,
} from './Utils/Dimensions';
import FontFamily from './Styles/FontFamily';

const LoginPage = ({navigation}) => {
  const {height, width, scale, fontScale} = Dimensions.get('window');
  LogBox.ignoreAllLogs();
  const StatusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight : 0;
  const imageAspectRatio = 20 / 9;
  const inputRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const [userDetails, setUserDetails] = useState({
    PhoneNumber: '9886768385',
  });

  const availableScreenHeight =
    height > 550
      ? width > 550
        ? height - StatusBarHeight
        : height
      : height - StatusBarHeight;

  const [errorMsg, setErrorMsg] = useState({
    PhoneNumber: '',
    ResponseError: '',
  });

  const [showError, setShowError] = useState({
    PhoneNumber: false,
  });

  const postLogin = () => {
    const postLoginData = {
      idVerifyOTP: 0,
      idUser: 0,
      mobileNo: userDetails.PhoneNumber,
      otp: 'string',
      validateOTP: true,
      validateOTPDT: '2024-03-05T06:31:17.871Z',
      otpRemark: 'string',
      loginSource: 0,
    };
    handleLoginWithOtp(postLoginData);
  };

  const handleLoginWithOtp = async postLoginData => {
    setLoader(true);
    try {
      const response = await axios.post(APIS.loginWithOtp, postLoginData);
      const otpResponse = response.data;
      // console.log('otp sent', otpResponse);
      navigation.navigate('Otp', {otpResponse: otpResponse});
    } catch (error) {
      if (error.response) {
        if (
          error?.response?.status === 500 ||
          error?.response?.status === 501
        ) {
          Alert.alert('Error', 'Server Error');
        } else {
          setErrorMsg({
            ...errorMsg,
            ResponseError: 'User Not Found',
          });
          console.log(error.response);
        }
      } else {
        Alert.alert('Warning!', 'No internet connection');
      }
    } finally {
      setLoader(false);
    }
  };

  const phoneNumberRegex = /^\d{10}$/;
  const handleButtonClick = () => {
    if (!phoneNumberRegex.test(userDetails.PhoneNumber)) {
      setErrorMsg({...errorMsg, PhoneNumber: 'Enter valid PhoneNumber'});
      setShowError({...showError, PhoneNumber: true});
    } else {
      setShowError({
        ...showError,
        PhoneNumber: false,
      });
      postLogin();
    }
  };

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: 'red'}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View
            style={[
              styles.subContainer,
              {height: availableScreenHeight * 0.7},
            ]}>
            <Image
              source={require('../assets/images/yeboFinalLogo.png')}
              style={styles.yebologo}
            />
            <Text style={styles.phoneNumberText}>Phone Number</Text>
            <View style={styles.phoneNumberAndTextInput}>
              <Text style={styles.countryText}>+91</Text>
              <TextInput
                ref={inputRef}
                onFocus={handleFocus}
                style={styles.phoneNumberInput}
                maxLength={10}
                keyboardType="number-pad"
                onChangeText={e => {
                  setUserDetails({
                    ...userDetails,
                    PhoneNumber: e,
                  });
                  setShowError({
                    ...showError,
                    PhoneNumber: false,
                  });
                  setErrorMsg({...errorMsg, ResponseError: ''});
                }}
                onBlur={() => {
                  if (!phoneNumberRegex.test(userDetails.PhoneNumber)) {
                    setErrorMsg({
                      ...errorMsg,
                      PhoneNumber: 'Enter valid PhoneNumber',
                    });
                    setShowError({
                      ...showError,
                      PhoneNumber: true,
                    });
                  }
                }}
                value={userDetails.PhoneNumber}
              />
            </View>
            {showError.PhoneNumber && (
              <Text style={styles.errorText}>
                {errorMsg.PhoneNumber}
                {errorMsg.ResponseError ? ` ${errorMsg.ResponseError}` : ''}
              </Text>
            )}
            <TouchableOpacity
              onPress={() => {
                handleButtonClick();
              }}
              style={styles.getOtpButton}>
              <Text style={styles.getOtpText}>Generate OTP</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: availableScreenHeight * 0.3,
              justifyContent: 'flex-end',
            }}>
            <Image
              source={require('../assets/images/bottomImage.png')}
              style={{
                width: '100%',
                height: width / imageAspectRatio,
                objectFit: 'contain',
              }}
            />
          </View>
          {loader && <Loader />}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  subContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  yebologo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    // marginTop: pixelSizeVertical(80),
  },
  phoneNumberText: {
    marginHorizontal: 20,
    marginVertical: 8,
    fontFamily: FontFamily.medium,
    fontSize: fontPixel(16),
    color: '#65276F',
  },
  phoneNumberAndTextInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  phoneNumberInput: {
    width: '80%',
    height: verticalScale(55),
    backgroundColor: '#EFEFEF',
    borderTopRightRadius: responsiveBorderRadius(8),
    borderBottomRightRadius: responsiveBorderRadius(8),
    paddingLeft: 10,
    color: '#65276F',
    fontSize: fontPixel(16),
  },
  countryText: {
    width: '20%',
    backgroundColor: 'lightgray',
    height: verticalScale(55),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'black',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    fontSize: fontPixel(16),
  },
  getOtpButton: {
    backgroundColor: '#C5197D',
    width: '40%',
    height: verticalScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: pixelSizeVertical(30),
    borderRadius: 8,
  },
  getOtpText: {
    color: 'white',
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(15),
  },
  // imageContainer: {
  //   flex: 0.35,
  //   justifyContent: 'flex-end',
  // },
  bottomImage: {},
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginHorizontal: pixelSizeHorizontal(20),
    fontFamily: FontFamily.regular,
  },
});
