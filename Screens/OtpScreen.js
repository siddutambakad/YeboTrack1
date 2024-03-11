import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import YeboLogo from '../assets/images/yeboFinalLogo.svg';
import Check from '../assets/images/check.svg';
import CheckCircle from '../assets/images/checked.svg';
import CheckBox from '../assets/images/checkBox.svg';
import Loader from './Components/Loader';
import {APIS} from './APIURLS/ApiUrls';
import fontFamily from './Styles/FontFamily';
import {verticalScale} from './Utils/Dimensions';
import axios from 'axios';

const OtpScreen = ({navigation, route}) => {
  const {otpResponse} = route.params;
  const [selectedOption, setSelectedOption] = useState(false);
  const [loader, setLoader] = useState(false);
  const [userDetails, setUserDetails] = useState({
    otp: '',
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

  const verifyOtp = () => {
    const verifyData = {
      idVerifyOTP: otpResponse.idVerifyOTP,
      idUser: otpResponse.idUser,
      mobileNo: otpResponse.mobileNo,
      otp: userDetails.otp,
      validateOTP: false,
      validateOTPDT: otpResponse.validateOTPDT,
      otpRemark: otpResponse.otpRemark,
      loginSource: otpResponse.loginSource,
    };
    // console.log(verifyData);
    handleVerifyOtp(verifyData);
  };
  const handleVerifyOtp = async verifyData => {
    setLoader(true);
    try {
      const response = await axios.post(APIS.verifyOtp, verifyData);
      const res_ponse = response.data;
      console.log('verified', res_ponse);
      navigation.navigate('Driver');
    } catch (error) {
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
  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <YeboLogo width={100} height={100} />
          <Text style={styles.vertifyotpText}>Verify OTP</Text>
          <View style={styles.otpSent}>
            <CheckCircle />
            <Text style={styles.otpText}>
              OTP has been sent to your mobile.
            </Text>
          </View>
          <TextInput
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
            onBlur={() => {
              if (!otpRegex.test(userDetails.otp)) {
                setErrorMsg({
                  ...errorMsg,
                  otp: 'Enter valid otp',
                });
                setShowError({
                  ...showError,
                  otp: true,
                });
              } else {
                setErrorMsg({
                  ...errorMsg,
                  otp: '',
                });
                setShowError({
                  ...showError,
                  otp: false,
                });
              }
            }}
            value={userDetails.otp}
          />
          {showError.otp && (
            <Text style={styles.errorText}>{errorMsg.otp}</Text>
          )}
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
              <View style={styles.checkbox}>{selectedOption && <Check />}</View>
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
          <TouchableOpacity style={styles.resendButton}>
            <Text style={styles.resendOtpText}>Resend OTP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleButtonClick();
            }}
            style={styles.verifyotpButton}>
            <Text style={styles.verifyOtp}>Verify OTP</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/securityGuard.png')}
            style={styles.image}
          />
        </View>
      </View>
      {loader && <Loader />}
    </ScrollView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  subContainer: {
    alignItems: 'center',
    marginVertical: 20,
    flex: 0.7,
    justifyContent: 'center',
  },
  vertifyotpText: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: '#65276F',
  },
  otpSent: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  otpInput: {
    backgroundColor: '#EFEFEF',
    width: '70%',
    paddingLeft: 20,
    marginBottom: 15,
    color: '#65276F',
  },
  termsAndConditionText: {
    textDecorationLine: 'underline',
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: '#65276F',
  },
  checkbox: {
    width: 18,
    height: 18,
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
    fontSize: 16,
    fontFamily: fontFamily.medium,
    paddingHorizontal: 8,
  },
  resendButton: {
    width: '40%',
    height: verticalScale(45),
    backgroundColor: '#C5197D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 25,
    marginBottom: 15,
  },
  verifyotpButton: {
    width: '40%',
    height: verticalScale(45),
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
  },
  verifyOtp: {
    color: 'white',
    fontFamily: fontFamily.regular,
  },
  imageContainer: {
    flex: 0.34,
    justifyContent: 'flex-end',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  errorText: {
    color: 'red',
    fontFamily: fontFamily.regular,
    alignSelf: 'center',
  },
});
