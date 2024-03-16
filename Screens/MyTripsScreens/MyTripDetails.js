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
  // const {
  //   otpSubmitedForEmployee,
  //   driveOfficeOtp,
  //   pickUpTime,
  //   reachTime,
  //   stopTrip,
  //   stopTripTime,
  // } = route.params;
  const [startTrip, setStartTrip] = useState(false);
  const [pickUpGuard, setPickUpGuard] = useState(false);
  const [pickUpEmployee, setPickUpEmployee] = useState(false);
  const [dropEmployee, setDropEmployee] = useState(false);
  const [dropGuard, setDropGuard] = useState(false);
  const [showStartTripModal, setShowStartTripModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [modalPopupOptions, setModalPopupOptions] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [tripTimes, setTripTimes] = useState({
    startTime: '',
    pickUpGuardTime: '',
    stopTripTime: '',
    pickUpTimeState: '',
    driveOfficeTime: '',
  });
  // useEffect(() => {
  //   if (otpSubmitedForEmployee) {
  //     setPickUpEmployee(true);
  //     setTripTimes(prevState => ({
  //       ...prevState,
  //       pickUpTimeState: pickUpTime,
  //     }));
  //   } else if (driveOfficeOtp) {
  //     setDropEmployee(true);
  //     setTripTimes(prevState => ({
  //       ...prevState,
  //       driveOfficeTime: reachTime,
  //     }));
  //   } else if (stopTrip) {
  //     setDropGuard(true);
  //     setTripTimes(prevState => ({
  //       ...prevState,
  //       stopTripTime: stopTripTime,
  //     }));
  //   }
  // }, [otpSubmitedForEmployee, driveOfficeOtp, stopTrip]);

  const handleDialPress = () => {
    const phoneNumber = '1234567890';
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const openGoogleMaps = () => {
    const latitude = '37.7749';
    const longitude = '-122.4194';
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const handlePickupGuardClick = () => {
    if (!pickUpGuard) {
      setModalPopupOptions({
        button_text: 'Guard Check - In',
        button_action: () => {
          setShowModal(false);
          setShowOtpModal(true);
        },
        isSocialMediaRequired: false,
      });
      setShowModal(true);
    }
  };

  const handlePickupEmployeeClick = () => {
    if (!pickUpEmployee) {
      // setModalPopupOptions({
      //   button_text: 'Skip Employee Pickup',
      //   button_action: () => {
      //     setShowConfirmModal(true);
      //     setShowModal(false);
      //   },
      //   button_text2: 'Location Reached',
      //   button_action2: () => {
      //     setShowModal(false);
      //     navigation.navigate('Location');
      //   },
      //   isSocialMediaRequired: true,
      //   button_Action3: () => {
      //     handleDialPress();
      //   },
      //   button_Action4: () => {
      //     openGoogleMaps();
      //   },
      // });
      // setShowModal(true);
    }
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
    setTripTimes(prevState => ({
      ...prevState,
      startTime: formattedTime,
    }));
  };

  const handleStartTrip = () => {
    if (!startTrip) {
      setShowStartTripModal(true);
    }
  };

  // const renderStepBar = () => {
  //   return (
  //     <>
  //       <View style={styles.stepBar}>
  //         {/* stepbar*/}
  //         {/* starttrip */}
  //         <View style={styles.starTripButton}>
  //           <TouchableOpacity
  //             activeOpacity={1}
  //             style={styles.circle}
  //             onPress={() => {
  //               handleStartTrip();
  //             }}>
  //             {startTrip && <Check />}
  //           </TouchableOpacity>
  //           <View style={styles.stepbarStartTrip}>
  //             <TouchableOpacity
  //               onPress={() => {
  //                 handleStartTrip();
  //               }}
  //               style={{
  //                 ...styles.stepbarCircle,
  //                 backgroundColor: startTrip
  //                   ? 'rgba(127, 127, 127, 1)'
  //                   : 'rgba(196, 196, 196, 1)',
  //               }}></TouchableOpacity>
  //             <View
  //               style={{
  //                 ...styles.stepBarLine,
  //                 backgroundColor: pickUpGuard
  //                   ? 'rgba(127, 127, 127, 1)'
  //                   : 'rgba(196, 196, 196, 1)',
  //               }}></View>
  //           </View>
  //           <TouchableOpacity
  //             onPress={() => {
  //               handleStartTrip();
  //             }}>
  //             <Text style={styles.tripNameText}>Start trip</Text>
  //           </TouchableOpacity>
  //           <Text style={styles.tripTimeing}>{tripTimes.startTime}</Text>
  //         </View>

  //         {/* pickup guard */}
  //         <View style={styles.pickUpGuardButton}>
  //           <TouchableOpacity
  //             style={styles.circle}
  //             onPress={handlePickupGuardClick}
  //             activeOpacity={1}
  //             disabled={!startTrip}>
  //             {pickUpGuard && <Check />}
  //           </TouchableOpacity>
  //           <View style={styles.pickUpGuardContainer}>
  //             <TouchableOpacity
  //               onPress={handlePickupGuardClick}
  //               activeOpacity={1}
  //               disabled={!startTrip}
  //               style={{
  //                 ...styles.pickupGuardCircle,
  //                 backgroundColor: pickUpGuard
  //                   ? 'rgba(127, 127, 127, 1)'
  //                   : 'rgba(196, 196, 196, 1)',
  //               }}></TouchableOpacity>
  //             <View
  //               style={{
  //                 ...styles.pickupGuardLine,
  //                 backgroundColor: pickUpEmployee
  //                   ? 'rgba(127, 127, 127, 1)'
  //                   : 'rgba(196, 196, 196, 1)',
  //               }}></View>
  //           </View>
  //           <TouchableOpacity
  //             onPress={handlePickupGuardClick}
  //             activeOpacity={1}
  //             disabled={!startTrip}>
  //             <Text style={styles.tripNameText}>Pickup Guard</Text>
  //           </TouchableOpacity>
  //           <Text style={styles.tripTimeing}>{tripTimes.pickUpGuardTime}</Text>
  //         </View>

  //         {/* pickup employee */}
  //         <TouchableOpacity
  //           activeOpacity={1}
  //           onPress={handlePickupEmployeeClick}
  //           disabled={!pickUpGuard}
  //           style={styles.pickupEmployeeButton}>
  //           <View style={styles.circle}>{pickUpEmployee && <Check />}</View>
  //           <View style={styles.pickUpEmployeeContainer}>
  //             <View
  //               style={{
  //                 ...styles.pickupEmployeeCircle,
  //                 backgroundColor: pickUpEmployee
  //                   ? 'rgba(127, 127, 127, 1)'
  //                   : 'rgba(196, 196, 196, 1)',
  //               }}></View>
  //             <View
  //               style={{
  //                 ...styles.pickupEmployeeLine,
  //                 backgroundColor: dropEmployee
  //                   ? 'rgba(127, 127, 127, 1)'
  //                   : 'rgba(196, 196, 196, 1)',
  //               }}></View>
  //           </View>
  //           <Text style={styles.tripNameText}>Pickup Employee</Text>
  //           <Text style={styles.tripTimeing}>{tripTimes.pickUpTimeState}</Text>
  //         </TouchableOpacity>

  //         {/*Drive to Office */}
  //         <TouchableOpacity
  //           onPress={() => {
  //             if (!dropEmployee) {
  //               navigation.navigate('DriveToOffice');
  //             }
  //           }}
  //           disabled={!pickUpEmployee}
  //           activeOpacity={1}
  //           style={styles.driveToOfficeButton}>
  //           <View style={styles.circle}>{dropEmployee && <Check />}</View>
  //           <View style={styles.drivetoOfficeContainer}>
  //             <View
  //               style={{
  //                 ...styles.driveToOfficeCircle,
  //                 backgroundColor: dropEmployee
  //                   ? 'rgba(127, 127, 127, 1)'
  //                   : 'rgba(196, 196, 196, 1)',
  //               }}></View>
  //             <View
  //               style={{
  //                 ...styles.driveToOfficeLine,
  //                 backgroundColor: dropGuard
  //                   ? 'rgba(127, 127, 127, 1)'
  //                   : 'rgba(196, 196, 196, 1)',
  //               }}></View>
  //           </View>
  //           <Text style={styles.tripNameText}>Drive To Office</Text>
  //           <Text style={styles.tripTimeing}>{tripTimes.driveOfficeTime}</Text>
  //         </TouchableOpacity>

  //         {/*stop trip*/}
  //         <TouchableOpacity
  //           onPress={() => {
  //             if (!dropGuard) {
  //               navigation.navigate('StopTrip');
  //             }
  //           }}
  //           disabled={!dropEmployee}
  //           activeOpacity={1}
  //           style={{flexDirection: 'row', justifyContent: 'space-between'}}>
  //           <View style={styles.circle}>{dropGuard && <Check />}</View>
  //           <View
  //             style={{
  //               alignItems: 'center',
  //               marginLeft: -71,
  //               marginRight: -85,
  //             }}>
  //             <View
  //               style={{
  //                 width: horizontalScale(18),
  //                 height: verticalScale(20),
  //                 backgroundColor: dropGuard
  //                   ? 'rgba(127, 127, 127, 1)'
  //                   : 'rgba(196, 196, 196, 1)',
  //                 borderRadius: 50,
  //               }}></View>
  //           </View>
  //           <Text style={styles.tripNameText}>Stop trip</Text>
  //           <Text style={styles.tripTimeing}>{tripTimes.stopTripTime}</Text>
  //         </TouchableOpacity>
  //       </View>
  //       <TouchableOpacity
  //         onPress={() => {
  //           setDropGuard(true);
  //           setTripTimes(prevState => ({
  //             ...prevState,
  //             stopTripTime: formatTime(new Date()),
  //           }));
  //         }}
  //         activeOpacity={1}
  //         style={{
  //           width: horizontalScale(130),
  //           height: verticalScale(45),
  //           backgroundColor: 'rgba(197, 25, 125, 1)',
  //           alignItems: 'center',
  //           justifyContent: 'center',
  //           marginVertical: 30,
  //           borderRadius: 6,
  //           alignSelf: 'center',
  //         }}>
  //         <Text
  //           style={{
  //             color: 'white',
  //             fontFamily: FontFamily.regular,
  //             fontSize: 14,
  //           }}>
  //           Stop Trip
  //         </Text>
  //       </TouchableOpacity>
  //     </>
  //   );
  // };

  const labels = [
    'Start Trip',
    'Pickup Guard',
    'Pickup Employee',
    'Pickup Employee',
    'Stop Trip',
  ];
  const time = [
    'SsaS'
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
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            style={styles.bellButton}>
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
          {/* trip details */}
          {/* <View style={styles.tripDetails}> */}
          <Text style={styles.loginTripText}>Login Trip</Text>
          {/* </View> */}

          {/* <View>{renderStepBar()}</View> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginHorizontal: pixelSizeHorizontal(20),
            }}>
            <View>
              {labels.map((step, index) => (
                <TouchableOpacity key={index} onPress={() => {}}>
                  <View
                    style={{
                      marginVertical: pixelSizeVertical(2.6),
                      justifyContent: 'center',
                      height: verticalScale(90),
                      borderWidth: 1,
                      width: 50,
                      marginRight: pixelSizeHorizontal(10),
                    }}>
                    <View
                      style={{
                        width: horizontalScale(23),
                        height: verticalScale(25),
                        borderRadius: responsiveBorderRadius(50),
                        borderColor: 'rgba(102, 39, 110, 1)',
                        borderWidth: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {index < 1 ? (
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
                borderWidth: 1,
                width: 200,
              }}>
              <StepIndicator
                direction="vertical"
                customStyles={customStyles}
                currentPosition={1}
                labels={labels}
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
                      borderWidth: 1,
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

          <StartTripModal
            showConfirmModal={showStartTripModal}
            title={
              'Female employee should not travel alone in this trip without a guard.'
            }
            onPressOK={() => {
              setShowStartTripModal(false);
              // setStartTrip(true);
              // handleButtonClick();
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
              // setShowOtpModal(true);
            }}
            showConfirmModal={showConfirmModal}
          />
          {/* otp modal */}
          <CustomModal
            visible={showOtpModal}
            title={pickUpGuard ? 'Enter check-in pin' : 'Enter OTP'}
            onClose={() => setShowOtpModal(false)}
            onPressSubmitButton={() => {
              setShowOtpModal(false);
              setPickUpGuard(true);
              // setTripTimes(prevState => ({
              //   ...prevState,
              //   pickUpGuardTime: formatTime(new Date()),
              // }));
            }}
            onPressCancelButton={() => {
              setShowOtpModal(false);
            }}
          />
        </ScrollView>
        {/* <BottomTab activeTab="MyTrips" /> */}
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
  bellButton: {
    // width: 50,
    // height: 50,
    // backgroundColor: '#FFFFFF',
    // alignItems: 'center',
    // justifyContent: 'center',
    // borderRadius: 30,
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
    // width: horizontalScale(100),
    // height: verticalScale(110),
    // backgroundColor: 'rgba(229, 229, 229, 1)',
    // alignItems: 'center',
    // justifyContent: 'center',
    // borderRadius: responsiveBorderRadius(40),
    // marginTop: 20,
    alignSelf: 'center',
  },
  tripDetails: {
    alignItems: 'center',
    marginHorizontal: pixelSizeHorizontal(25),
    marginVertical: pixelSizeVertical(15),
  },
  areaName: {
    fontFamily: FontFamily.semiBold,
    color: 'black',
    fontSize: 16,
    marginVertical: verticalScale(8),
  },
  loginTripText: {
    fontFamily: FontFamily.medium,
    color: 'black',
    fontSize: fontPixel(16),
    alignSelf: 'center',
    marginTop: pixelSizeVertical(8),
  },
  tripDate: {
    fontFamily: FontFamily.semiBold,
    color: 'black',
    fontSize: 14,
    marginVertical: verticalScale(10),
  },
  circle: {
    width: horizontalScale(18),
    borderWidth: 1,
    borderColor: 'rgba(102, 39, 110, 1)',
    height: verticalScale(20),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tripTasks: {
    color: 'black',
    marginVertical: verticalScale(15),
    marginHorizontal: horizontalScale(25),
    fontFamily: FontFamily.semiBold,
  },
  stepIndicator: {
    height: verticalScale(350),

    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  stepBar: {
    flex: 1,
    marginHorizontal: 30,
  },
  tripNameText: {
    color: 'black',
    fontFamily: FontFamily.medium,
    fontSize: 14,
  },
  tripTimeing: {
    color: 'black',
    fontFamily: FontFamily.medium,
    fontSize: 14,
    width: 68,
    // textAlign: 'center',
  },
  starTripButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepbarStartTrip: {
    alignItems: 'center',
    marginLeft: -75,
    marginRight: -90,
  },
  stepbarCircle: {
    width: horizontalScale(18),
    height: verticalScale(20),
    borderRadius: 50,
  },
  stepBarLine: {
    width: horizontalScale(5),
    height: verticalScale(50),
  },
  pickUpGuardButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -1,
  },
  pickUpGuardContainer: {
    alignItems: 'center',
    marginRight: -60,
    marginLeft: -45,
  },
  pickupGuardCircle: {
    width: horizontalScale(18),
    height: verticalScale(20),
    borderRadius: 50,
    marginTop: -1,
  },
  pickupGuardLine: {
    width: horizontalScale(5),
    height: verticalScale(50),
    marginTop: -0.6,
  },
  pickupEmployeeButton: {flexDirection: 'row', justifyContent: 'space-between'},
  pickUpEmployeeContainer: {
    alignItems: 'center',
    marginRight: -35,
    marginLeft: -20,
  },
  pickupEmployeeCircle: {
    width: horizontalScale(18),
    height: verticalScale(20),
    borderRadius: 50,
    marginTop: -1,
  },
  pickupEmployeeLine: {
    width: horizontalScale(5),
    height: verticalScale(50),
    backgroundColor: 'rgba(196, 196, 196, 1)',
    marginTop: -1,
  },
  driveToOfficeButton: {flexDirection: 'row', justifyContent: 'space-between'},
  drivetoOfficeContainer: {
    alignItems: 'center',
    marginLeft: -35,
    marginRight: -50,
  },
  driveToOfficeCircle: {
    width: horizontalScale(18),
    height: verticalScale(20),

    borderRadius: 50,
    marginTop: -1,
  },
  driveToOfficeLine: {
    width: horizontalScale(5),
    height: verticalScale(50),
    marginTop: -1,
  },
});
