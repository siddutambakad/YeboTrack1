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
  openSettings,
} from '../Utils/ReusableFunctions';
import Geolocation from '@react-native-community/geolocation';

const SCREEN_HEIGHT = RN.Dimensions.get('window').height;

const MyTripDetails = ({route, navigation}) => {
  const {
    idRoasterDays,
    driveOfficeOtp,
    driveOfficeTime,
    stopTrip,
    stopTripTime,
    otpVerified,
    clickedTime,
    driverContactNo,
    roastertype,
  } = route.params;
  const [showStartTripModal, setShowStartTripModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showOtpForStartTrip, setShowOtpForStartTrip] = useState(false);
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
  const [currentLocation, setCurrentLocation] = useState(null);
  console.log('currentLocation', currentLocation);

  useEffect(() => {
    if (driveOfficeOtp) {
      setSelectedPosition(4);
      time.push(driveOfficeTime);
    } else if (otpVerified) {
      time.push(clickedTime);
      setSelectedPosition(3);
    } else if (stopTrip) {
      setSelectedPosition(5);
      time.push(stopTripTime);
    }
  }, [driveOfficeOtp, otpVerified, stopTrip]);

  useEffect(() => {
    getTripDetails(idRoasterDays);
  }, [idRoasterDays]);

  const getTripDetails = async driverId => {
    setLoader(true);
    try {
      const apiUrl = `${APIS.getTripDeatils}/${driverId}`;
      const response = await axios.get(apiUrl);
      const responseData = response?.data;
      setResponseInfo(responseData?.returnLst);
      setPickupGuard(responseData?.returnLst?.roasterGuardDetail);
      setEmployeeDetails(responseData?.returnLst?.roasterEmpDetails);
    } catch (error) {
      console.log('error from the tripdetail', error);
    } finally {
      setLoader(false);
    }
  };

  // const sendStartOtp = async () => {
  //   try {
  //     const sendStartOtpBody = {
  //       roasterId: responseInfo?.idRoaster,
  //       tripEventDtm: convertedTimeforEvent(),
  //       eventGpsdtm: convertedTime(),
  //       eventGpslocationLatLon: 'Driver Latitude,Longitude',
  //       eventGpslocationName: 'Driver Location Name',
  //       driverID: driverId,
  //       mobileNo: pickupGuard?.mobileNo,
  //     };
  //     const response = await axios.post(APIS.getStartTripOtp, sendStartOtpBody);
  //     setResponseData(response.data);
  //   } catch (error) {
  //     console.log('Error sending OTP:', error);
  //   }
  // };

  const handlePickupGuardClick = () => {
    setModalPopupOptions({
      button_text: 'Guard Check - In',
      button_action: () => {
        setShowModal(false);
        setShowOtpModal(true);
      },
      isSocialMediaRequired: false,
    });
    setShowModal(true);
  };

  const handlePickupEmployeeClick = () => {
    navigation.navigate('PickUp', {
      employeeDetail: employeeDetails,
    });
    setPickupEmployeeCompleted(true);
  };
  const formatTime = time => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const amOrPm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12; // Convert 0 to 12
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
  };
  const handleButtonClick = () => {
    const currentTime = new Date();
    const formattedTime = formatTime(currentTime);
    return formattedTime;
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
    // handleDriveToOfficeClick,
    () => navigation.navigate('StopTrip'),
  ];
  // const requestLocationPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       getLocation();
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
  // const getLocation = () => {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       const {latitude, longitude} = position.coords;
  //       setCurrentLocation({latitude, longitude});
  //       console.log('latitude, longitude', latitude, longitude);
  //     },
  //     error => console.log('error', error),
  //   );
  // };

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
                navigation.navigate('StopTrip');
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
          {/* <CustomModal
            visible={showOtpForStartTrip}
            title={'Enter Otp'}
            onClose={() => setShowOtpForStartTrip(false)}
            onPressSubmitButton={() => {
              setShowOtpForStartTrip(false);
              setSelectedPosition(1);
              time.push(handleButtonClick());
            }}
            onPressCancelButton={() => {
              setShowOtpModal(false);
            }}
          /> */}
          {/* otp modal */}
          <CustomModal
            visible={showOtpModal}
            title={'Enter Otp'}
            onClose={() => setShowOtpModal(false)}
            onPressSubmitButton={() => {
              setShowOtpModal(false);
              setSelectedPosition(2);
              time.push(handleButtonClick());
            }}
            onPressCancelButton={() => {
              setShowOtpModal(false);
            }}
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
