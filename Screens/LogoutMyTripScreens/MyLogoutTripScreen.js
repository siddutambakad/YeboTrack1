import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Back from '../../assets/images/VectorBack.svg';
import Sos from '../../assets/images/sos.svg';
import Bell from '../../assets/images/bellIcon.svg';
import StartTripImage from '../../assets/images/startTripCar1.svg';
import {
  fontPixel,
  horizontalScale,
  pixelSizeHorizontal,
  pixelSizeVertical,
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
import DriveToZoneModal from '../Components/DriveToZoneModal';
import EmployeeCheckInModal from '../Components/EmployeeCheckInModal';
import RN from 'react-native';
import {
  convertedTime,
  convertedTimeforEvent,
  getCurrentLocation,
  getLocationName,
  handleCallPress,
  openGoogleMap,
  requestLocationPermission,
} from '../Utils/ReusableFunctions';
import {actuatedNormalize} from '../Utils/PixelScaling';
import axios from 'axios';
import Loader from '../Components/Loader';
import {APIS} from '../APIURLS/ApiUrls';
import {AppContext} from '../Context/AppContext';

const SCREEN_HEIGHT = RN.Dimensions.get('window').height;

const MyLogoutTripScreen = ({route, navigation}) => {
  const {
    otpSubmitedForEmployee,
    pickUpTime,
    startTrip,
    startTripTime,
    DroppedEmployee,
    droppedTime,
    dropGuard,
    dropGuardTime,

    idRoasterDays,
    driverContactNo,
    roastertype,
    otpVerified,
    tripId,
    resumeOngoingTrip,
  } = route.params;
  console.log('🚀 ~ MyLogoutTripScreen ~ tripId:', tripId);
  console.log('🚀 ~ MyLogoutTripScreen ~ roastertype:', roastertype);
  console.log('🚀 ~ MyLogoutTripScreen ~ driverContactNo:', driverContactNo);
  console.log('🚀 ~ MyLogoutTripScreen ~ idRoasterDays:', idRoasterDays);
  const [pickUpGuardModal, setPickUpGuardModal] = useState(false);
  const [modalPopupOptions, setModalPopupOptions] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [time, setTimes] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(0);
  const [pickupGuard, setPickupGuard] = useState([]);
  const [showStartOtp, setShowStartOtp] = useState(false);
  const [showGuardOtpModal, setShowGuardOtpModal] = useState([]);
  const [otpError, setOtpError] = useState({
    isOtpError: false,
    otpErrorMessage: '',
  });
  // const [validatedStartTripId, setValidatedStartTripId] = useState([]);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const {tripDetailsResponse, getTripDetails, loader, setLoader} =
    useContext(AppContext);
  const [showEndTripButton, setShowEndTripButton] = useState(false);

  // console.log(
  //   '\ntripDetailsResponse',
  //   JSON.stringify(tripDetailsResponse, null, 2),
  //   '\n',
  // );

  useEffect(() => {
    // if (otpSubmitedForEmployee) {
    //   setShowLocationReachedModal(true);
    // } else if (startTrip) {
    //   time.push(startTripTime);
    //   setShowLocationReachedModal(true);
    // } else if (DroppedEmployee) {
    //   setSelectedPosition(5);
    //   time.push(droppedTime);
    // } else if (dropGuard) {
    //   setSelectedPosition(6);
    //   time.push(dropGuardTime);
    // }
    if (otpVerified) {
      setSelectedPosition(2);
    }
  }, [otpVerified]);

  useEffect(() => {
    if (resumeOngoingTrip || idRoasterDays) {
      getTripDetails(idRoasterDays);
    }
  }, [resumeOngoingTrip, idRoasterDays]);

  useEffect(() => {
    if (tripDetailsResponse) {
      stepperPointChanger(tripDetailsResponse.tripDetail);
      setPickupGuard(tripDetailsResponse.roasterGuardDetail);
      // setEmployeeDetails(tripDetailsResponse.roasterEmpDetails)
    }
  }, [tripDetailsResponse]);

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    try {
      await requestLocationPermission();
      setPermissionGranted(true);
    } catch (error) {
      console.error('Error requesting location permission:', error);
      setPermissionGranted(false);
    }
  };

  const stepperPointChanger = tripDetail => {
    const dt = new Map([
      ['Not-Started', 0],
      ['Trip-Start', 1],
      ['Onboarding Completed', 2],
      ['Guard-Check-In', 3],
      ['Trip-End', 4],
    ]);
    setSelectedPosition(dt.get(tripDetail?.tripStatusDesc));
  };

  // const getTripDetails = async idRoasterDays => {
  //   setLoader(true);
  //   try {
  //     const apiUrl = `${APIS.getTripDeatils}/${idRoasterDays}`;
  //     const response = await axios.get(apiUrl);
  //     const responseData = response?.data;
  //     console.log('🚀 ~ getTripDetails ~ responseData:', responseData);
  //     stepperPointChanger(responseData?.returnLst?.tripDetail);
  //     setResponseInfo(responseData?.returnLst);
  //     setPickupGuard(responseData?.returnLst?.roasterGuardDetail);
  //     setEmployeeDetails(responseData?.returnLst?.roasterEmpDetails);
  //   } catch (error) {
  //     console.log('error from the tripdetail', error);
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  const startTripForDrop = async () => {
    setLoader(true);
    setOtpError({
      isOtpError: false,
      otpErrorMessage: '',
    });
    try {
      const currentLocation = await getCurrentLocation();
      const {latitude, longitude} = currentLocation;
      const locationName = await getLocationName(latitude, longitude);

      const apiUrl = `${APIS.getStartTripOtp}`;
      const requestBodyForStartTrip = {
        roasterId: tripDetailsResponse?.idRoaster,
        roasterDaysId: idRoasterDays,
        tripEventDtm: convertedTimeforEvent(),
        eventGpsdtm: convertedTime(),
        eventGpslocationLatLon: `${latitude},${longitude}`,
        eventGpslocationName: locationName,
        driverID: tripDetailsResponse?.idDriver,
        mobileNo: driverContactNo,
        roasterRouteType: tripDetailsResponse?.roasterType,
      };
      console.log(
        '\nrequestBodyForStartTrip',
        JSON.stringify(requestBodyForStartTrip, null, 2),
        '\n',
      );
      const responseData = await axios.post(apiUrl, requestBodyForStartTrip);
      const response = responseData.data;
      console.log('\nresponse', JSON.stringify(response, null, 2), '\n');
      setShowStartOtp(true);
    } catch (error) {
      console.log('🚀 ~ startTripForDrop ~ error:', error);
      if (error.response.data.statusMessage === 'Record Exists') {
        setShowStartOtp(true);
      } else {
        setShowStartOtp(false);
      }
    } finally {
      setLoader(false);
    }
  };

  const validateStartOtp = async OTP => {
    setLoader(true);
    try {
      const apiUrl = `${APIS.validateStartTripOtp}`;
      const currentLocation = await getCurrentLocation();
      const {latitude, longitude} = currentLocation;
      const locationName = await getLocationName(latitude, longitude);
      const validateStartTrip = {
        roasterId: tripDetailsResponse?.idRoaster,
        idRoasterDays: idRoasterDays,
        driverID: tripDetailsResponse?.idDriver,
        mobileNo: driverContactNo,
        tripOtp: OTP,
        tripOdoMtrStart: '000000',
        tripStartGpsdtm: convertedTime(),
        tripStartGpslocationLatLon: `${latitude},${longitude}`,
        tripStartGpslocationName: locationName,
        roasterRouteType: tripDetailsResponse?.roasterType,
      };
      const responseData = await axios.post(apiUrl, validateStartTrip);
      const response = responseData?.data;
      // setValidatedStartTripId(response?.returnLst?.tripId);
      console.log('response====>>>', JSON.stringify(response), 2);
      if (response.statusCode === 200) {
        setOtpError({
          isOtpError: false,
          otpErrorMessage: '',
        });
        setSelectedPosition(1);
      } else {
        setOtpError({
          isOtpError: false,
          otpErrorMessage: '',
        });
      }
    } catch (error) {
      console.log('error=====>>>>', JSON.stringify(error), 2);
    } finally {
      setLoader(false);
    }
  };

  const sendGuardOtp = async () => {
    setLoader(true);
    try {
      const apiUrl = `${APIS.sendOtpForGuard}`;
      const currentLocation = await getCurrentLocation();
      const {latitude, longitude} = currentLocation;
      const locationName = await getLocationName(latitude, longitude);
      const requestBodyGuard = {
        roasterId: tripDetailsResponse?.idRoaster,
        tripId: resumeOngoingTrip
          ? tripDetailsResponse?.tripDetail?.idTrip
          : tripId,
        idRoasterDays: tripDetailsResponse?.roasterDayId,
        tripEventDtm: convertedTimeforEvent(),
        eventGpsdtm: convertedTime(),
        eventGpslocationLatLon: `${latitude},${longitude}`,
        eventGpslocationName: locationName,
        guardID: pickupGuard?.idGuard,
        mobileNo: pickupGuard?.mobileNo,
      };
      console.log(
        '\nsendrequestBodyGuard',
        JSON.stringify(requestBodyGuard, null, 2),
        '\n',
      );
      const apiResponse = await axios.post(apiUrl, requestBodyGuard);
      const response = apiResponse.data?.returnLst;
      console.log('🚀 ~ sendGuardOtp ~ response:', response);
      // setResponseGuardData(response?.returnLst);
      setShowGuardOtpModal(true);
    } catch (error) {
      if (error?.response) {
        console.log(
          '===rerror1',
          JSON.stringify(error?.response?.data, null, 2),
        );
        if (error?.response?.data?.statusMessage === 'Record Exists') {
          // setOtpValidateResponse(error?.response?.data?.returnLst);
          setShowGuardOtpModal(true);
        }
      }
    } finally {
      setLoader(false);
    }
  };

  const validateSendGuardOtp = async OTP => {
    setLoader(true);
    try {
      const apiUrl = `${APIS.sendOtpForGuard}`;
      const currentLocation = await getCurrentLocation();
      const {latitude, longitude} = currentLocation;
      const locationName = await getLocationName(latitude, longitude);

      const requestBodyGuard = {
        tripId: resumeOngoingTrip
          ? tripDetailsResponse?.tripDetail?.idTrip
          : tripId,
        roasterId: tripDetailsResponse?.idRoaster,
        idRoasterDays: tripDetailsResponse?.roasterDayId,
        guardID: pickupGuard?.idGuard,
        mobileNo: pickupGuard?.mobileNo,
        tripOtp: OTP,
        guardOTPGPSDTM: convertedTime(),
        guardOTPGPSLocationLatLon: `${latitude},${longitude}`,
        guardOTPGPSLocationName: locationName,
      };
      console.log(
        '\nrequestBodyGuard',
        JSON.stringify(requestBodyGuard, null, 2),
        '\n',
      );
      const response = await axios.post(apiUrl, requestBodyGuard);
      const responseData = response.data;
      console.log(
        '\nresponseDataFor Otp guard',
        JSON.stringify(responseData, null, 2),
        '\n',
      );
    } catch (error) {
      console.log('\nerror', JSON.stringify(error, null, 2), '\n');
    } finally {
      setLoader(false);
    }
  };

  const handleStartTrip = () => {
    if (permissionGranted) {
      startTripForDrop();
    } else {
      requestPermission();
    }
  };

  const handlePickupGuardClick = () => {
    setModalPopupOptions({
      button_text: 'Check- in',
      button_action: () => {
        sendGuardOtp();
        setPickUpGuardModal(false);
      },
      isSocialMediaRequired: false,
    });
    setPickUpGuardModal(true);
    setShowEndTripButton(true);
  };

  const handleDropGuard = () => {
    navigation.navigate('StopTrip', {
      roasterId: tripDetailsResponse?.idRoaster,
      tripId: tripId,
      tripId: tripDetailsResponse?.tripDetail?.idTrip,
      idRoasterDays: tripDetailsResponse?.roasterDayId,
      driverId: tripDetailsResponse?.idDriver,
      mobileNo: resumeOngoingTrip
        ? tripDetailsResponse?.driverContactNo
        : tripDetailsResponse?.roasterEmpDetails[0].driverContactNo,
    });
  };

  const handlePickupEmployeeClick = () => {
    navigation.navigate('PickUp', {
      tripId: tripDetailsResponse?.tripDetail?.idTrip,
      // validatedStartOtp: validatedStartTripId,
      tripId: tripDetailsResponse?.tripDetail?.idTrip,
      tripType: tripDetailsResponse?.tripDetail?.tripType,
      idRoasterDays,
    });
  };
  const handleDropEmployee = () => {
    navigation.navigate('DroppedCheckIn', {
      roasterIds: tripDetailsResponse?.roasterDayId,
    });
  };

  const labels = [
    'Start Trip',
    'Pickup Employee',
    'Guard-Check-In',
    'Drop Employee',
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
    handlePickupEmployeeClick,
    handlePickupGuardClick,
    handleDropEmployee,
    handleDropGuard,
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
        <ScrollView
          style={styles.startTripContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.startSubContainer}>
            <StartTripImage
              width={pixelSizeHorizontal(90)}
              height={pixelSizeVertical(90)}
            />
          </View>
          <Text style={styles.loginTripText}>Logout Trip</Text>

          <View style={styles.stepInicatorStyles}>
            {/* stepbar check box */}
            <View>
              {labels.map((step, index) => (
                <TouchableOpacity
                  activeOpacity={0.7}
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
                    <View style={styles.checkCircleStyles}>
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
            <View
              style={{
                height: '100%',
                width: horizontalScale(200),
              }}>
              <StepIndicator
                direction="vertical"
                customStyles={customStyles}
                currentPosition={
                  selectedPosition === 0
                    ? selectedPosition
                    : selectedPosition - 1
                }
                stepCount={5}
                labels={labels.map((item, index) => (
                  <Text
                    style={{
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
            {/* step bar time */}
            <View style={styles.stepLabelStyle}>
              {time.map((step, index) => (
                <TouchableOpacity key={index} onPress={() => {}}>
                  <View style={styles.steplabelText}>
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
          {showEndTripButton && (
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('UpComing');
                navigation.navigate('StopTrip', {
                  roasterId: tripDetailsResponse?.idRoaster,
                  tripId: tripId,
                  tripId: tripDetailsResponse?.tripDetail?.idTrip,
                  idRoasterDays: tripDetailsResponse?.roasterDayId,
                  driverId: tripDetailsResponse?.idDriver,
                  mobileNo: resumeOngoingTrip
                    ? tripDetailsResponse?.driverContactNo
                    : tripDetailsResponse?.roasterEmpDetails[0].driverContactNo,
                });
              }}
              activeOpacity={1}
              // disabled={!dropEmployee}
              style={styles.stopTripButton}>
              <Text style={styles.stopTripText}>End Trip</Text>
            </TouchableOpacity>
          )}
          <ConformationModal
            title={'Are you sure you want to skip the location pickup?'}
            onPressYes={() => {
              setShowConfirmModal(false);
            }}
            onPressNo={() => {
              setShowConfirmModal(false);
            }}
            showConfirmModal={showConfirmModal}
          />

          <CustomModal
            visible={showStartOtp}
            title={'Enter Otp'}
            onClose={() => setShowStartOtp(false)}
            onPressSubmitButton={e => {
              validateStartOtp(e);
              setShowStartOtp(false);
            }}
            onPressCancelButton={e => {
              setShowStartOtp(false);
            }}
            isOtpError={otpError.isOtpError}
            OTPErrorMessage={otpError.otpErrorMessage}
          />
          <CustomModal
            visible={showGuardOtpModal}
            title={'Enter Guard Otp'}
            onClose={() => setShowGuardOtpModal(false)}
            onPressSubmitButton={e => {
              validateSendGuardOtp(e);
              setShowGuardOtpModal(false);
              setSelectedPosition(3);
            }}
            onPressCancelButton={e => {
              setShowGuardOtpModal(false);
            }}
            isOtpError={otpError.isOtpError}
            OTPErrorMessage={otpError.otpErrorMessage}
          />
          <PickupGuardModal
            showModal={pickUpGuardModal}
            onCloseModel={() => {
              setModalPopupOptions({});
              // setShowModal(false);
              setPickUpGuardModal(false);
            }}
            options={modalPopupOptions}
            name={`${pickupGuard?.guardFullName}`}
            // pickupTime={}
            Address={`${pickupGuard?.address1}`}
          />
        </ScrollView>
        {loader && <Loader />}
        <BottomTab activeTab="MyTrips" />
      </View>
    </View>
  );
};

export default MyLogoutTripScreen;

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
    paddingTop: pixelSizeVertical(20),
    paddingBottom: pixelSizeVertical(30),
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
  stepInicatorStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: pixelSizeHorizontal(20),
  },
  checkBoxStyles: {
    marginVertical: pixelSizeVertical(2.6),
    justifyContent: 'center',
    height: verticalScale(80),
    width: horizontalScale(50),
    marginRight: pixelSizeHorizontal(10),
  },
  checkCircleStyles: {
    width: SCREEN_HEIGHT * 0.028,
    height: SCREEN_HEIGHT * 0.028,
    borderRadius: (SCREEN_HEIGHT * 0.028) / 2,
    borderColor: 'rgba(102, 39, 110, 1)',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepLabelStyle: {
    width: horizontalScale(80),
    borderWidth: 1,
    borderColor: 'rgba(246, 246, 246, 1)',
  },
  steplabelText: {
    marginVertical: pixelSizeVertical(2.6),
    justifyContent: 'center',
    height: verticalScale(80),
    alignItems: 'center',
  },
  stopTripButton: {
    width: horizontalScale(130),
    height: verticalScale(50),
    backgroundColor: 'rgba(197, 25, 125, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: pixelSizeVertical(15),
    marginBottom: pixelSizeVertical(30),
    borderRadius: 6,
    alignSelf: 'center',
  },
  stopTripText: {
    color: 'white',
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(16),
  },
});
