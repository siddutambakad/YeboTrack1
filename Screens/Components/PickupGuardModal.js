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
import RN from 'react-native';

const SCREEN_HEIGHT = RN.Dimensions.get('window').height;

const PickupGuardModal = props => {
  const {showModal, onCloseModel, options, name, pickupTime, Address} = props;
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
                  paddingRight: 20,
                  paddingLeft: 10,
                }}>
                <Image
                  source={require('../../assets/images/profile.png')}
                  style={styles.modalImage}
                />
                {options?.isSocialMediaRequired && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '50%',
                      justifyContent: 'flex-end',
                      paddingLeft: 10,
                    }}>
                    <TouchableOpacity onPress={options?.button_Action3}>
                      <Call
                        width={horizontalScale(45)}
                        height={verticalScale(45)}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={options?.button_Action4}>
                      <Location
                        width={horizontalScale(45)}
                        height={verticalScale(45)}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              <Text style={styles.modalText1}>{name}</Text>
              <Text style={styles.modalText2}>{pickupTime}</Text>
              {/* <Text style={styles.locationText}>Pickup Location</Text> */}
              <Text style={styles.addressText}>{Address}</Text>
              <View
                style={
                  options?.isSocialMediaRequired
                    ? {flexDirection: 'row'}
                    : {width: '100%'}
                }>
                <TouchableOpacity
                  style={styles.guardCheckInButton}
                  onPress={options?.button_action || null}>
                  <Text style={styles.guardCheckInText}>
                    {options?.button_text}
                  </Text>
                </TouchableOpacity>
                {options?.isSocialMediaRequired && (
                  <TouchableOpacity
                    style={{
                      ...styles.guardCheckInButton,
                      backgroundColor: 'gray',
                    }}
                    onPress={options?.button_action2 || null}>
                    <Text style={styles.guardCheckInText}>
                      {options?.button_text2}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PickupGuardModal;

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
    width: SCREEN_HEIGHT * 0.1,
    height: SCREEN_HEIGHT * 0.1,
    borderRadius: (SCREEN_HEIGHT * 0.1) / 2,
    // objectFit: 'scale-down',
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
    alignSelf: 'flex-end',
    width: horizontalScale(118),
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
