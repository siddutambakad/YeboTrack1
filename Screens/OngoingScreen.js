import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Cars from '../assets/images/cars.svg';
import FontFamily from './Styles/FontFamily';
import Cancel from '../assets/images/cancel.svg';
import {
  fontPixel,
  horizontalScale,
  moderateScale,
  pixelSizeHorizontal,
  pixelSizeVertical,
  verticalScale,
} from './Utils/Dimensions';
import {AppContext} from './Context/AppContext';
import {formatDate} from './Utils/ReusableFunctions';
import Loader from './Components/Loader';
import RN from 'react-native';
const SCREEN_HEIGHT = RN.Dimensions.get('window').height;

const OngoingScreen = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const {
    driverRoasterList: {onGoing},
  } = useContext(AppContext);
  console.log("🚀 ~ OngoingScreen ~ onGoing:", onGoing)
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoader(false);
    }, 800);

    return () => clearTimeout(delay);
  }, []);
  return (
    <ScrollView style={styles.container}>
      {onGoing.length === 0 ? (
        <View style={styles.noDataFoundContainer}>
          <Text style={styles.noDataFoundText}>No Data for Ongoing Trips</Text>
        </View>
      ) : (
        <>
          <View style={styles.imageContainer}>
            <Cars width={horizontalScale(80)} height={verticalScale(80)} />
          </View>
          <View style={{backgroundColor: 'rgba(246, 246, 246, 1)'}}>
            {onGoing.map((roaster, index) => (
              <>
                <View key={index} style={styles.slotAndDateText}>
                  <Text style={styles.slottext}>SLOT# : N/A</Text>
                  <Text style={styles.dateText}>
                    {formatDate(roaster?.roasterDate)}
                  </Text>
                </View>
                <View style={styles.ticketNodetails}>
                  <View>
                    {/* <Text style={styles.ticketNoText}>Ticket No</Text> */}
                    <Text style={styles.tripNoText}>Trip Type</Text>
                    <Text style={styles.noOfPeopleText}>No of people</Text>
                    <Text style={styles.distanceText}>Distance</Text>
                    <Text style={styles.timeText}>Time</Text>
                  </View>
                  <View>
                    {/* <Text style={styles.ticketText}>#000988786</Text> */}
                    <Text style={styles.rosterText}>
                      {roaster?.roasterRouteType}
                    </Text>
                    <Text style={styles.numberOfPeopleText}>
                      {roaster?.noOfPeople}
                    </Text>
                    <Text style={styles.distanceMilesText}>
                      {roaster?.routeDistance}
                    </Text>
                    <Text style={styles.minutesText}>{roaster?.routeTime}</Text>
                  </View>
                </View>
              </>
            ))}
          </View>
          <View style={styles.trackAndCancelButton}>
            <TouchableOpacity
              style={styles.trackButton}
              onPress={() => {
                  if (onGoing[0].roasterType === 1) {
                    navigation.navigate('MyTripDetail', {
                      resumeOngoingTrip: true,
                      idRoasterDays: onGoing[0].idRoasterDays,
                      driverContactNo: onGoing[0].driverContactNo,
                      roasterType: onGoing[0].roasterType,
                    });
                  } else {
                    navigation.navigate('MyLogoutTrip', {
                      resumeOngoingTrip: true,
                      idRoasterDays: onGoing[0].idRoasterDays,
                      driverContactNo: onGoing[0].driverContactNo,
                      roasterType: onGoing[0].roasterType,
                    });
                  }
                  
              }}>
              <Text style={styles.trackText}>Track Trip</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* <Modal visible={showModal} animationType="fade" transparent={true}>
        <TouchableWithoutFeedback
          onPress={() => {
            setShowModal(false);
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={{alignSelf: 'flex-end', padding: 8}}
                onPress={() => {
                  setShowModal(false);
                }}>
                <Cancel />
              </TouchableOpacity>
              <Text style={styles.modalText}>
                {'Are you sure you want to cancel the trip?'}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  width: '100%',
                  paddingHorizontal: pixelSizeHorizontal(20),
                  marginBottom: pixelSizeVertical(30),
                }}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    setShowModal(false);
                  }}>
                  <Text style={styles.modalButtonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButtonNo}
                  onPress={() => {
                    setShowModal(false);
                  }}>
                  <Text style={styles.modalButtonNoText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal> */}
      {loader && <Loader />}
    </ScrollView>
  );
};
 

export default OngoingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(246, 246, 246, 1)',
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
    fontWeight: '600',
    fontFamily: FontFamily.semiBold,
    fontSize: fontPixel(16),
  },
  totalFare: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: pixelSizeHorizontal(20),
    alignItems: 'center',
    marginVertical: 20,
  },
  totalFareText: {
    color: 'rgba(102, 39, 110, 1)',
    fontSize: fontPixel(16),
    fontFamily: FontFamily.semiBold,
  },
  totalAmountText: {
    color: 'rgba(102, 39, 110, 1)',
    fontWeight: '600',
    fontFamily: FontFamily.semiBold,
    fontSize: fontPixel(16),
    paddingRight: 55,
  },
  trackAndCancelButton: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    marginHorizontal: pixelSizeHorizontal(20),
  },
  cancelButton: {
    width: horizontalScale(170),
    height: verticalScale(50),
    backgroundColor: 'rgba(197, 25, 125, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    // marginVertical: 30,
    // alignSelf: 'center',
    borderRadius: 8,
  },
  cancelTripText: {
    color: 'white',
    fontSize: fontPixel(12),
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
    fontSize: fontPixel(12),
  },
  ticketNodetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: pixelSizeHorizontal(20),
    marginBottom: pixelSizeVertical(10),
  },
  ticketNoText: {
    color: 'black',
    fontSize: fontPixel(16),
    fontFamily: FontFamily.semiBold,
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
  ticketText: {
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#FFF8F2',
    borderRadius: 10,
    // height: verticalScale(180),
    width: horizontalScale(350),
    alignItems: 'center',
    padding: 15,
  },
  modalText: {
    padding: 15,
    color: '#454545',
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(18),
    textAlign: 'left',
    paddingHorizontal: pixelSizeHorizontal(30),
    // width: '100%'
  },
  modalButtonText: {
    color: '#FFF8F2',
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(16),
  },
  modalButton: {
    backgroundColor: '#C5197D',
    borderRadius: 3,
    width: horizontalScale(110),
    height: verticalScale(45),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonNo: {
    backgroundColor: '#454546',
    borderRadius: 3,
    width: horizontalScale(110),
    height: verticalScale(45),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonNoText: {
    color: '#FFF8F2',
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(16),
    fontWeight: '600',
  },
  noDataFoundContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: pixelSizeVertical(50),
  },
  noDataFoundText: {
    fontSize: fontPixel(20),
    fontFamily: FontFamily.semiBold,
    color: 'black',
  },
});
