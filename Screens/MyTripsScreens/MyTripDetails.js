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

const MyTripDetails = ({route, navigation}) => {
  const {
    driveOfficeOtp,
    driveOfficeTime,
    stopTrip,
    stopTripTime,
    otpVerified,
    clickedTime,
  } = route.params;
  const [showStartTripModal, setShowStartTripModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [modalPopupOptions, setModalPopupOptions] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [time, setTimes] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(0);

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
    navigation.navigate('PickUp');
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

  const handleStartTrip = index => {
    setShowStartTripModal(true);
  };
  const handleDriveToOfficeClick = () => {
    navigation.navigate('DriveToOffice');
  };

  const labels = [
    'Start Trip',
    'Pickup Guard',
    'Pickup Employee',
    'Drive To office',
    'Stop Trip',
  ];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 25,
    separatorStrokeWidth: 8,
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
    labelSize: 14,
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
    handleDriveToOfficeClick,
    () => navigation.navigate('StopTrip'),
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

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: pixelSizeHorizontal(20),
            }}>
            <View>
              {labels.map((step, index) => (
                <TouchableOpacity
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
                      height: verticalScale(90),
                      width: 50,
                      marginRight: pixelSizeHorizontal(10),
                    }}>
                    <View
                      style={{
                        width: horizontalScale(22),
                        height: verticalScale(25),
                        borderRadius: responsiveBorderRadius(50),
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
                width: 200,
              }}>
              <StepIndicator
                direction="vertical"
                customStyles={customStyles}
                currentPosition={selectedPosition}
                labels={labels}
                onPress={index => {
                  if (index < selectedPosition) {
                    return;
                  }
                  stepActions[index]();
                }}
              />
            </View>
            <View>
              {time.map((step, index) => (
                <TouchableOpacity key={index} onPress={() => {}}>
                  <View
                    style={{
                      marginVertical: pixelSizeVertical(2.6),
                      justifyContent: 'center',
                      height: verticalScale(90),
                      width: horizontalScale(80),
                      alignItems: 'center',
                      marginLeft: pixelSizeHorizontal(10),
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontFamily: FontFamily.medium,
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
              setSelectedPosition(5);
            }}
            activeOpacity={1}
            style={{
              width: horizontalScale(130),
              height: verticalScale(50),
              backgroundColor: 'rgba(197, 25, 125, 1)',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: pixelSizeVertical(15),
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

          <StartTripModal
            showConfirmModal={showStartTripModal}
            title={
              'Female employee should not travel alone in this trip without a guard.'
            }
            onPressOK={() => {
              setShowStartTripModal(false);
              setSelectedPosition(1);
              time.push(handleButtonClick());
            }}
            onPressNo={() => {
              setShowStartTripModal(false);
            }}
          />
          <PickupGuardModal
            showModal={showModal}
            onCloseModel={() => {
              setModalPopupOptions({});
              setShowModal(false);
            }}
            options={modalPopupOptions}
          />

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
            title={'Enter check-in pin'}
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
        </ScrollView>
        <BottomTab activeTab="MyTrips" />
        {/* <TabNavigator /> */}
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
});
