import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import Cancel from '../../assets/images/cancel.svg';
import FontFamily from '../Styles/FontFamily';
import {
  fontPixel,
  horizontalScale,
  pixelSizeHorizontal,
  pixelSizeVertical,
  responsiveBorderRadius,
  verticalScale,
} from '../Utils/Dimensions';
import Call from '../../assets/images/call.svg';
import Loaction from '../../assets/images/location.svg';
import RN from 'react-native';

const SCREEN_HEIGHT = RN.Dimensions.get('window').height;

const EmployeeCheckInModal = props => {
  const {
    showEmployeeModal,
    onPressOutside,
    onPressCancelButton,
    title,
    onPressCheckIn,
    onPressDial,
    onPressLocation,
  } = props;
  const handleContentClick = event => {
    event.stopPropagation();
  };
  return (
    <Modal visible={showEmployeeModal} animationType="fade" transparent={true}>
      <TouchableWithoutFeedback onPress={onPressOutside}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={handleContentClick}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={{alignSelf: 'flex-end', padding: 8}}
                onPress={onPressCancelButton}>
                <Cancel />
              </TouchableOpacity>
              <Text style={styles.modalText}>{title}</Text>
              <View
                style={{
                  width: '100%',
                  paddingHorizontal: pixelSizeHorizontal(35),
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require('../../assets/images/profile.png')}
                    style={styles.modalImage}
                  />
                  <View style={{paddingHorizontal: pixelSizeHorizontal(10)}}>
                    <Text
                      style={{
                        color: 'black',
                        fontFamily: FontFamily.bold,
                        fontSize: fontPixel(16),
                      }}>
                      Jhone Doe
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        fontFamily: FontFamily.regular,
                        fontSize: fontPixel(16),
                      }}>
                      Jhone Doe
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: pixelSizeVertical(20),
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity onPress={onPressDial}>
                    <Call
                      width={horizontalScale(50)}
                      height={verticalScale(50)}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onPressLocation}>
                    <Loaction
                      width={horizontalScale(50)}
                      height={verticalScale(50)}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.checkOutButton}
                  onPress={onPressCheckIn}>
                  <Text style={styles.checkOutText}>Check In</Text>
                </TouchableOpacity>
              </View>
              {/* <View
            style={{
              flexDirection: 'row',
                justifyContent: 'space-evenly',
                width: '100%',
                paddingHorizontal: pixelSizeHorizontal(20),
                marginBottom: pixelSizeVertical(30)
            }}>
            <TouchableOpacity style={styles.modalButton} onPress={onPressYes}>
              <Text style={styles.modalButtonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButtonNo}
              onPress={onPressNo}>
              <Text style={styles.modalButtonNoText}>No</Text>
            </TouchableOpacity>
          </View> */}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default EmployeeCheckInModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    // height: verticalScale(180),
    width: horizontalScale(350),
    alignItems: 'center',
    padding: 15,
  },
  modalText: {
    padding: 15,
    color: '#454545',
    fontFamily: FontFamily.bold,
    fontSize: fontPixel(18),
    textAlign: 'left',
    paddingHorizontal: pixelSizeHorizontal(30),
    // width: '100%'
  },
  modalButtonText: {
    color: '#FFF8F2',
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(16),
  },
  modalButton: {
    backgroundColor: '#C5197D',
    borderRadius: 3,
    width: horizontalScale(110),
    height: verticalScale(45),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonNo: {
    backgroundColor: '#454546',
    borderRadius: 3,
    width: horizontalScale(110),
    height: verticalScale(45),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonNoText: {
    color: '#FFF8F2',
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(16),
  },
  modalImage: {
    width: SCREEN_HEIGHT * 0.1,
    height: SCREEN_HEIGHT * 0.1,
    borderRadius: (SCREEN_HEIGHT * 0.1) / 2,
  },
  checkOutButton: {
    width: horizontalScale(120),
    backgroundColor: 'rgba(197, 25, 125, 1)',
    height: verticalScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginBottom: pixelSizeVertical(20),
    // marginRight: 20,
    borderRadius: 8,
  },
  checkOutText: {
    color: 'white',
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(14),
  },
});
