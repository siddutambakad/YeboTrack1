import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Back from '../assets/images/VectorBack.svg';
import Sos from '../assets/images/sos.svg';
import Bell from '../assets/images/bell.svg';
import MyTripNavigator from './Components/MyTripNavigator';
import {UpcomingLists} from './Context/AppContext';
import StartTripImage from '../assets/images/startTripCar.svg';
import {horizontalScale, verticalScale} from './Utils/Dimensions';
import FontFamily from './Styles/FontFamily';
import Check from '../assets/images/check.svg';
import Cancel from '../assets/images/cancel.svg';
import CustomModal from './Components/Modal';
import PickupGuardModal from './Components/PickupGuardModal';
import ConformationModal from './Components/ConformationModal';

const MyTripsScreen = ({navigation}) => {
  const {selectedItem} = useContext(UpcomingLists);
  const [startTrip, setStartTrip] = useState(false);
  const [pickUpGuard, setPickUpGuard] = useState(false);
  const [pickUpEmployee, setPickUpEmployee] = useState(false);
  const [dropEmployee, setDropEmployee] = useState(false);
  const [dropGuard, setDropGuard] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpSubmited, setOtpSubmited] = useState(false);
  const [modalPopupOptions, setModalPopupOptions] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [otpSubmittedForPickupEmployee, setOtpSubmittedForPickupEmployee] =
    useState(false);

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
      setModalPopupOptions({
        button_text: 'Skip Employee Pickup',
        button_action: () => {
          setShowConfirmModal(true);
          setShowModal(false);
        },
        button_text2: 'Location Reached',
        button_action2: () => {
          setShowModal(false);
        },
        isSocialMediaRequired: true,
        isPickupEmployee: true,
      });
      setShowModal(true);
    }
  };

  const renderStepBar = () => {
    return (
      <ScrollView style={styles.startTripContainer}>
        <View style={styles.startSubContainer}>
          <StartTripImage width={60} height={60} />
        </View>
        {/* trip details */}
        <View style={styles.tripDetails}>
          <View>
            <Text style={styles.areaName}>JP Nagar</Text>
            <Text style={styles.loginTripText}>Login Trip</Text>
            <Text style={styles.tripId}>Trip ID- 000988786</Text>
          </View>
          <View>
            <Text style={styles.tripDate}>16-10-2021</Text>
            <Text style={styles.tripTime}>10:00 am- 11:35 am</Text>
            <Text style={styles.tripKm}>2.2 Km</Text>
          </View>
        </View>
        {/* stepbar starts */}
        <Text style={styles.tripTasks}>Trip Tasks</Text>
        <View style={styles.stepBar}>
          {/* stepbar*/}
          {/* starttrip */}
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setStartTrip(true);
            }}
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.circle}>{startTrip && <Check />}</View>
            <View
              style={{
                alignItems: 'center',
                marginLeft: -75,
                marginRight: -90,
              }}>
              <View
                style={{
                  width: horizontalScale(18),
                  height: verticalScale(20),
                  backgroundColor: startTrip
                    ? 'rgba(127, 127, 127, 1)'
                    : 'rgba(196, 196, 196, 1)',
                  borderRadius: 50,
                }}></View>
              <View
                style={{
                  width: horizontalScale(5),
                  height: verticalScale(50),
                  backgroundColor: pickUpGuard
                    ? 'rgba(127, 127, 127, 1)'
                    : 'rgba(196, 196, 196, 1)',
                }}></View>
            </View>
            <Text style={styles.tripNameText}>Start trip</Text>
            <Text style={styles.tripTimeing}>10:00 am</Text>
          </TouchableOpacity>
          {/* pickup guard */}
          <TouchableOpacity
            onPress={handlePickupGuardClick}
            activeOpacity={1}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: -1,
            }}>
            <View style={styles.circle}>{pickUpGuard && <Check />}</View>
            <View
              style={{
                alignItems: 'center',
                marginRight: -60,
                marginLeft: -45,
              }}>
              <View
                style={{
                  width: horizontalScale(18),
                  height: verticalScale(20),
                  backgroundColor: pickUpGuard
                    ? 'rgba(127, 127, 127, 1)'
                    : 'rgba(196, 196, 196, 1)',
                  borderRadius: 50,
                }}></View>
              <View
                style={{
                  width: horizontalScale(5),
                  height: verticalScale(50),
                  backgroundColor: pickUpEmployee
                    ? 'rgba(127, 127, 127, 1)'
                    : 'rgba(196, 196, 196, 1)',
                }}></View>
            </View>
            <Text style={styles.tripNameText}>Pickup Guard</Text>
            <Text style={styles.tripTimeing}>10:00 am</Text>
          </TouchableOpacity>
          {/* pickup employee */}
          <TouchableOpacity
            activeOpacity={1}
            onPress={handlePickupEmployeeClick}
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.circle}>{pickUpEmployee && <Check />}</View>
            <View
              style={{
                alignItems: 'center',
                marginRight: -30,
                marginLeft: -18,
              }}>
              <View
                style={{
                  width: horizontalScale(18),
                  height: verticalScale(20),
                  backgroundColor: pickUpEmployee
                    ? 'rgba(127, 127, 127, 1)'
                    : 'rgba(196, 196, 196, 1)',
                  borderRadius: 50,
                }}></View>
              <View
                style={{
                  width: horizontalScale(5),
                  height: verticalScale(50),
                  backgroundColor: 'rgba(196, 196, 196, 1)',
                }}></View>
            </View>
            <Text style={styles.tripNameText}>Pickup Employee</Text>
            <Text style={styles.tripTimeing}>10:00 am</Text>
          </TouchableOpacity>
          {/*Drive to Office */}
          <TouchableOpacity
            activeOpacity={1}
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.circle}>{dropEmployee && <Check />}</View>
            <View
              style={{
                alignItems: 'center',
                marginLeft: -31,
                marginRight: -40,
              }}>
              <View
                style={{
                  width: horizontalScale(18),
                  height: verticalScale(20),
                  backgroundColor: 'rgba(196, 196, 196, 1)',
                  borderRadius: 50,
                }}></View>
              <View
                style={{
                  width: horizontalScale(5),
                  height: verticalScale(50),
                  backgroundColor: 'rgba(196, 196, 196, 1)',
                }}></View>
            </View>
            <Text style={styles.tripNameText}>Drive To Office</Text>
            <Text style={styles.tripTimeing}>10:00 am</Text>
          </TouchableOpacity>
          {/*Drop Guard */}
          <TouchableOpacity
            activeOpacity={1}
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.circle}>{dropGuard && <Check />}</View>
            <View
              style={{
                alignItems: 'center',
                marginLeft: -49,
                marginRight: -60,
              }}>
              <View
                style={{
                  width: horizontalScale(18),
                  height: verticalScale(20),
                  backgroundColor: 'rgba(196, 196, 196, 1)',
                  borderRadius: 50,
                }}></View>
            </View>
            <Text style={styles.tripNameText}>Drop Guard</Text>
            <Text style={styles.tripTimeing}>10:00 am</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            width: horizontalScale(130),
            height: verticalScale(45),
            backgroundColor: 'rgba(197, 25, 125, 1)',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 25,
            borderRadius: 6,
            alignSelf: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: FontFamily.regular,
              fontSize: 14,
            }}>
            Stop Trip
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {/* header starts */}
      <View style={styles.header}>
        <View>
          <TouchableOpacity
            style={styles.backbutton}
            onPress={() => {
              navigation.navigate('Driver');
            }}>
            <Back width={30} height={30} />
            <Text style={styles.backbuttonText}>My Trips</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.subMainHeader}>
          <TouchableOpacity style={{paddingRight: 20}}>
            <Sos width={50} height={50} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            style={styles.bellButton}>
            <Bell width={25} height={25} fill={'#C5197D'} />
          </TouchableOpacity>
        </View>
      </View>
      {/* sub container starts */}
      <View style={styles.myTripNavi}>
        {selectedItem ? renderStepBar() : <MyTripNavigator />}

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
            setShowOtpModal(true);
          }}
          showConfirmModal={showConfirmModal}
        />

        <CustomModal
          visible={showOtpModal}
          title={pickUpGuard ? 'Enter check-in pin' : 'Enter OTP'}
          onClose={() => setShowOtpModal(false)}
          onPressSubmitButton={() => {
            setShowOtpModal(false);
            setPickUpGuard(true);
            setOtpSubmited(true);
            if (modalPopupOptions.isPickupEmployee) {
              setOtpSubmittedForPickupEmployee(true);
              setPickUpEmployee(true);
            }
          }}
          onPressCancelButton={() => {
            setShowOtpModal(false);
          }}
        />
      </View>
    </View>
  );
};

