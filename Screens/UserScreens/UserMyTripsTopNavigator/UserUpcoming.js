import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import {
  fontPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  responsiveBorderRadius,
} from '../../Utils/Dimensions';
import FontFamily from '../../Styles/FontFamily';
import ConformationModal from '../../Components/ConformationModal';

const {width, height} = Dimensions.get('window');

const UserUpcoming = () => {
  const data = [
    {
      id: 1,
      roasterType: 'Upcoming',
      tripType: 'pickUp',
      date: '16-02-2024',
      logout: '8:00 pm',
      bookingType: 'Roaster',
      vehicle: 'MI 01 6667 (R6667)',
      Sequence: '1',
      CheckInOTP: '5487',
      Status: 'Vehicle allocated',
    },
    {
      id: 2,
      roasterType: 'Upcoming',
      tripType: 'pickUp',
      date: '16-02-2024',
      logout: '8:00 pm',
      bookingType: 'Roaster',
      vehicle: 'MI 01 6667 (R6667)',
      Sequence: '1',
      CheckInOTP: '5487',
      Status: 'Vehicle allocated',
    },
    {
      id: 3,
      roasterType: 'Upcoming',
      tripType: 'pickUp',
      date: '16-02-2024',
      logout: '8:00 pm',
      bookingType: 'Roaster',
      vehicle: 'MI 01 6667 (R6667)',
      Sequence: '1',
      CheckInOTP: '5487',
      Status: 'Vehicle allocated',
    },
    {
      id: 4,
      roasterType: 'Upcoming',
      tripType: 'logout',
      date: '16-02-2024',
      logout: '8:00 pm',
      bookingType: 'Roaster',
      vehicle: 'MI 01 6667 (R6667)',
      Status: 'Vehicle allocated',
      Sequence: '1',
      CheckInOTP: '5487',
    },
  ];
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const renderItems = ({item}) => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.roasterType}>
          <Text style={styles.roasterTypeText}>{item?.roasterType}</Text>
          <Text style={styles.roasterDate}>{item?.date}</Text>
        </View>
        <Text style={styles.logoutText}>{`LogOut: ${item.logout}`}</Text>
        <Text
          style={
            styles.bookingTypeText
          }>{`BookingType: ${item.bookingType}`}</Text>
        <Text style={styles.StatusText}>{`Status: ${item.Status}`}</Text>
        <Text style={styles.vehicleText}>{`vehicle: ${item.vehicle}`}</Text>
        <Text style={styles.SequenceText}>{`Sequence: ${item.Sequence}`}</Text>
        <Text
          style={
            styles.CheckInOTPText
          }>{`CheckInOTP: ${item.CheckInOTP}`}</Text>
        <TouchableOpacity style={styles.cancelButton} onPress={() => {
          setShowConfirmModal(true)
        }}>
          <Text style={styles.cancelButtonText}>Cancel Trip</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList data={data} renderItem={renderItems} />
      <ConformationModal
      onPressYes={() => {
        setShowConfirmModal(false)
      }}
      onPressNo={() => {
        setShowConfirmModal(false)
      }}
      title={'Are you sure you want to cancel the trip?'}
      showConfirmModal={showConfirmModal}
      />
    </View>
  );
};

export default UserUpcoming;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  roasterType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: pixelSizeHorizontal(20),
    paddingVertical: pixelSizeVertical(20),
  },
  roasterTypeText: {
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(20),
    color: 'black',
  },
  roasterDate: {
    fontFamily: FontFamily.semiBold,
    fontSize: fontPixel(20),
    color: 'black',
  },
  cardContainer: {
    flex: 1,
  },
  logoutText: {
    fontFamily: FontFamily.medium,
    fontSize: fontPixel(14),
    color: 'black',
    paddingHorizontal: pixelSizeHorizontal(20),
    paddingVertical: pixelSizeVertical(5),
  },
  bookingTypeText: {
    fontFamily: FontFamily.medium,
    fontSize: fontPixel(14),
    color: 'black',
    paddingHorizontal: pixelSizeHorizontal(20),
    paddingVertical: pixelSizeVertical(5),
  },
  StatusText: {
    fontFamily: FontFamily.medium,
    fontSize: fontPixel(14),
    color: 'black',
    paddingHorizontal: pixelSizeHorizontal(20),
    paddingVertical: pixelSizeVertical(5),
  },
  vehicleText: {
    fontFamily: FontFamily.medium,
    fontSize: fontPixel(14),
    color: 'black',
    paddingHorizontal: pixelSizeHorizontal(20),
    paddingVertical: pixelSizeVertical(5),
  },
  SequenceText: {
    fontFamily: FontFamily.medium,
    fontSize: fontPixel(14),
    color: 'black',
    paddingHorizontal: pixelSizeHorizontal(20),
    paddingVertical: pixelSizeVertical(5),
  },
  CheckInOTPText: {
    fontFamily: FontFamily.medium,
    fontSize: fontPixel(14),
    color: 'black',
    paddingHorizontal: pixelSizeHorizontal(20),
    paddingVertical: pixelSizeVertical(5),
  },
  cancelButton: {
    width: width * 0.4,
    height: height * 0.065,
    backgroundColor: '#C5197D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveBorderRadius(10),
    marginHorizontal: pixelSizeHorizontal(20),
    marginVertical: pixelSizeVertical(10),
  },
  cancelButtonText: {
    color: 'white',
    fontSize: fontPixel(16),
    fontFamily: FontFamily.regular,
  },
});
