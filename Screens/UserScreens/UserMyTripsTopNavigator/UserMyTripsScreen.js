import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Back from '../../../assets/images/VectorBack.svg';
import {
  fontPixel,
  horizontalScale,
  pixelSizeHorizontal,
  pixelSizeVertical,
  responsiveBorderRadius,
  verticalScale,
} from '../../Utils/Dimensions';
import FontFamily from '../../Styles/FontFamily';
import MyTripNavigator from '../../Components/MyTripNavigator';
import UserBottomTab from '../../Components/UserBottomTab';
import UserTopTabNavigator from './UserTopTabNavigator';
import BottomTab from '../../Components/BottomTab';
import AlertModal from '../../Components/AlertModal';

const UserMyTripsScreen = ({navigation}) => {
  const [showAlertModal, setShowAlertModal] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.goBack();
          }}>
          <Back width={horizontalScale(24)} height={verticalScale(24)} />
        </TouchableOpacity>
        <Text style={styles.myTripsText}>My Trips</Text>
      </View>
      <View style={styles.subContainer}>
        <UserTopTabNavigator />
        <UserBottomTab
          activeTab="UserMyTrips"
          onPressAlertButton={() => {
            setShowAlertModal(true);
            console.log('hii');
          }}
        />
        <AlertModal
          onPressOK={() => {
            setShowAlertModal(false);
          }}
          title={'The alert request has been raised.'}
          showConfirmModal={showAlertModal}
          onPressNo={() => {
            setShowAlertModal(false);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserMyTripsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#66276E',
  },
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: pixelSizeHorizontal(20),
    paddingVertical: pixelSizeVertical(20),
    alignItems: 'center',
  },
  myTripsText: {
    color: 'white',
    fontSize: fontPixel(18),
    fontFamily: FontFamily.regular,
    paddingLeft: pixelSizeHorizontal(16),
  },
  backButton: {
    padding: 5,
  },
  subContainer: {
    flex: 1,
    backgroundColor: 'rgba(246, 246, 246, 1)',
    borderTopLeftRadius: responsiveBorderRadius(40),
    borderTopRightRadius: responsiveBorderRadius(40),
  },
});
