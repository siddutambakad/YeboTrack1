import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  fontPixel,
  horizontalScale,
  pixelSizeHorizontal,
  verticalScale,
} from '../../Utils/Dimensions';
import FontFamily from '../../Styles/FontFamily';
import BackButton from '../../../assets/images/VectorBack.svg';
import MyTripStats from '../MyTripStats';
import MyStatsTabNavi from '../TopTabsScreens/MyStatsTabNavi';
import WriteFeedBack from './WriteFeedBack';
import MyTickets from './MyTickets';
import UserBottomTab from '../../Components/UserBottomTab';
import StartTripModal from '../../Components/StartTripModal';
import CustomModal from '../../Components/Modal';
import AlertModal from '../../Components/AlertModal';

const RaiseFeedBackScreen = ({navigation}) => {
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showConformationModal, setShowConformationModal] = useState(false);

  return (
    <SafeAreaView style={styles.conatiner}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.headerBackButton}>
          <BackButton width={horizontalScale(25)} height={verticalScale(25)} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Raise Feedback</Text>
      </View>
      <View style={styles.subContainer}>
        <MyStatsTabNavi
          screen1Name="Write FeedBack"
          screen1Component={WriteFeedBack}
          screen2Name="My Tickets"
          screen2Component={MyTickets}
        />
        <UserBottomTab
          activeTab="UserMyTrips"
          onPressAlertButton={() => {
            setShowAlertModal(true);
          }}
          onPressSafeDrop={() => {
            setShowOtpModal(true);
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
        <CustomModal
          visible={showOtpModal}
          onClose={() => {
            setShowOtpModal(false);
          }}
          onPressSubmitButton={() => {
            setShowOtpModal(false);
            setShowConformationModal(true);
          }}
          onPressCancelButton={() => {
            setShowOtpModal(false);
          }}
          title={'Enter the T-Pin'}
        />
        <StartTripModal
          onPressOK={() => {
            setShowConformationModal(false);
          }}
          title={'T-Pin saved successfully!'}
          showConfirmModal={showConformationModal}
          onPressNo={() => {
            setShowConformationModal(false);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default RaiseFeedBackScreen;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: '#66276E',
  },
  headerContainer: {
    flexDirection: 'row',
    padding: pixelSizeHorizontal(20),
    alignItems: 'center',
  },
  headerBackButton: {
    padding: 10,
  },
  headerText: {
    color: 'white',
    fontSize: fontPixel(20),
    fontFamily: FontFamily.regular,
    paddingLeft: pixelSizeHorizontal(15),
  },
  tabContainer: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
  },
});
