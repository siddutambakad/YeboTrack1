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
import Bell from '../assets/images/bellIcon.svg';
import MyTripNavigator from './Components/MyTripNavigator';
import {UpcomingLists} from './Context/AppContext';
import StartTripImage from '../assets/images/startTripCar.svg';
import {
  fontPixel,
  horizontalScale,
  pixelSizeHorizontal,
  pixelSizeVertical,
  verticalScale,
} from './Utils/Dimensions';
import FontFamily from './Styles/FontFamily';
import Check from '../assets/images/check.svg';
import Cancel from '../assets/images/cancel.svg';
import CustomModal from './Components/Modal';
import PickupGuardModal from './Components/PickupGuardModal';
import ConformationModal from './Components/ConformationModal';
import BottomTab from './Components/BottomTab';

const MyTripsScreen = ({navigation}) => {
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
            <Back width={horizontalScale(24)} height={verticalScale(24)} />
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
            <Bell
              width={horizontalScale(50)}
              height={verticalScale(50)}
              fill={'#C5197D'}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* sub container starts */}
      <View style={styles.myTripNavi}>
        <MyTripNavigator />
        <BottomTab activeTab="MyTrips" />
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
    fontSize: fontPixel(18),
    paddingLeft: 20,
  },
  subMainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  myTripNavi: {
    flex: 1,
    backgroundColor: 'rgba(246, 246, 246, 1)',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});
