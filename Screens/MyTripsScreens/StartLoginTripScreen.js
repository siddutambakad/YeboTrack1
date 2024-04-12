import {
  Alert,
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import StopTrip from '../../assets/images/stopTrip.svg';
import Bell from '../../assets/images/bellIcon.svg';
import Sos from '../../assets/images/sos.svg';
import Back from '../../assets/images/VectorBack.svg';
import {fontPixel, horizontalScale, verticalScale} from '../Utils/Dimensions';
import FontFamily from '../Styles/FontFamily';
import BottomTab from '../Components/BottomTab';
import RN from 'react-native';
import CustomModal from '../Components/Modal';
import Geolocation from '@react-native-community/geolocation';
import {
  convertedTime,
  convertedTimeforEvent,
  getCurrentLocation,
  getLocationName,
  openSettings,
  requestLocationPermission,
} from '../Utils/ReusableFunctions';
import axios from 'axios';
import {APIS} from '../APIURLS/ApiUrls';
import Loader from '../Components/Loader';

const SCREEN_HEIGHT = RN.Dimensions.get('window').height;

const StartLoginTripSCreen = ({navigation, route}) => {
  const {roasterId, roasterIdDays, driverId, driverNo, roasterRouteType} =
    route.params;
  console.log('roasterIdDays', roasterIdDays);

  // const formatTime = time => {
  //   const hours = time.getHours();
  //   const minutes = time.getMinutes();
  //   const amOrPm = hours >= 12 ? 'pm' : 'am';
  //   const formattedHours = hours % 12 || 12; // Convert 0 to 12
  //   const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  //   return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
  // };

  const [showOtpForStartTrip, setShowOtpForStartTrip] = useState(false);
  const [loader, setLoader] = useState(false);
  // const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState({
    isOtpError: false,
    otpErrorMessage: '',
  });
  const [otpResponse, setOtpResponse] = useState([]);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const sendStartOtp = async () => {
    setLoader(true);
    setOtpError({
      isOtpError: false,
      otpErrorMessage: '',
    });
    try {
      const currentLocation = await getCurrentLocation();
      const {latitude, longitude} = currentLocation;

      const locationName = await getLocationName(latitude, longitude);

      const sendStartOtpBody = {
        roasterId: roasterId,
        roasterDaysId: roasterIdDays,
        tripEventDtm: convertedTimeforEvent(),
        eventGpsdtm: convertedTime(),
        eventGpslocationLatLon: `${latitude},${longitude}`,
        eventGpslocationName: locationName,
        driverID: driverId,
        mobileNo: driverNo,
        roasterRouteType,
      };
      console.log(
        '\nsendStartOtpBody',
        JSON.stringify(sendStartOtpBody, null, 2),
        '\n',
      );
      const response = await axios.post(APIS.getStartTripOtp, sendStartOtpBody);
      console.log('\nresponse', JSON.stringify(response.data, null, 2), '\n');
      setOtpResponse(response.data?.returnLst);
      setShowOtpForStartTrip(true);
    } catch (error) {
      console.log(
        '\nError sending OTP:',
        JSON.stringify(error?.message, null, 2),
        '\n',
      );
      if (error.response.data.statusMessage === 'Record Exists') {
        setShowOtpForStartTrip(true);
      } else {
        setShowOtpForStartTrip(false);
      }
    } finally {
      setLoader(false);
    }
  };

  const validateOtp = async OTP => {
    setLoader(true);
    try {
      const currentLocation = await getCurrentLocation();
      const {latitude, longitude} = currentLocation;

      const locationName = await getLocationName(latitude, longitude);
      const validateOtpBody = {
        roasterId: otpResponse?.roasterId,
        idRoasterDays: otpResponse?.roasterDaysId,
        driverID: otpResponse?.driverID,
        mobileNo: otpResponse?.mobileNo,
        tripOtp: OTP,
        tripOdoMtrStart: '000000',
        tripStartGpsdtm: convertedTime(),
        tripStartGpslocationLatLon: `${latitude},${longitude}`,
        tripStartGpslocationName: locationName,
        roasterRouteType: roasterRouteType,
      };
      const apiUrl = `${APIS.validateStartTripOtp}`;
      console.log(
        '\nvalidateOtpBody',
        JSON.stringify(validateOtpBody, null, 2),
        '\n',
      );
      const responseData = await axios.post(apiUrl, validateOtpBody);
      console.log(
        '\nvalidateOtp',
        JSON.stringify(responseData.data, null, 2),
        '\n',
      );
      if (responseData.data.statusCode === 200) {
        setOtpError({
          isOtpError: false,
          otpErrorMessage: '',
        });
        navigation.navigate('MyTripDetail', {
          otpVerifiedForStartTripScreen: true,
          // starttripTime: formatTime(new Date()),
          tripId: responseData.data.returnLst?.tripId,
          guardId: responseData.data.returnLst?.guardId,
          idRoasterDays: responseData.data.returnLst?.idRoasterDays,
        });
        console.log(
          'tripId: responseData.data.returnLst?.tripId,',
          responseData.data.returnLst?.tripId,
        );
        setShowOtpForStartTrip(false);
      } else {
        setOtpError({
          isOtpError: true,
          otpErrorMessage: 'Incorrect Otp',
        });
      }
    } catch (error) {
      console.log(
        '\nError validateing OTP:',
        JSON.stringify(error?.message, null, 2),
        '\n',
      );
      setOtpError({
        isOtpError: true,
        otpErrorMessage: 'Incorrect Otp',
      });
    } finally {
      setLoader(false);
    }
  };

  // const requestLocationPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       getCurrentLocation();
  //     } else {
  //       console.log('Gallery permission denied');
  //       Alert.alert(
  //         'Alert!!',
  //         'Please grant gallery permission to use this feature.',
  //         [
  //           {
  //             text: 'Ask me Later',
  //           },
  //           {
  //             text: 'Cancel',
  //           },
  //           {
  //             text: 'OK',
  //             onPress: () => {
  //               openSettings();
  //             },
  //           },
  //         ],
  //         {cancelable: false},
  //       );
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  // const getCurrentLocation = () => {
  //   return new Promise((resolve, reject) => {
  //     Geolocation.getCurrentPosition(
  //       position => {
  //         const {latitude, longitude} = position.coords;
  //         resolve({latitude, longitude});
  //       },
  //       error => {
  //         console.log('Error getting current location:', error);
  //         reject(error);
  //       },
  //     );
  //   });
  // };
  // const getLocationName = async (latitude, longitude) => {
  //   try {
  //     const apiKey = 'AIzaSyAol1uOPzQnphvxtIatoLH-Ayw6OUwRpbA';
  //     const response = await axios.get(
  //       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`,
  //     );

  //     // Parse the response
  //     const {results} = response.data;
  //     if (results && results.length > 0) {
  //       // Extract the formatted address or other relevant information
  //       const locationName = results[0].formatted_address;
  //       return locationName;
  //     } else {
  //       return 'Unknown Location';
  //     }
  //   } catch (error) {
  //     console.error('Error fetching location:', error);
  //     return 'Unknown Location';
  //   }
  // };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <TouchableOpacity
            style={styles.backbutton}
            onPress={() => {
              navigation.goBack();
            }}>
            <Back width={horizontalScale(25)} height={verticalScale(25)} />
            <Text style={styles.backbuttonText}>My Trips</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.subMainHeader}>
          <TouchableOpacity style={{paddingRight: 20}}>
            <Sos width={horizontalScale(50)} height={verticalScale(50)} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            style={styles.bellButton}>
            <Bell width={horizontalScale(50)} height={verticalScale(50)} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.subContainer}>
        <View
          style={{
            flex: 0.6,
            justifyContent: 'flex-end',
            marginBottom: 60,
          }}>
          <View style={styles.startSubContainer}>
            <StopTrip width={horizontalScale(50)} height={verticalScale(50)} />
          </View>
          <Text
            style={{
              color: 'black',
              fontFamily: FontFamily.medium,
              fontSize: fontPixel(14),
              alignSelf: 'center',
              width: horizontalScale(150),
              textAlign: 'center',
            }}>
            You are about to start the trip!
          </Text>
        </View>
        <View style={{flex: 0.4, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              sendStartOtp();
            }}
            style={{
              width: horizontalScale(130),
              height: verticalScale(50),
              backgroundColor: 'rgba(197, 25, 125, 1)',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: FontFamily.regular,
                fontSize: fontPixel(14),
              }}>
              StartTrip
            </Text>
          </TouchableOpacity>

          <CustomModal
            visible={showOtpForStartTrip}
            title={'Enter Otp'}
            onClose={() => setShowOtpForStartTrip(false)}
            onPressSubmitButton={e => {
              // setOtp(e);
              validateOtp(e);
            }}
            onPressCancelButton={() => {
              setShowOtpForStartTrip(false);
            }}
            isOtpError={otpError.isOtpError}
            OTPErrorMessage={otpError.otpErrorMessage}
          />
        </View>
        <BottomTab activeTab="MyTrips" />
      </View>
      {loader && <Loader />}
    </SafeAreaView>
  );
};

export default StartLoginTripSCreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(102, 39, 110, 1)',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  backbutton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backbuttonText: {
    color: 'white',
    fontSize: fontPixel(18),
    paddingLeft: 20,
  },
  subMainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bellButton: {},
  subContainer: {
    flex: 1,
    backgroundColor: 'rgba(246, 246, 246, 1)',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  startSubContainer: {
    width: SCREEN_HEIGHT * 0.12,
    height: SCREEN_HEIGHT * 0.12,
    borderRadius: (SCREEN_HEIGHT * 0.12) / 2,
    backgroundColor: 'rgba(229, 229, 229, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
});
