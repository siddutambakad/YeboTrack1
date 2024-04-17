import {
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import StopTrip from '../../assets/images/stopTrip.svg';
import Bell from '../../assets/images/bellIcon.svg';
import Sos from '../../assets/images/sos.svg';
import Back from '../../assets/images/VectorBack.svg';
import {
  fontPixel,
  horizontalScale,
  responsiveBorderRadius,
  verticalScale,
} from '../Utils/Dimensions';
import FontFamily from '../Styles/FontFamily';
import BottomTab from '../Components/BottomTab';
import RN from 'react-native';
import {actuatedNormalize} from '../Utils/PixelScaling';
import CustomModal from '../Components/Modal';
import {APIS} from '../APIURLS/ApiUrls';
import {
  convertedTime,
  convertedTimeforEvent,
  getCurrentLocation,
  getLocationName,
  requestLocationPermission,
} from '../Utils/ReusableFunctions';
import axios from 'axios';
import Loader from '../Components/Loader';
const SCREEN_HEIGHT = RN.Dimensions.get('window').height;

const StopTripScreen = ({navigation, route}) => {
  const {roasterId, tripId, idRoasterDays, driverId, mobileNo} = route.params;
  console.log(
    'roasterId',
    roasterId,
    'tripId:',
    tripId,
    'idRoasterDays',
    idRoasterDays,
    'driverId',
    driverId,
    'mobileNo',
    mobileNo,
  );
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpError, setOtpError] = useState({
    isOtpError: false,
    otpErrorMessage: '',
  });
  const [loader, setLoader] = useState(false);

  const sendOtpForEndTrip = async () => {
    setLoader(true);
    setOtpError({
      isOtpError: false,
      otpErrorMessage: '',
    });
    try {
      await requestLocationPermission();
      const currentLocation = await getCurrentLocation();
      const {latitude, longitude} = currentLocation;

      const locationName = await getLocationName(latitude, longitude);
      const apiUrl = `${APIS.sendTripEndOtp}`;
      const endTripRequestBody = {
        roasterId: roasterId,
        tripId: tripId,
        idRoasterDays: idRoasterDays,
        tripEventDtm: convertedTimeforEvent(),
        eventGpsdtm: convertedTime(),
        eventGpslocationLatLon: `${latitude},${longitude}`,
        eventGpslocationName: locationName,
        driverID: driverId,
        mobileNo: mobileNo,
      };
      console.log(
        '\nendTripRequestBody:',
        JSON.stringify(endTripRequestBody, null, 2),
        '\n',
      );
      const response = await axios.post(apiUrl, endTripRequestBody);
      console.log(
        '\nresponse:',
        JSON.stringify(response.data.returnLst, null, 2),
        '\n',
      );
      setShowOtpModal(true);
    } catch (error) {
      console.log('\nerror:', JSON.stringify(error, null, 2), '\n');
    } finally {
      setLoader(false);
    }
  };

  const validateEndTripOtp = async OTP => {
    setLoader(true);
    try {
      await requestLocationPermission();
      const currentLocation = await getCurrentLocation();
      const {latitude, longitude} = currentLocation;
      const locationName = await getLocationName(latitude, longitude);
      const apiUrl = `${APIS.validateTripEndOtp}`;
      const requestEndTripBody = {
        roasterId: roasterId,
        idRoasterDay: idRoasterDays,
        tripId: tripId,
        driverID: driverId,
        mobileNo: mobileNo,
        tripOtp: OTP,
        tripEndOdoMtr: '00000',
        tripEndGpsdtm: convertedTime(),
        tripEndGpslocationLatLon: `${latitude},${longitude}`,
        tripEndGpslocationName: locationName,
      };
      console.log(
        '\nrequestEndTripBody:',
        JSON.stringify(requestEndTripBody, null, 2),
        '\n',
      );
      const response = await axios.post(apiUrl, requestEndTripBody);
      console.log(
        '\nresponse:',
        JSON.stringify(response.data.returnLst, null, 2),
        '\n',
      );
      if (response.data.statusCode === 200) {
        setOtpError({
          isOtpError: false,
          otpErrorMessage: '',
        });
        navigation.navigate('Recent');
        setShowOtpModal(false);
      } else {
        setOtpError({
          isOtpError: true,
          otpErrorMessage: 'Incorrect Otp',
        });
      }
    } catch (error) {
      console.log('\nerror:', JSON.stringify(error, null, 2), '\n');
      setOtpError({
        isOtpError: true,
        otpErrorMessage: 'Incorrect Otp',
      });
    } finally {
      setLoader(false);
    }
  };

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
            <Sos width={actuatedNormalize(40)} height={actuatedNormalize(40)} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            style={styles.bellButton}>
            <Bell
              width={actuatedNormalize(40)}
              height={actuatedNormalize(40)}
              fill={'#C5197D'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.subContainer}>
        <View style={styles.stopTripAndImage}>
          <View style={styles.startSubContainer}>
            <StopTrip
              width={actuatedNormalize(50)}
              height={actuatedNormalize(50)}
            />
          </View>
          <Text style={styles.stopTripText}>
            You are about to stop the trip!
          </Text>
        </View>
        <View style={{flex: 0.4, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              sendOtpForEndTrip();
            }}
            style={styles.endTripButton}>
            <Text style={styles.endtripText}>End Trip</Text>
          </TouchableOpacity>
          <CustomModal
            visible={showOtpModal}
            onClose={() => {
              setShowOtpModal(false);
            }}
            onPressSubmitButton={e => {
              validateEndTripOtp(e);
              setShowOtpModal(false);
            }}
            onPressCancelButton={() => {
              setShowOtpModal(false);
            }}
            title={'Enter otp For End Trip'}
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

export default StopTripScreen;

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
  subContainer: {
    flex: 1,
    backgroundColor: 'rgba(246, 246, 246, 1)',
    borderTopLeftRadius: responsiveBorderRadius(50),
    borderTopRightRadius: responsiveBorderRadius(50),
  },
  startSubContainer: {
    width: actuatedNormalize(100),
    height: actuatedNormalize(100),
    borderRadius: responsiveBorderRadius(100),
    backgroundColor: 'rgba(229, 229, 229, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  stopTripAndImage: {
    flex: 0.6,
    justifyContent: 'flex-end',
    marginBottom: 60,
  },
  stopTripText: {
    color: 'black',
    fontFamily: FontFamily.medium,
    fontSize: fontPixel(16),
    alignSelf: 'center',
    width: horizontalScale(150),
    textAlign: 'center',
  },
  endTripButton: {
    width: horizontalScale(130),
    height: verticalScale(50),
    backgroundColor: 'rgba(197, 25, 125, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  endtripText: {
    color: 'white',
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(14),
  },
});
