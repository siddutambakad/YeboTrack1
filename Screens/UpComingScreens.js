import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useContext, useState} from 'react';
import FontFamily from './Styles/FontFamily';
import Cancel from '../assets/images/cancel.svg';
import {UpcomingLists} from './Context/AppContext';
import ConformationModal from './Components/ConformationModal';
import {fontPixel, horizontalScale, verticalScale} from './Utils/Dimensions';

const UpComingScreens = ({navigation}) => {
  // const [data, setData] = useState([1, 1, 1, 1, 1, 1]);
  const {setSelectedItem} = useContext(UpcomingLists);
  const [showModal, setShowModal] = useState(false);

  const handleItemClick = item => {
    setSelectedItem(item);
    navigation.navigate('MyTripDetail', {
      params: {items: item},
    });
  };

  const data = [1, 1, 1, 1, 1];

  const renderItems = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          handleItemClick(item);
        }}>
        <View style={styles.headerText}>
          <Text style={styles.upcomingText}>Upcoming</Text>
          <Text style={styles.dateText}>16-10-2021</Text>
        </View>
        <Text style={styles.ticketNo}>Ticket No.- #000988786</Text>
        <Text style={styles.distanceText}>Distance-2.4 miles</Text>
        <Text style={styles.timeText}>Time-23 mins</Text>
        <TouchableOpacity
          style={styles.cancelTripButton}
          onPress={() => {
            setShowModal(true);
          }}>
          <Text style={styles.cancelTripText}>Cancel Trip</Text>
        </TouchableOpacity>
        <ConformationModal
          title="Are you sure you want to cancel the trip?"
          onPressYes={() => {
            setShowModal(false);
          }}
          onPressNo={() => {
            setShowModal(false);
          }}
          showConfirmModal={showModal}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItems}
        style={{marginTop: 20}}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default UpComingScreens;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'rgba(246, 246, 246, 1)'},
  headerText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 15,
  },
  upcomingText: {
    color: 'black',
    fontSize: fontPixel(19),
    fontFamily: FontFamily.semiBold,
  },
  dateText: {
    color: 'black',
    fontSize: fontPixel(19),
    fontFamily: FontFamily.bold,
  },
  ticketNo: {
    color: 'black',
    marginHorizontal: 20,
    marginTop: 15,
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(14),
  },
  distanceText: {
    color: 'black',
    marginHorizontal: 20,
    marginTop: 8,
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(14),
  },
  timeText: {
    color: 'black',
    marginHorizontal: 20,
    marginVertical: 8,
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(14),
  },
  cancelTripButton: {
    width: horizontalScale(180),
    height: verticalScale(50),
    backgroundColor: 'rgba(197, 25, 125, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 15,
    borderRadius: 8,
  },
  cancelTripText: {
    color: 'white',
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(14),
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
    height: 230,
    width: '90%',
    alignItems: 'center',
    padding: 15,
  },
  modalText: {
    padding: 15,
    color: '#454545',
    fontFamily: FontFamily.regular,
    fontSize: 18,
    textAlign: 'left',
  },
  modalButtonText: {
    color: '#FFF8F2',
    fontFamily: FontFamily.regular,
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: '#C5197D',
    borderRadius: 3,
    width: 115,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonNo: {
    backgroundColor: '#454546',
    borderRadius: 3,
    width: 115,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonNoText: {
    color: '#FFF8F2',
    fontFamily: FontFamily.regular,
    fontSize: 16,
    fontWeight: '600',
  },
});
