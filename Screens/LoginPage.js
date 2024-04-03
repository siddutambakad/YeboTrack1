import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Dimensions,
  // LogBox,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {APIS} from './APIURLS/ApiUrls';
import Loader from './Components/Loader';
import fontFamily from './Styles/FontFamily';
import {
  fontPixel,
  horizontalScale,
  pixelSizeHorizontal,
  pixelSizeVertical,
  responsiveBorderRadius,
  verticalScale,
} from './Utils/Dimensions';
import FontFamily from './Styles/FontFamily';

const LoginPage = ({navigation}) => {
  // LogBox.ignoreAllLogs();
  const imageAspectRatio = 20 / 9;
  const [loader, setLoader] = useState(false);
  const [userDetails, setUserDetails] = useState({
    PhoneNumber: '9886768385',
  });

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
      console.log(
        '\notpResponse',
        JSON.stringify(otpResponse, null, 2),
        '\n',
      );
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

  return (

    <ScrollView
      style={{
        height: Dimensions.get('window').height,
        backgroundColor: 'red',
      }}>
      <View
        style={{
          backgroundColor: '#fff',
          height: Dimensions.get('window').height,
        }}>
        <Image
          source={require('../assets/images/yeboFinalLogo.png')}
          style={styles.yebologo}
        />

        <Text style={styles.phoneNumberText}>Phone Number</Text>
        <View style={styles.phoneNumberAndTextInput}>
          <View style={styles.countriesText}>
          <Text style={styles.countryText}>+91</Text>
          </View>
          <TextInput
            // ref={inputRef}
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
          <Text style={styles.errorText}>{errorMsg.PhoneNumber}</Text>
        )}
        {errorMsg.ResponseError ? (
          <Text style={styles.errorText}>{errorMsg.ResponseError}</Text>
        ) : null}
        <TouchableOpacity
          onPress={() => {
            handleButtonClick();
          }}
          style={styles.getOtpButton}>
          <Text style={styles.getOtpText}>Generate OTP</Text>
        </TouchableOpacity>
        <Image
          source={require('../assets/images/bottomImage.png')}
          style={{
            width: '100%',
            height: Dimensions.get('window').width / imageAspectRatio,
            objectFit: 'contain',
            position: 'absolute',
            bottom: 0,
          }}
        />
      </View>
      {loader && <Loader />}
    </ScrollView>
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
    width: horizontalScale(80),
    height: verticalScale(80),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: '30%',
  },
  phoneNumberText: {
    marginHorizontal: pixelSizeHorizontal(20),
    marginVertical: 8,
    fontFamily: FontFamily.medium,
    fontSize: fontPixel(16),
    color: '#65276F',
  },
  phoneNumberAndTextInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: pixelSizeHorizontal(20),
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
  countriesText: {
    width: '20%',
    backgroundColor: 'lightgray',
    height: verticalScale(55),
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countryText: {
    color: 'black',
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
  bottomImage: {},
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    paddingLeft: pixelSizeHorizontal(20),
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(14)
  },
});
