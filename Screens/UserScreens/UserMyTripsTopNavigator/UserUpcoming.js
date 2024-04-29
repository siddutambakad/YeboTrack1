import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {
  fontPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  responsiveBorderRadius,
} from '../../Utils/Dimensions';
import FontFamily from '../../Styles/FontFamily';
import ConformationModal from '../../Components/ConformationModal';
import {AppContext} from '../../Context/AppContext';
import {formatDate} from '../../Utils/ReusableFunctions';
import { useFocusEffect } from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const UserUpcoming = () => {
  const {employeeRoasterList, idEmployee, getUserList, setLoader, loader} = useContext(AppContext);
  
  const [showConfirmModal, setShowConfirmModal] = useState(false);
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

  const renderItems = ({item}) => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.roasterType}>
          <Text style={styles.roasterTypeText}>{item?.roasterStatusDesc}</Text>
          <Text style={styles.roasterDate}>
            {formatDate(item?.roasterPlanDtms)}
          </Text>
        </View>
        <Text
          style={
            styles.logoutText
          }>{`RoasterRouteTypeDesc : ${item.roasterRoutetypeDesc}`}</Text>
        <Text
          style={
            styles.bookingTypeText
          }>{`IdRoasterDays: ${item.idRoasterDays}`}</Text>
        <Text style={styles.StatusText}>{`Status: ${item.activeStatusDesc}`}</Text>
        <Text style={styles.vehicleText}>{`vehicle: ${item.vehicleRegNo}`}</Text>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => {
            setShowConfirmModal(true);
          }}>
          <Text style={styles.cancelButtonText}>Cancel Trip</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList data={employeeRoasterList?.upcoming} renderItem={renderItems} />
      <ConformationModal
        onPressYes={() => {
          setShowConfirmModal(false);
        }}
        onPressNo={() => {
          setShowConfirmModal(false);
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
    backgroundColor: '#F6F6F6',
  },
  roasterType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: pixelSizeHorizontal(20),
    paddingVertical: pixelSizeVertical(20),
  },
  roasterTypeText: {
    fontFamily: FontFamily.semiBold,
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
