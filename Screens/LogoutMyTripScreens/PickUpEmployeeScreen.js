import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Back from '../../assets/images/VectorBack.svg';
import Sos from '../../assets/images/sos.svg';
import Bell from '../../assets/images/bellIcon.svg';
import Clock from '../../assets/images/clock.svg';
import FontFamily from '../Styles/FontFamily';
import Call from '../../assets/images/call.svg';
import Location from '../../assets/images/location.svg';
import {
  fontPixel,
  horizontalScale,
  pixelSizeHorizontal,
  pixelSizeVertical,
  verticalScale,
} from '../Utils/Dimensions';
import CustomModal from '../Components/Modal';
import BottomTab from '../Components/BottomTab';
import RN from 'react-native';
import { handleCallPress, openGoogleMap } from '../Utils/ReusableFunctions';

const SCREEN_HEIGHT = RN.Dimensions.get('window').height;

const PickUpEmployeeScreen = ({navigation, props}) => {
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpSubmitedForEmployee, setOtpSubmitedForEmployee] = useState(false);
  const [runningTime, setRunningTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setRunningTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

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
    const time = formatTime(currentTime);
    navigation.navigate('MyLogoutTrip', {
      otpSubmitedForEmployee: true,
      pickUpTime: time,
    });
  };
  // Format the running time into minutes and seconds
  const minutes = Math.floor(runningTime / 60);
  const seconds = runningTime % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;

    const openGoogleMaps = () => {
      openGoogleMap('37.7749', '-122.4194');
    };
  
    const handleDialPress = () => {
      handleCallPress('123456789');
    };

  return (
    <View style={styles.container}>
      {/* header */}
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
        <View style={styles.container1}>
          <Clock width={horizontalScale(100)} height={verticalScale(100)} />
          <View style={styles.timeAndMinutes}>
            <Text style={styles.timeText}>{formattedTime}</Text>
            <Text style={styles.minutesText}>mins</Text>
          </View>
          <Text style={styles.waitingText}>Waiting for employee check-in</Text>
        </View>
        <View style={styles.container2}>
          <View style={styles.mainContainer}>
            <View style={styles.imageAndCall}>
              <Image
                source={require('../../assets/images/profile.png')}
                style={styles.profileImage}
              />
              <View style={{paddingLeft: 10}}>
                <Text style={styles.profileText}>John Doe</Text>
                <Text style={styles.pickupTimeText}>
                  Pickup Time - 10:13 am
                </Text>
              </View>
            </View>
            <View style={styles.callAndLocation}>
              <TouchableOpacity
                onPress={() => {
                  handleDialPress();
                }}>
                <Call width={horizontalScale(45)} height={verticalScale(45)} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  openGoogleMaps();
                }}>
                <Location
                  width={horizontalScale(45)}
                  height={verticalScale(45)}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.checkInButton}
            onPress={() => {
              setShowOtpModal(true);
            }}>
            <Text style={styles.checkInText}>Check In</Text>
          </TouchableOpacity>
        </View>
        <BottomTab activeTab="MyTrips" />
        <CustomModal
          visible={showOtpModal}
          title={'Enter check-in pin'}
          onClose={() => setShowOtpModal(false)}
          onPressSubmitButton={() => {
            setShowOtpModal(false);
            setOtpSubmitedForEmployee(true);
            setIsRunning(false);
            handleButtonClick();
          }}
          onPressCancelButton={() => {
            setShowOtpModal(false);
          }}
        />
      </View>
    </View>
  );
};

export default PickUpEmployeeScreen;

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
  timeAndMinutes: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: pixelSizeVertical(20),
    marginLeft: pixelSizeHorizontal(30),
  },
  timeText: {
    width: horizontalScale(130),
    height: verticalScale(55),
    fontSize: fontPixel(30),
    color: 'black',
    fontFamily: FontFamily.medium,
    backgroundColor: 'rgba(231, 231, 231, 1)',
    textAlign: 'center',
    borderRadius: 8,
    textAlignVertical: 'center',
  },
  minutesText: {
    color: 'black',
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(14),
    paddingLeft: 8,
  },
  waitingText: {
    fontFamily: FontFamily.medium,
    fontSize: fontPixel(14),
    color: 'black',
    marginTop: 10,
  },
  profileImage: {
    width: SCREEN_HEIGHT * 0.06,
    height: SCREEN_HEIGHT * 0.06,
    borderRadius: (SCREEN_HEIGHT * 0.06) / 2,
    // resizeMode: 'contain',
  },
  container1: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 0.5,
  },
  container2: {flex: 0.5},
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginVertical: 20,
  },
  imageAndCall: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileText: {
    color: 'black',
    fontFamily: FontFamily.semiBold,
    fontSize: fontPixel(14),
  },
  pickupTimeText: {
    color: 'black',
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(12),
  },
  callAndLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkInButton: {
    width: horizontalScale(130),
    height: verticalScale(50),
    backgroundColor: 'rgba(197, 25, 125, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    borderRadius: 6,
    alignSelf: 'center',
  },
  checkInText: {
    color: 'white',
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(14),
  },
});
