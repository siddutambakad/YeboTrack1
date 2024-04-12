import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import React, {useContext, useRef, useState} from 'react';
import Check from '../assets/images/check.svg';
import CheckCircle from '../assets/images/checked.svg';
import Loader from './Components/Loader';
import {APIS} from './APIURLS/ApiUrls';
import fontFamily from './Styles/FontFamily';
import {
  fontPixel,
  horizontalScale,
  pixelSizeHorizontal,
  pixelSizeVertical,
  verticalScale,
} from './Utils/Dimensions';
import axios from 'axios';
import {AppContext} from './Context/AppContext';
import RN from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SCREEN_HEIGHT = RN.Dimensions.get('window').height;

const OtpScreen = ({navigation, route}) => {
  const {height, width} = Dimensions.get('window');
  const imageAspectRatio = 20.5 / 9;
  const {otpResponse} = route.params;
  const [otpData, setOtpData] = useState(otpResponse);
  const [selectedOption, setSelectedOption] = useState(false);
  const [loader, setLoader] = useState(false);
  const {handleLogin} = useContext(AppContext);
  const inputRef = useRef(null);

  const [userDetails, setUserDetails] = useState({
    // otp: '',
    otp: otpData.otp,
    termsAndCondition: '',
  });

  const [errorMsg, setErrorMsg] = useState({
    otp: '',
    termsAndCondition: '',
    ResponseError: '',
  });

  const [showError, setShowError] = useState({
    otp: false,
    termsAndCondition: false,
  });

  const resendOtp = () => {
    const resendOtpData = {
      idVerifyOTP: 0,
      idUser: 0,
      mobileNo: otpData.mobileNo,
      otp: 'string',
      validateOTP: true,
      validateOTPDT: '2024-03-05T06:31:17.871Z',
      otpRemark: 'string',
      loginSource: 0,
    };
    handleResendOtp(resendOtpData);
  };

  const handleResendOtp = async resendOtpData => {
    console.log('====>>', resendOtpData);
    setLoader(true);
    try {
      const response = await axios.post(APIS.loginWithOtp, resendOtpData);
      const otpResponse = response.data;
      console.log('otp sent', otpResponse);
      setOtpData(otpResponse);
      if (response.status === 200) {
        Alert.alert('Success', 'OTP has been resent successfully');
      }
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

  const verifyOtp = () => {
    const verifyData = {
      idVerifyOTP: otpData.idVerifyOTP,
      idUser: otpData.idUser,
      mobileNo: otpData.mobileNo,
      // otp: userDetails.otp,
      otp: otpData.otp,
      validateOTP: false,
      validateOTPDT: otpData.validateOTPDT,
      otpRemark: otpData.otpRemark,
      loginSource: otpData.loginSource,
    };
    // console.log(verifyData);
    handleVerifyOtp(verifyData);
  };
  const handleVerifyOtp = async verifyData => {
    setLoader(true);
    try {
      const response = await axios.post(APIS.verifyOtp, verifyData);
      const res_ponse = response.data;
      // console.log('verified', res_ponse);
      
      if (res_ponse?.userRoleDesc === 'Driver') {
        // setDriverId(res_ponse.idDriver)
        await setUserData(res_ponse);
        let ck = setTimeout(() => {
          navigation.navigate('Driver');
          // navigation.navigate('Home');
          clearTimeout(ck);
        }, 800);
      } else {
        navigation.navigate('Home');
      }
      handleLogin();
    } catch (error) {
      console.log('error', error);
      if (error.response) {
        if (
          error?.response?.status === 500 ||
          error?.response?.status === 501
        ) {
          Alert.alert('Error', 'Something went wrong');
        } else {
          setErrorMsg({
            ...errorMsg,
            ResponseError: error.response.data,
          });
          console.log(error?.response.data);
        }
      } else {
        Alert.alert('Warning!', 'No internet connection');
      }
    } finally {
      setLoader(false);
    }
  };

  const otpRegex = /^\d{6}$/;
  const handleButtonClick = () => {
    if (!otpRegex.test(userDetails.otp)) {
      setErrorMsg({...errorMsg, otp: 'Enter valid otp'});
      setShowError({...showError, otp: true});
    } else if (!selectedOption) {
      setErrorMsg({
        ...errorMsg,
        termsAndCondition: 'Please agree to terms and conditions',
      });
      setShowError({...showError, termsAndCondition: true});
    } else {
      setShowError({
        ...showError,
        otp: false,
        termsAndCondition: false,
      });
      verifyOtp();
    }
  };

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const setUserData = async userData => {
    try {
      await AsyncStorage.setItem('otpResponseData', JSON.stringify(userData));
      console.log('otpResponseData saved successfully');
    } catch (error) {}
  };
  return (
    <ScrollView
      style={{height: Dimensions.get('window').height, backgroundColor: 'red'}}>
      <View style={styles.container}>
        <Image
          source={require('../assets/images/yeboFinalLogo.png')}
          style={styles.yebologo}
        />
        <Text style={styles.vertifyotpText}>Verify OTP</Text>
        <View style={styles.otpSent}>
          <CheckCircle />
          <Text style={styles.otpSentText}>
            OTP has been sent to your mobile.
          </Text>
        </View>
        <TextInput
          ref={inputRef}
          onFocus={() => {
            handleFocus();
          }}
          style={styles.otpInput}
          placeholder="Enter otp"
          placeholderTextColor={'#A9A9A9'}
          maxLength={6}
          keyboardType="number-pad"
          onChangeText={e => {
            setUserDetails({
              ...userDetails,
              otp: e,
            });
            setShowError({
              ...showError,
              otp: false,
            });
          }}
          value={userDetails.otp}
        />
        {showError.otp && <Text style={styles.errorText}>{errorMsg.otp}</Text>}
        {errorMsg.ResponseError ? (
          <Text style={styles.errorText}>{errorMsg.ResponseError}</Text>
        ) : null}
        <View style={styles.otpSentButton}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setSelectedOption(!selectedOption);
              setShowError({
                ...showError,
                termsAndCondition: false,
              });
            }}>
            <View style={styles.checkbox}>
              {selectedOption && (
                <Check width={horizontalScale(10)} height={verticalScale(10)} />
              )}
            </View>
          </TouchableOpacity>
          <Text style={styles.otpText}>
            I agree to the{' '}
            <Text style={styles.termsAndConditionText}>
              terms and conditions
            </Text>
          </Text>
        </View>
        {showError.termsAndCondition && (
          <Text style={styles.errorText}>{errorMsg.termsAndCondition}</Text>
        )}
        <TouchableOpacity
          style={styles.resendButton}
          onPress={() => {
            resendOtp();
          }}>
          <Text style={styles.resendOtpText}>Resend OTP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleButtonClick();
          }}
          style={styles.verifyotpButton}>
          <Text style={styles.verifyOtp}>Verify OTP</Text>
        </TouchableOpacity>
        <Image
          source={require('../assets/images/bottomImage.png')}
          style={{
            width: '100%',
            height: width / imageAspectRatio,
            objectFit: 'contain',
            position: 'absolute',
            bottom: 0
          }}
        />
      </View>
      {loader && <Loader />}
    </ScrollView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: Dimensions.get('window').height,
    alignItems: 'center',
  },
  subContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  vertifyotpText: {
    fontSize: fontPixel(16),
    fontFamily: fontFamily.regular,
    color: '#65276F',
  },
  otpSent: {
    flexDirection: 'row',
    marginVertical: pixelSizeVertical(20),
    alignItems: 'center',
  },
  otpInput: {
    backgroundColor: '#EFEFEF',
    width: horizontalScale(350),
    height: verticalScale(55),
    paddingLeft: 20,
    marginBottom: pixelSizeVertical(15),
    color: '#65276F',
    borderRadius: 5,
    fontSize: fontPixel(14),
  },
  termsAndConditionText: {
    textDecorationLine: 'underline',
    fontSize: fontPixel(16),
    fontFamily: fontFamily.regular,
    color: '#65276F',
  },
  checkbox: {
    width: SCREEN_HEIGHT * 0.026,
    height: SCREEN_HEIGHT * 0.026,
    borderWidth: 1,
    borderColor: '#65276F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpSentButton: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpText: {
    color: '#65276F',
    fontSize: fontPixel(16),
    fontFamily: fontFamily.medium,
    paddingHorizontal: pixelSizeHorizontal(8),
  },
  otpSentText: {
    color: '#65276F',
    fontSize: fontPixel(16),
    fontFamily: fontFamily.medium,
    paddingHorizontal: 8,
  },
  resendButton: {
    width: horizontalScale(170),
    height: verticalScale(55),
    backgroundColor: '#C5197D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: pixelSizeVertical(25),
    marginBottom: pixelSizeVertical(15),
  },
  verifyotpButton: {
    width: horizontalScale(170),
    height: verticalScale(55),
    backgroundColor: '#454546',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 15,
  },
  resendOtpText: {
    color: 'white',
    fontFamily: fontFamily.regular,
    fontSize: fontPixel(14),
  },
  verifyOtp: {
    color: 'white',
    fontFamily: fontFamily.regular,
    fontSize: fontPixel(14),
  },
  errorText: {
    color: 'red',
    fontFamily: fontFamily.regular,
    alignSelf: 'center',
    fontSize: fontPixel(13),
  },
  yebologo: {
    width: horizontalScale(80),
    height: verticalScale(80),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: '15%',
  },
});
