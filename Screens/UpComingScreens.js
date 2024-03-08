import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import FontFamily from './Styles/FontFamily';
import Cancel from '../assets/images/cancel.svg';

const UpComingScreens = () => {
  const [data, setData] = useState([1, 1, 1, 1, 1, 1]);
  const [showModal, setShowModal] = useState(false);

  const renderItems = (index, item) => {
    return (
      <View>
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
        <Modal visible={showModal} animationType="fade" transparent={true}>
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
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingHorizontal: 30,
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
        </Modal>
      </View>
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
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
  },
  dateText: {
    color: 'black',
    fontSize: 18,
    fontFamily: FontFamily.bold,
  },
  ticketNo: {color: 'black', marginHorizontal: 20, marginTop: 15},
  distanceText: {color: 'black', marginHorizontal: 20, marginVertical: 8},
  timeText: {color: 'black', marginHorizontal: 20, marginVertical: 8},
  cancelTripButton: {
    width: '38%',
    height: 50,
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