export default MyTripsScreen;

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
    fontSize: 18,
    paddingLeft: 20,
  },
  subMainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bellButton: {
    width: 50,
    height: 50,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  myTripNavi: {
    flex: 1,
    backgroundColor: 'rgba(246, 246, 246, 1)',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  startTripContainer: {
    flex: 1,
    marginTop: verticalScale(10),
  },
  startSubContainer: {
    width: horizontalScale(100),
    height: verticalScale(102),
    backgroundColor: 'rgba(229, 229, 229, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    marginTop: 20,
    alignSelf: 'center',
  },
  tripDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: horizontalScale(25),
    marginTop: verticalScale(25),
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
    fontSize: 14,
  },
  tripId: {
    fontFamily: FontFamily.medium,
    color: 'black',
    fontSize: 14,
  },
  tripDate: {
    fontFamily: FontFamily.semiBold,
    color: 'black',
    fontSize: 14,
    marginVertical: verticalScale(10),
  },
  tripTime: {
    fontFamily: FontFamily.medium,
    color: 'black',
    fontSize: 14,
  },
  tripKm: {
    fontFamily: FontFamily.medium,
    color: 'black',
    fontSize: 14,
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
  stepBar: {
    marginHorizontal: horizontalScale(25),
    marginVertical: verticalScale(20),
  },
  tripTasks: {
    color: 'black',
    marginVertical: verticalScale(15),
    marginHorizontal: horizontalScale(25),
    fontFamily: FontFamily.semiBold,
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalContent: {
    backgroundColor: '#FFF8F2',
    borderRadius: 10,
    width: horizontalScale(330),
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  modalImage: {
    width: horizontalScale(72),
    height: verticalScale(80),
    alignSelf: 'flex-start',
    marginHorizontal: 30,
  },
  modalText1: {
    alignSelf: 'flex-start',
    paddingLeft: 30,
    fontFamily: FontFamily.semiBold,
    color: 'black',
    fontSize: 16,
    marginTop: 5,
  },
  modalText2: {
    alignSelf: 'flex-start',
    paddingLeft: 30,
    fontFamily: FontFamily.regular,
    color: 'black',
    fontSize: 12,
  },
  locationText: {
    alignSelf: 'flex-start',
    paddingLeft: 30,
    fontFamily: FontFamily.medium,
    color: 'black',
    fontSize: 14,
    marginVertical: 8,
  },
  addressText: {
    alignSelf: 'flex-start',
    paddingHorizontal: 30,
    fontFamily: FontFamily.medium,
    color: 'black',
    fontSize: 12,
    marginTop: 5,
  },
  guardCheckInButton: {
    alignSelf: 'flex-end',
    width: horizontalScale(100),
    height: verticalScale(45),
    backgroundColor: 'rgba(197, 25, 125, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginVertical: 15,
    marginHorizontal: 20,
  },
  guardCheckInText: {
    fontSize: 10,
    color: 'white',
    fontFamily: FontFamily.regular,
  },
});
