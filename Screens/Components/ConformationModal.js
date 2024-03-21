import {
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
  verticalScale,
} from '../Utils/Dimensions';

const ConformationModal = props => {
  const {onPressYes, onPressNo, title, showConfirmModal} = props;
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
              <Text style={styles.modalText}>{title}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  width: '100%',
                  paddingHorizontal: pixelSizeHorizontal(20),
                  marginBottom: pixelSizeVertical(30),
                }}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={onPressYes}>
                  <Text style={styles.modalButtonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButtonNo}
                  onPress={onPressNo}>
                  <Text style={styles.modalButtonNoText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ConformationModal;

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
    fontFamily: FontFamily.regular,
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
});
