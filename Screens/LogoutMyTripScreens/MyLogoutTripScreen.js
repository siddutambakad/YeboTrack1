import {
  Dimensions,
  Linking,
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
import DriveToZoneModal from '../Components/DriveToZoneModal';
import EmployeeCheckInModal from '../Components/EmployeeCheckInModal';
import RN from 'react-native';
import {handleCallPress, openGoogleMap} from '../Utils/ReusableFunctions';
import {actuatedNormalize} from '../Utils/PixelScaling';

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
  } = route.params;
  const [showLocationReachedModal, setShowLocationReachedModal] =
    useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [pickUpGuardModal, setPickUpGuardModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [modalPopupOptions, setModalPopupOptions] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [time, setTimes] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(0);
  const [dropEmployee, setDropEmployee] = useState(false)

  useEffect(() => {
    if (otpSubmitedForEmployee) {
      setShowLocationReachedModal(true);
    } else if (startTrip) {
      time.push(startTripTime);
      setShowLocationReachedModal(true);
    } else if (DroppedEmployee) {
      setSelectedPosition(5);
      time.push(droppedTime);
    } else if (dropGuard) {
      setSelectedPosition(6);
      time.push(dropGuardTime);
    }
  }, [otpSubmitedForEmployee, startTrip, DroppedEmployee, dropGuard]);

  const handlePickupGuardClick = () => {
    setModalPopupOptions({
      button_text: 'Check- in',
      button_action: () => {
        setPickUpGuardModal(false);
        // navigation.navigate('PickUpEmployee')
        setShowOtpModal(true);
      },
      isSocialMediaRequired: false,
    });
    setPickUpGuardModal(true);
  };
  const handleDropGuard = () => {
    setModalPopupOptions({
      button_text: 'Check- in',
      button_action: () => {
        setPickUpGuardModal(false);
        navigation.navigate('DropGuard');
        // setShowOtpModal(true);
      },
      isSocialMediaRequired: false,
    });
    setPickUpGuardModal(true);
  };
  const handleDriveZone = () => {
    setShowModal(true);
  };

  const handlePickupEmployeeClick = () => {
    setShowEmployeeModal(true);
  };
  const handleDropEmployee = () => {
    setModalPopupOptions({
      button_text: 'Skip Location',
      button_action: () => {
        setPickUpGuardModal(false);
        setShowConfirmModal(true);
      },
      button_text2: 'Dropped',
      button_action2: () => {
        setPickUpGuardModal(false);
        setDropEmployee(true);
        navigation.navigate('DroppedCheckIn');
      },
      isSocialMediaRequired: true,
    });
    setPickUpGuardModal(true);
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
    navigation.navigate('StartTrip');
  };

  const openGoogleMaps = () => {
    openGoogleMap('37.7749', '-122.4194');
  };

  const handleDialPress = () => {
    handleCallPress('123456789');
  };

  const labels = [
    'Drive to Zone',
    'Pickup Employee',
    'Pickup Guard',
    'Start Trip',
    'Drop Employee',
    'Drop Guard',
  ];

  const customStyles = {
    stepIndicatorSize: actuatedNormalize(20),
    currentStepIndicatorSize: actuatedNormalize(20),
    separatorStrokeWidth: horizontalScale(4),
    currentStepStrokeWidth: 0,
    stepStrokeCurrentColor: 'lightgray',
    stepStrokeWidth: 0,
    stepStrokeFinishedColor: 'gray',
    stepStrokeUnFinishedColor: 'lightgray',
    separatorFinishedColor: 'gray',
    separatorUnFinishedColor: 'lightgray',
    stepIndicatorFinishedColor: 'gray',
    stepIndicatorUnFinishedColor: 'lightgray',
    stepIndicatorCurrentColor: 'lightgray',
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
    handleDriveZone,
    handlePickupEmployeeClick,
    handlePickupGuardClick,
    handleStartTrip,
    handleDropEmployee,
    handleDropGuard,
    // () => navigation.navigate('StopTrip'),
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

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: pixelSizeHorizontal(20),
            }}>
            <View>
              {labels.map((step, index) => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  key={index}
                  onPress={() => {
                    if (index < selectedPosition) {
                      return;
                    }
                    stepActions[index]();
                  }}>
                  <View
                    style={{
                      marginVertical: pixelSizeVertical(2.6),
                      justifyContent: 'center',
                      height: verticalScale(80),
                      width: horizontalScale(50),
                      marginRight: pixelSizeHorizontal(10),
                    }}>
                    <View
                      style={{
                        width: SCREEN_HEIGHT * 0.029,
                        height: SCREEN_HEIGHT * 0.029,
                        borderRadius: (SCREEN_HEIGHT * 0.029) / 2,
                        borderColor: 'rgba(102, 39, 110, 1)',
                        borderWidth: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
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
            <View
              style={{
                height: '100%',
                width: horizontalScale(200),
              }}>
              <StepIndicator
                direction="vertical"
                customStyles={customStyles}
                currentPosition={selectedPosition}
                stepCount={6}
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
                  }
                  stepActions[index]();
                }}
              />
            </View>

            <View
              style={{
                width: horizontalScale(80),
                borderWidth: 1,
                borderColor: 'rgba(246, 246, 246, 1)',
              }}>
              {time.map((step, index) => (
                <TouchableOpacity key={index} onPress={() => {}}>
                  <View
                    style={{
                      marginVertical: pixelSizeVertical(2.6),
                      justifyContent: 'center',
                      height: verticalScale(80),
                      alignItems: 'center',
                    }}>
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
          <TouchableOpacity
            onPress={() => {
                navigation.navigate('UpComing')
            }}
            activeOpacity={1}
            disabled={!dropEmployee}
            style={{
              width: horizontalScale(130),
              height: verticalScale(50),
              backgroundColor: 'rgba(197, 25, 125, 1)',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: pixelSizeVertical(15),
              marginBottom: pixelSizeVertical(30),
              borderRadius: 6,
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: FontFamily.regular,
                fontSize: fontPixel(16),
              }}>
              Stop Trip
            </Text>
          </TouchableOpacity>

          <DriveToZoneModal
            showModal={showModal}
            onCloseModel={() => {
              setShowModal(false);
            }}
            onPressCheckIn={() => {
              setShowLocationReachedModal(true);
              setShowModal(false);
            }}
            onPressLocation={() => {
              openGoogleMaps();
            }}
          />

          <StartTripModal
            showConfirmModal={showLocationReachedModal}
            title={
              otpSubmitedForEmployee
                ? 'Employee checked-in successfully!'
                : startTrip
                ? 'Female employee should not travel alone in this trip without a guard.'
                : 'Office reach event updated successfully!'
            }
            onPressOK={() => {
              if (otpSubmitedForEmployee) {
                setSelectedPosition(2);
                setShowLocationReachedModal(false);
                time.push(pickUpTime);
              } else if (startTrip) {
                setSelectedPosition(4);
                setShowLocationReachedModal(false);
              } else {
                setShowLocationReachedModal(false);
                setSelectedPosition(1);
                time.push(handleButtonClick());
              }
            }}
          />

          <EmployeeCheckInModal
            showEmployeeModal={showEmployeeModal}
            onPressOutside={() => {
              setShowEmployeeModal(false);
            }}
            onPressCheckIn={() => {
              setShowEmployeeModal(false);
              navigation.navigate('PickUpEmployee');
            }}
            onPressCancelButton={() => {
              setShowEmployeeModal(false);
            }}
            onPressDial={() => {
              handleDialPress();
            }}
            onPressLocation={() => {
              openGoogleMaps();
            }}
            title={'Waiting for employee check-in'}
          />
          <PickupGuardModal
            showModal={pickUpGuardModal}
            onCloseModel={() => {
              setModalPopupOptions({});
              setPickUpGuardModal(false);
            }}
            options={modalPopupOptions}
          />

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
          {/* otp modal */}
          <CustomModal
            visible={showOtpModal}
            title={'Enter check-in pin'}
            onClose={() => setShowOtpModal(false)}
            onPressSubmitButton={() => {
              setShowOtpModal(false);
              setSelectedPosition(3);
              time.push(handleButtonClick());
            }}
            onPressCancelButton={() => {
              setShowOtpModal(false);
              setPickUpGuardModal(true);
            }}
          />
        </ScrollView>
        <BottomTab activeTab="MyTrips" />
        {/* <TabNavigator /> */}
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
});
