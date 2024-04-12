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
// import {UpcomingLists} from './Context/AppContext';
import ConformationModal from './Components/ConformationModal';
import {fontPixel, horizontalScale, verticalScale} from './Utils/Dimensions';
import {AppContext} from './Context/AppContext';
import {formatDate} from './Utils/ReusableFunctions';
import {useFocusEffect} from '@react-navigation/native';
import Loader from './Components/Loader';

const UpComingScreens = ({navigation}) => {
  const {driverRoasterList, getDriverList, driverId} = useContext(AppContext);

  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [driverId]),
  );
  const loadData = async () => {
    setLoader(true);
    await getDriverList(driverId);
    setLoader(false);
  };

  const handleItemClick = item => {
    if (item.roasterRouteType === 'Pick-Up') {
      navigation.navigate('MyTripDetail', {
        idRoasterDays: item?.idRoasterDays,
        driverContactNo: item?.driverContactNo,
        roastertype: item?.roasterType,
        // items: item
      });
    } else if (item.roasterRouteType === 'Drop') {
      // Navigate to a different screen for logout status
      navigation.navigate('MyLogoutTrip', {
        idRoasterDays: item?.idRoasterDays,
        driverContactNo: item?.driverContactNo,
        roastertype: item?.roasterType,
      });
    }
  };

  const renderItems = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          handleItemClick(item);
        }}>
        <View style={styles.headerText}>
          <Text style={styles.upcomingText}>{item?.roasterStatusDesc}</Text>
          <Text style={styles.dateText}>{formatDate(item?.roasterDate)}</Text>
        </View>
        <Text
          style={
            styles.ticketNo
          }>{`Route Type: ${item?.roasterRouteType}`}</Text>
        <Text
          style={
            styles.distanceText
          }>{`Distance: ${item?.routeDistance}`}</Text>
        <Text style={styles.timeText}>{`Time: ${item?.routeTime}`}</Text>
        <Text
          style={
            styles.timeText
          }>{`Id RoasterDays: ${item?.idRoasterDays}`}</Text>
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
    <View
      style={[
        styles.container,
        {
          justifyContent:
            driverRoasterList.upcoming.length === 0 ? 'center' : null,
        },
      ]}>
      {driverRoasterList.upcoming.length === 0 ? (
        <Text style={styles.noDataFound}>No Data Found</Text>
      ) : (
        <FlatList
          data={driverRoasterList.upcoming}
          renderItem={renderItems}
          style={{marginTop: 20}}
          showsVerticalScrollIndicator={false}
        />
      )}
      {loader && <Loader />}
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
  noDataFound: {
    color: '#000',
    fontFamily: FontFamily.medium,
    fontSize: fontPixel(18),
    textAlign: 'center',
  },
});
