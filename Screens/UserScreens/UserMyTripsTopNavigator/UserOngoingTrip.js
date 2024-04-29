import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {
  fontPixel,
  horizontalScale,
  pixelSizeHorizontal,
  pixelSizeVertical,
  responsiveBorderRadius,
  verticalScale,
} from '../../Utils/Dimensions';
import {formatDate} from '../../Utils/ReusableFunctions';
import FontFamily from '../../Styles/FontFamily';
import Cars from '../../../assets/images/cars.svg';
import RN from 'react-native';
import ConformationModal from '../../Components/ConformationModal';
import StartTripModal from '../../Components/StartTripModal';
import {AppContext} from '../../Context/AppContext';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../Components/Loader';
const SCREEN_HEIGHT = RN.Dimensions.get('window').height;
const {width, height} = Dimensions.get('window');

const UserOngoingTrip = ({navigation}) => {
  const {employeeRoasterList, getUserList, setLoader, loader, idEmployee} =
    useContext(AppContext);

  const [selectedCheckIn, setSelectedCheckIn] = useState(false);
  const [selectedCheckOut, setSelectedCheckOut] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [checkedInModal, setShowCheckedInModal] = useState(false);
  const [showCheckOutModal, setShowCheckOutModal] = useState(false);
  const [checkOutModal, setCheckOutModal] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [idEmployee]),
  );
  const loadData = async () => {
    setLoader(true);
    await getUserList(idEmployee);
    setLoader(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Cars width={horizontalScale(80)} height={verticalScale(80)} />
      </View>
      {employeeRoasterList?.onGoing.map((item, index) => {
        console.log(
          '\nitem',
          JSON.stringify(item?.idRoasterDetails, null, 2),
          '\n',
        );
        return (
          <>
            <View style={styles.slotAndDateText}>
              <Text style={styles.slottext}>SLOT# : N/A</Text>
              <Text style={styles.dateText}>{`${formatDate(
                item?.roasterPlanDtms,
              )}`}</Text>
            </View>
            <View style={styles.ticketNodetails}>
              <View>
                <Text style={styles.noOfPeopleText}>Booking Type</Text>
                <Text style={styles.distanceText}>Status</Text>
                <Text style={styles.timeText}>Vehicle</Text>
              </View>
              <View>
                {/* <Text style={styles.ticketText}>#000988786</Text> */}
                <Text style={styles.rosterText}>
                  {item?.roasterRoutetypeDesc}
                </Text>
                <Text style={styles.numberOfPeopleText}>
                  {item?.activeStatusDesc}
                </Text>
                <Text style={styles.distanceMilesText}>
                  {item?.vehicleRegNo}
                </Text>
              </View>
            </View>
            <View style={styles.checkInOtp}>
              <Text style={styles.checkInotpText}>Check In OTP : 5487</Text>
            </View>
            <View style={styles.radioButtonsContainer}>
              <View style={styles.checkInButton}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedCheckIn(!selectedCheckIn);
                    setSelectedCheckOut(false);
                    setShowConfirmModal(true);
                  }}>
                  <View style={styles.checkbox}>
                    {selectedCheckIn && <View style={styles.checkCircle} />}
                  </View>
                </TouchableOpacity>
                <Text style={styles.checkInText}>Check In</Text>
              </View>
              <View style={styles.CheckOutButton}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedCheckOut(!selectedCheckOut);
                    setSelectedCheckIn(false);
                    setShowCheckOutModal(true);
                  }}>
                  <View style={styles.checkbox}>
                    {selectedCheckOut && <View style={styles.checkCircle} />}
                  </View>
                </TouchableOpacity>
                <Text style={styles.checkOutText}>Check Out</Text>
              </View>
            </View>
            <View style={styles.finalButtons}>
              <TouchableOpacity style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancel Trip</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.raiseFeedbackButton}
                onPress={() => {
                  navigation.navigate('RaiseFeedBack', {
                    screen: 'WriteFeedBack',
                    params: {
                      idRoasterDetails: item?.idRoasterDetails,
                      driverRating: item?.driverRating,
                    },
                  });
                }}>
                <Text style={styles.raisefeedbackText}>Raise Feedback</Text>
              </TouchableOpacity>
            </View>
          </>
        );
      })}

      <ConformationModal
        onPressYes={() => {
          setShowConfirmModal(false);
          setShowCheckedInModal(true);
        }}
        onPressNo={() => {
          setShowConfirmModal(false);
        }}
        title={'Are you sure you want to check-in?'}
        showConfirmModal={showConfirmModal}
      />
      <StartTripModal
        onPressOK={() => {
          setShowCheckedInModal(false);
          setSelectedCheckIn(true);
        }}
        title={'Checked in successfully!'}
        showConfirmModal={checkedInModal}
        onPressNo={() => {
          setShowCheckedInModal(false);
        }}
      />
      {/* check out modal */}
      <ConformationModal
        onPressYes={() => {
          setShowCheckOutModal(false);
          setCheckOutModal(true);
        }}
        onPressNo={() => {
          setShowCheckOutModal(false);
        }}
        title={'Are you sure you want to check-Out?'}
        showConfirmModal={showCheckOutModal}
      />
      <StartTripModal
        onPressOK={() => {
          setCheckOutModal(false);
          setSelectedCheckOut(true);
        }}
        title={'Checked Out successfully!'}
        showConfirmModal={checkOutModal}
        onPressNo={() => {
          setCheckOutModal(false);
        }}
      />
      {loader && <Loader />}
    </ScrollView>
  );
};

