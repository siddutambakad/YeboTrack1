import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import FontFamily from '../Styles/FontFamily';
import Cancel from '../../assets/images/cancel.svg';
import Alert from '../../assets/images/alert.svg';
import {
  fontPixel,
  horizontalScale,
  pixelSizeHorizontal,
  pixelSizeVertical,
  verticalScale,
} from '../Utils/Dimensions';
import RN from 'react-native';
const SCREEN_HEIGHT = RN.Dimensions.get('window').height;

const AlertModal = props => {
  const {onPressOK, title, showConfirmModal, onPressNo} = props;

  const handleContentClick = event => {
    event.stopPropagation();
  };
  return (
    <Modal visible={showConfirmModal} animationType="fade" transparent={true}>
      <TouchableWithoutFeedback onPress={onPressNo}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={handleContentClick}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={{alignSelf: 'flex-end', padding: 8}}
                onPress={onPressNo}>
                <Cancel />
              </TouchableOpacity>
              <View
                style={{
                  width: SCREEN_HEIGHT * 0.08,
                  height: SCREEN_HEIGHT * 0.08,
                  borderRadius: (SCREEN_HEIGHT * 0.08) / 2,
                  backgroundColor: '#E8E8E8',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: pixelSizeVertical(10)
                }}>
                <Alert width={horizontalScale(30)} height={verticalScale(30)} />
              </View>
              <Text style={styles.modalText}>{title}</Text>
              <View
                style={{
                  alignSelf: 'center',
                  width: '100%',
                  paddingHorizontal: pixelSizeHorizontal(20),
                }}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={onPressOK}>
                  <Text style={styles.modalButtonText}>Ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AlertModal;

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
    paddingHorizontal: pixelSizeHorizontal(20),
    paddingVertical: pixelSizeVertical(20),
  },
  modalText: {
    paddingHorizontal: pixelSizeHorizontal(15),
    color: '#454545',
    fontFamily: FontFamily.medium,
    fontSize: fontPixel(18),
    textAlign: 'center',
  },
  modalButtonText: {
    color: '#FFF8F2',
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(16),
  },
  modalButton: {
    backgroundColor: '#C5197D',
    borderRadius: 3,
    width: horizontalScale(120),
    height: verticalScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: pixelSizeVertical(20),
  },
});
