import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React from 'react';
import Cancel from '../../assets/images/cancel.svg';
import {
  fontPixel,
  horizontalScale,
  pixelSizeHorizontal,
  pixelSizeVertical,
  verticalScale,
} from '../Utils/Dimensions';
import FontFamily from '../Styles/FontFamily';
import Call from '../../assets/images/call.svg';
import Location from '../../assets/images/location.svg';

const DriveToZoneModal = props => {
  const {showModal, onCloseModel, onPressCheckIn, onPressLocation} = props;
  const handleContentClick = event => {
    event.stopPropagation();
  };
  return (
    <Modal visible={showModal} animationType="fade" transparent={true}>
      <TouchableWithoutFeedback onPress={onCloseModel}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={handleContentClick}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={{alignSelf: 'flex-end', padding: 8}}
                onPress={onCloseModel}>
                <Cancel />
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '90%',
                  //   paddingRight: 20,
                  paddingLeft: 10,
                }}>
                <Image
                  source={require('../../assets/images/profile.png')}
                  style={styles.modalImage}
                />
                {/* {options?.isSocialMediaRequired && ( */}
                <View
                  style={{
                    alignItems: 'center',
                    width: '25%',
                    //   justifyContent: 'flex-end',
                    // alignSelf: 'flex-end',
                    paddingLeft: 10,
                  }}>
                  {/* <TouchableOpacity onPress={options?.button_Action3}>
                      <Call />
                    </TouchableOpacity> */}
                  <TouchableOpacity onPress={onPressLocation}>
                    <Location
                      width={horizontalScale(50)}
                      height={verticalScale(50)}
                    />
                  </TouchableOpacity>
                </View>
                {/* )} */}
              </View>

              <Text style={styles.modalText1}>John Doe</Text>
              <Text style={styles.modalText2}>Drop Time - 10:13 am</Text>
              <Text style={styles.locationText}>Drop Location</Text>
              <Text style={styles.addressText}>
                118, 80 Feet Rd, Above Bodyworks Spa, KHB Colony, 7th Block,
                Koramangala, Bengaluru, Karnataka 560095
              </Text>
              {/* <View
                style={
                  options?.isSocialMediaRequired
                    ? {flexDirection: 'row'}
                    : {width: '100%'}
                }> */}
              <TouchableOpacity
                style={styles.guardCheckInButton}
                onPress={onPressCheckIn}>
                <Text style={styles.guardCheckInText}>Location Reached</Text>
              </TouchableOpacity>
              {/* </View> */}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DriveToZoneModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    // height: 230,
    width: '90%',
    alignItems: 'center',
    padding: 15,
  },
  modalImage: {
    width: horizontalScale(70),
    height: verticalScale(80),
    objectFit: 'scale-down',
    // marginHorizontal: 10,
  },
  modalText1: {
    alignSelf: 'flex-start',
    paddingLeft: pixelSizeHorizontal(30),
    fontFamily: FontFamily.semiBold,
    color: 'black',
    fontSize: fontPixel(16),
    marginTop: 5,
  },
  modalText2: {
    alignSelf: 'flex-start',
    paddingLeft: pixelSizeHorizontal(30),
    fontFamily: FontFamily.regular,
    color: 'black',
    fontSize: fontPixel(14),
  },
  locationText: {
    alignSelf: 'flex-start',
    paddingLeft: pixelSizeHorizontal(30),
    fontFamily: FontFamily.medium,
    color: 'black',
    fontSize: fontPixel(14),
    marginVertical: 8,
  },
  addressText: {
    alignSelf: 'flex-start',
    paddingHorizontal: pixelSizeHorizontal(30),
    fontFamily: FontFamily.medium,
    color: 'black',
    fontSize: fontPixel(14),
    marginTop: 5,
  },
  guardCheckInButton: {
    alignSelf: 'center',
    width: horizontalScale(120),
    height: verticalScale(50),
    backgroundColor: 'rgba(197, 25, 125, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginVertical: pixelSizeVertical(20),
    marginHorizontal: pixelSizeHorizontal(20),
    padding: 5,
  },
  guardCheckInText: {
    fontSize: fontPixel(12),
    color: 'white',
    fontFamily: FontFamily.regular,
  },
});