export default UserOngoingTrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  imageContainer: {
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: 'rgba(229, 229, 229, 1)',
    width: SCREEN_HEIGHT * 0.15,
    height: SCREEN_HEIGHT * 0.15,
    borderRadius: (SCREEN_HEIGHT * 0.15) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: 50,
  },
  slotAndDateText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: pixelSizeHorizontal(20),
    alignItems: 'center',
    marginVertical: pixelSizeVertical(20),
  },
  slottext: {
    color: 'black',
    fontSize: fontPixel(16),
    fontFamily: FontFamily.regular,
  },
  dateText: {
    color: 'black',
    fontFamily: FontFamily.semiBold,
    fontSize: fontPixel(16),
  },
  trackAndCancelButton: {
    marginHorizontal: pixelSizeHorizontal(20),
  },
  trackButton: {
    width: horizontalScale(175),
    height: verticalScale(55),
    backgroundColor: 'rgba(197, 25, 125, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    // marginVertical: 30,
    alignSelf: 'center',
    borderRadius: 8,
  },
  trackText: {
    color: 'white',
    fontSize: fontPixel(14),
  },
  ticketNodetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: pixelSizeHorizontal(20),
    marginBottom: pixelSizeVertical(10),
  },
  tripNoText: {
    color: 'black',
    fontSize: fontPixel(16),
    fontFamily: FontFamily.semiBold,
  },
  noOfPeopleText: {
    color: 'black',
    fontSize: fontPixel(16),
    fontFamily: FontFamily.semiBold,
  },
  distanceText: {
    color: 'black',
    fontSize: fontPixel(16),
    fontFamily: FontFamily.semiBold,
  },
  timeText: {
    color: 'black',
    fontSize: fontPixel(16),
    fontFamily: FontFamily.semiBold,
  },
  rosterText: {
    color: 'black',
    fontSize: fontPixel(16),
    fontFamily: FontFamily.semiBold,
  },
  numberOfPeopleText: {
    color: 'black',
    fontSize: fontPixel(16),
    fontFamily: FontFamily.semiBold,
  },
  distanceMilesText: {
    color: 'black',
    fontSize: fontPixel(16),
    fontFamily: FontFamily.semiBold,
  },
  minutesText: {
    color: 'black',
    fontSize: fontPixel(16),
    fontFamily: FontFamily.semiBold,
  },
  checkInOtp: {
    backgroundColor: '#C4C4C4',
    width: width * 0.6,
    height: height * 0.05,
    alignSelf: 'center',
    marginVertical: pixelSizeVertical(15),
    borderRadius: responsiveBorderRadius(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkInotpText: {
    color: 'black',
    fontSize: fontPixel(14),
    fontFamily: FontFamily.semiBold,
  },
  checkbox: {
    width: SCREEN_HEIGHT * 0.03,
    height: SCREEN_HEIGHT * 0.03,
    borderRadius: (SCREEN_HEIGHT * 0.03) / 2,
    borderWidth: 1,
    borderColor: '#65276F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircle: {
    backgroundColor: '#65276F',
    width: SCREEN_HEIGHT * 0.016,
    height: SCREEN_HEIGHT * 0.016,
    borderRadius: (SCREEN_HEIGHT * 0.016) / 2,
  },
  checkInText: {
    color: 'black',
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(16),
    paddingLeft: pixelSizeHorizontal(15),
  },
  checkInButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  CheckOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkOutText: {
    color: 'black',
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(16),
    paddingLeft: pixelSizeHorizontal(15),
  },
  radioButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: pixelSizeHorizontal(30),
    paddingVertical: pixelSizeVertical(20),
  },
  cancelButton: {
    width: width * 0.4,
    height: height * 0.07,
    backgroundColor: '#C5197D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveBorderRadius(10),
  },
  cancelText: {
    color: 'white',
    fontSize: fontPixel(14),
    fontFamily: FontFamily.regular,
  },
  raiseFeedbackButton: {
    width: width * 0.4,
    height: height * 0.07,
    backgroundColor: '#454546',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveBorderRadius(10),
  },
  raisefeedbackText: {
    color: 'white',
    fontSize: fontPixel(14),
    fontFamily: FontFamily.regular,
  },
  finalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: pixelSizeHorizontal(30),
    paddingVertical: pixelSizeVertical(20),
  },
});
