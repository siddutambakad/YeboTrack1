import {
  Alert,
  Dimensions,
  Linking,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Back from '../../assets/images/VectorBack.svg';
import Sos from '../../assets/images/sos.svg';
import Bell from '../../assets/images/bellIcon.svg';
import StartTripImage from '../../assets/images/startTripCar1.svg';
import {
  fontPixel,
  horizontalScale,
  pixelSizeHorizontal,
  pixelSizeVertical,
  responsiveBorderRadius,
  verticalScale,
} from '../Utils/Dimensions';
import FontFamily from '../Styles/FontFamily';
import Check from '../../assets/images/check.svg';
import PickupGuardModal from '../Components/PickupGuardModal';
import ConformationModal from '../Components/ConformationModal';
import CustomModal from '../Components/Modal';
import StartTripModal from '../Components/StartTripModal';
import BottomTab from '../Components/BottomTab';
import StepIndicator from 'react-native-step-indicator-v2';
import RN from 'react-native';
import {APIS} from '../APIURLS/ApiUrls';
import axios from 'axios';
import Loader from '../Components/Loader';
import {
  convertedTime,
  convertedTimeforEvent,
  getCurrentLocation,
  getLocationName,
  openSettings,
  requestLocationPermission,
} from '../Utils/ReusableFunctions';
import Geolocation from '@react-native-community/geolocation';

const SCREEN_HEIGHT = RN.Dimensions.get('window').height;

const MyTripDetails = ({route, navigation}) => {
  const {
    resumeOngoingTrip,
    idRoasterDays,
    driveOfficeOtp,
    driveOfficeTime,
    stopTrip,
    stopTripTime,
    otpVerified,
    clickedTime,
    driverContactNo,
    roastertype,
    otpVerifiedForStartTripScreen,
    tripId,
    guardId,
    // items,
  } = route.params;
  // console.log("🚀 ~ MyTripDetails---------->>>>>>>>> ~ items:", items)
  console.log('🚀 ~ MyTripDetails ~ tripId:', tripId);

  const [showStartTripModal, setShowStartTripModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [modalPopupOptions, setModalPopupOptions] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [time, setTimes] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(0);
  const [pickupEmployeeCompleted, setPickupEmployeeCompleted] = useState(false);
  const [loader, setLoader] = useState(true);
  const [pickupGuard, setPickupGuard] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [responseInfo, setResponseInfo] = useState([]);
  const [otpError, setOtpError] = useState({
    isOtpError: false,
    otpErrorMessage: '',
  });
  const [otpValidateResponse, setOtpValidateResponse] = useState([]);
  console.log('🚀 ~ MyTripDetails ~ otpValidateResponse:', otpValidateResponse);

  useEffect(() => {
    if (driveOfficeOtp) {
      setSelectedPosition(4);
      // time.push(driveOfficeTime);
    } else if (otpVerified) {
      // time.push(clickedTime);
      setSelectedPosition(3);
    } else if (stopTrip) {
      setSelectedPosition(5);
      // time.push(stopTripTime);
    } else if (otpVerifiedForStartTripScreen) {
      setShowStartTripModal(true);
    }
  }, [
    driveOfficeOtp,
    otpVerified,
    stopTrip,
    otpVerifiedForStartTripScreen,
    resumeOngoingTrip,
  ]);

  useEffect(() => {
    if (resumeOngoingTrip) {
      getTripDetails(idRoasterDays);
    }
  }, [resumeOngoingTrip]);

  useEffect(() => {
    getTripDetails(idRoasterDays);
  }, [idRoasterDays]);

  const stepperPointChanger = tripDetail => {
    const dt = new Map([
      ['Not-Started', 0],
      ['Trip-Start', 1],
      ['Guard-Check-In', 2],
      ['Onboarding Completed', 3],
      ['Trip-End', 4],
    ]);
    setSelectedPosition(dt.get(tripDetail?.tripStatusDesc));

    if (dt.get(tripDetail?.tripStatusDesc) >= 3) {
      setPickupEmployeeCompleted(true);
    }
  };

  const getTripDetails = async idRoasterDays => {
    setLoader(true);
    try {
      const apiUrl = `${APIS.getTripDeatils}/${idRoasterDays}`;
      const response = await axios.get(apiUrl);
      const responseData = response?.data;
      stepperPointChanger(responseData?.returnLst?.tripDetail);
      setResponseInfo(responseData?.returnLst);
      setPickupGuard(responseData?.returnLst?.roasterGuardDetail);
      setEmployeeDetails(responseData?.returnLst?.roasterEmpDetails);
    } catch (error) {
      console.log('error from the tripdetail', error);
    } finally {
      setLoader(false);
    }
  };

  const sendOtpForGuard = async () => {
    setLoader(true);
    setOtpError({
      isOtpError: false,
      otpErrorMessage: '',
    });
    await requestLocationPermission();
    try {
      const currentLocation = await getCurrentLocation();
      const {latitude, longitude} = currentLocation;

      const locationName = await getLocationName(latitude, longitude);
      const apiUrl = `${APIS.sendOtpForGuard}`;
      const requestBodyForGuard = {
        roasterId: responseInfo?.idRoaster,
        tripId: resumeOngoingTrip ? responseInfo.tripDetail?.idTrip : tripId,
        idRoasterDays: idRoasterDays,
        tripEventDtm: convertedTimeforEvent(),
        eventGpsdtm: convertedTime(),
        eventGpslocationLatLon: `${latitude},${longitude}`,
        eventGpslocationName: locationName,
        guardID: resumeOngoingTrip ? pickupGuard?.idGuard : guardId,
        mobileNo: pickupGuard?.mobileNo,
      };
      console.log(
        '\nsendrequestBodyForGuard:',
        JSON.stringify(requestBodyForGuard, null, 2),
        '\n',
      );

      axios
        .post(apiUrl, requestBodyForGuard)
        .then(response => {
          console.log('===response', JSON.stringify(response, null, 2));
          setOtpValidateResponse(response.data?.returnLst);
          setShowOtpModal(true);
        })
        .catch(error => {
          if (error?.response) {
            console.log(
              '===rerror1',
              JSON.stringify(error?.response?.data, null, 2),
            );
            if (error?.response?.data?.statusMessage === 'Record Exists') {
              setOtpValidateResponse(error?.response?.data?.returnLst);
              setShowOtpModal(true);
            }
          }
        });
    } catch (error) {
    } finally {
      setLoader(false);
    }
  };

  const validateOtpForGuard = async Otp => {
    setLoader(true);
    try {
      await requestLocationPermission();
      const currentLocation = await getCurrentLocation();
      const {latitude, longitude} = currentLocation;

      const locationName = await getLocationName(latitude, longitude);

      const apiUrl = `${APIS.validateOtpForGuard}`;
      const requestBodyForGuard = {
        tripId: otpValidateResponse?.tripId,
        roasterId: otpValidateResponse?.idRoaster,
        idRoasterDays: idRoasterDays,
        guardID: otpValidateResponse?.guardId,
        mobileNo: otpValidateResponse?.mobileNo,
        tripOtp: Otp,
        guardOTPGPSDTM: convertedTime(),
        guardOTPGPSLocationLatLon: `${latitude},${longitude}`,
        guardOTPGPSLocationName: locationName,
      };
      console.log(
        '\notprequestBodyForGuard:',
        JSON.stringify(requestBodyForGuard, null, 2),
        '\n',
      );
      const response = await axios.post(apiUrl, requestBodyForGuard);
      console.log('response===>', response);
      if (response.data.statusCode === 200) {
        setOtpError({
          isOtpError: false,
          otpErrorMessage: '',
        });
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

  const handlePickupGuardClick = () => {
    setModalPopupOptions({
      button_text: 'Guard Check - In',
      button_action: () => {
        setShowModal(false);
        // setShowOtpModal(true);
        sendOtpForGuard();
      },
      isSocialMediaRequired: false,
    });
    requestLocationPermission();
    setShowModal(true);
  };

  const handlePickupEmployeeClick = () => {
    setPickupEmployeeCompleted(true);
    navigation.navigate('PickUp', {
      employeeDetail: employeeDetails,
      tripId: tripId,
      tripType: responseInfo?.tripDetail?.tripType
    });
  };

  const handleEndTripClick = () => {
    navigation.navigate('StopTrip', {
      roasterId: responseInfo?.idRoaster,
      tripId: tripId,
      tripId: responseInfo?.tripDetail?.idTrip,
      idRoasterDays: idRoasterDays,
      driverId: responseInfo?.idDriver,
      mobileNo: driverContactNo,
    });
  };

  const handleStartTrip = () => {
    // setShowStartTripModal(true);
    navigation.navigate('StartTripLogin', {
      roasterId: responseInfo?.idRoaster,
      roasterIdDays: idRoasterDays,
      driverId: responseInfo?.idDriver,
      driverNo: driverContactNo,
      roasterRouteType: roastertype,
    });
  };

  const labels = [
    'Start Trip',
    'Pickup Guard',
    'Pickup Employee',
    // 'Drive To office',
    'End Trip',
  ];
  const customStyles = {
    stepIndicatorSize: 26,
    currentStepIndicatorSize: 26,
    separatorStrokeWidth: 5,
    currentStepStrokeWidth: 0,
    stepStrokeCurrentColor: 'lightgray',
    stepStrokeWidth: 0,
    stepStrokeFinishedColor: 'gray',
    stepStrokeUnFinishedColor: 'lightgray',
    separatorFinishedColor: 'gray',
    separatorUnFinishedColor: 'lightgray',
    stepIndicatorFinishedColor: 'gray',
    stepIndicatorUnFinishedColor: 'lightgray',
    stepIndicatorCurrentColor: selectedPosition ? 'gray' : 'lightgray',
    stepIndicatorLabelFontSize: 0,
    currentStepIndicatorLabelFontSize: 0,
    labelColor: '#000',
    labelSize: fontPixel(14),
    labelFontFamily: FontFamily.medium,
    currentStepLabelColor: '#000',
    borderRadiusSize: 20,
    labelAlign: 'flex-start',
  };
  //Using an array of functions
  const stepActions = [
    handleStartTrip,
    handlePickupGuardClick,
    handlePickupEmployeeClick,
    handleEndTripClick,
  ];

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <View>
          <TouchableOpacity
            style={styles.backbutton}
            onPress={() => {
              navigation.navigate('MyTrip');
            }}>
            <Back
              width={pixelSizeHorizontal(25)}
              height={pixelSizeVertical(25)}
            />
            <Text style={styles.backbuttonText}>My Trips</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.subMainHeader}>
          <TouchableOpacity style={{paddingRight: 20}}>
            <Sos
              width={pixelSizeHorizontal(50)}
              height={pixelSizeVertical(50)}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress={() => {}}>
            <Bell
              width={pixelSizeHorizontal(50)}
              height={pixelSizeVertical(50)}
              fill={'#C5197D'}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* body */}
      <View style={styles.subContainer}>
        <ScrollView style={styles.startTripContainer}>
          <View style={styles.startSubContainer}>
            <StartTripImage
              width={pixelSizeHorizontal(90)}
              height={pixelSizeVertical(90)}
            />
          </View>
          <Text style={styles.loginTripText}>Login Trip</Text>

          {/* step integration starts */}
          <View style={styles.stepIndicatorStyle}>
            <View>
              {labels.map((step, index) => (
                <TouchableOpacity
                  activeOpacity={1}
                  key={index}
                  onPress={() => {
                    if (index < selectedPosition) {
                      return;
                    } else if (index > selectedPosition) {
                      return;
                    }
                    stepActions[index]();
                  }}>
                  <View style={styles.checkBoxStyles}>
                    <View style={styles.checkBoxCircle}>
                      {index < selectedPosition ? (
                        <Check
                          width={horizontalScale(10)}
                          height={verticalScale(10)}
                        />
                      ) : null}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            {/* main step bar */}
            <View style={styles.mainStepIndiactor}>
              <StepIndicator
                direction="vertical"
                customStyles={customStyles}
                currentPosition={
                  selectedPosition === 0
                    ? selectedPosition
                    : selectedPosition - 1
                }
                stepCount={4}
                labels={labels.map((item, index) => (
                  <Text
                    style={{
                      paddingLeft: index < selectedPosition ? 20 : 10,
                      color: 'black',
                      fontFamily:
                        index > selectedPosition - 1
                          ? FontFamily.regular
                          : FontFamily.semiBold,
                    }}>
                    {item}
                  </Text>
                ))}
                onPress={index => {
                  if (index < selectedPosition) {
                    return;
                  } else if (index > selectedPosition) {
                    return;
                  }
                  stepActions[index]();
                }}
              />
            </View>
            {/* time showing label */}
            <View style={styles.stepLabelsStyles}>
              {time.map((step, index) => (
                <TouchableOpacity key={index} onPress={() => {}}>
                  <View style={styles.labelTextStyles}>
                    <Text
                      style={{
                        color: 'black',
                        fontFamily: selectedPosition
                          ? FontFamily.semiBold
                          : FontFamily.regular,
                        fontSize: fontPixel(14),
                      }}>
                      {step}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {/* end trip button */}
          {pickupEmployeeCompleted && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('StopTrip', {
                  roasterId: responseInfo?.idRoaster,
                  tripId: tripId,
                  tripId: responseInfo?.tripDetail?.idTrip,
                  idRoasterDays: idRoasterDays,
                  driverId: responseInfo?.idDriver,
                  mobileNo: driverContactNo,
                });
              }}
              activeOpacity={1}
              style={styles.endtripButton}>
              <Text style={styles.endTripText}>End Trip</Text>
            </TouchableOpacity>
          )}
          {/* starts trip modal */}
          <StartTripModal
            showConfirmModal={showStartTripModal}
            title={
              'Female employee should not travel alone in this trip without a guard.'
            }
            onPressOK={() => {
              setShowStartTripModal(false);
              setSelectedPosition(1);
              // time.push(handleButtonClick());
              // setShowOtpForStartTrip(true);
            }}
            onPressNo={() => {
              setShowStartTripModal(false);
            }}
          />
          {/* guard pickup modal */}
          <PickupGuardModal
            showModal={showModal}
            onCloseModel={() => {
              setModalPopupOptions({});
              setShowModal(false);
            }}
            options={modalPopupOptions}
            name={`${pickupGuard?.guardFullName}`}
            // pickupTime={}
            Address={`${pickupGuard?.address1}`}
          />
          {/* conformation modal */}
          <ConformationModal
            title={'Are you sure you want to skip the employee pickup?'}
            onPressYes={() => {
              setShowConfirmModal(false);
            }}
            onPressNo={() => {
              setShowConfirmModal(false);
            }}
            showConfirmModal={showConfirmModal}
          />

          {/* otp modal */}
          <CustomModal
            visible={showOtpModal}
            title={'Enter Otp'}
            onClose={() => setShowOtpModal(false)}
            onPressSubmitButton={async e => {
              // setOtp(e);
              validateOtpForGuard(e);
              setShowOtpModal(false);
              setSelectedPosition(2);
              // time.push(handleButtonClick());
            }}
            onPressCancelButton={() => {
              setShowOtpModal(false);
            }}
            isOtpError={otpError.isOtpError}
            OTPErrorMessage={otpError.otpErrorMessage}
          />

          {loader && <Loader />}
        </ScrollView>
        <BottomTab activeTab="MyTrips" />
      </View>
    </View>
  );
};

export default MyTripDetails;

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
    paddingLeft: pixelSizeHorizontal(20),
    fontFamily: FontFamily.regular,
  },
  subMainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subContainer: {
    flex: 1,
    backgroundColor: 'rgba(246, 246, 246, 1)',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  startTripContainer: {
    flex: 1,
    paddingTop: verticalScale(20),
  },
  startSubContainer: {
    alignSelf: 'center',
  },
  loginTripText: {
    fontFamily: FontFamily.medium,
    color: 'black',
    fontSize: fontPixel(16),
    alignSelf: 'center',
    marginTop: pixelSizeVertical(8),
  },
  stepIndicatorStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: pixelSizeHorizontal(20),
  },
  checkBoxStyles: {
    marginVertical: pixelSizeVertical(2.6),
    justifyContent: 'center',
    height: verticalScale(90),
    width: horizontalScale(50),
    marginRight: pixelSizeHorizontal(10),
  },
  checkBoxCircle: {
    width: SCREEN_HEIGHT * 0.025,
    height: SCREEN_HEIGHT * 0.025,
    borderRadius: (SCREEN_HEIGHT * 0.025) / 2,
    borderColor: 'rgba(102, 39, 110, 1)',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainStepIndiactor: {
    height: '100%',
    width: horizontalScale(200),
  },
  stepLabelsStyles: {
    borderWidth: 1,
    width: horizontalScale(80),
    borderColor: 'rgba(246, 246, 246, 1)',
  },
  labelTextStyles: {
    marginVertical: pixelSizeVertical(2.6),
    justifyContent: 'center',
    height: verticalScale(90),
  },
  endtripButton: {
    width: horizontalScale(130),
    height: verticalScale(50),
    backgroundColor: 'rgba(197, 25, 125, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: pixelSizeVertical(15),
    borderRadius: 6,
    alignSelf: 'center',
  },
  endTripText: {
    color: 'white',
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(16),
  },
});
