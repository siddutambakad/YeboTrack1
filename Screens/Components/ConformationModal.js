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

const ConformationModal = (props) => {
    const {onPressYes,onPressNo, title, showConfirmModal} = props
  return (
    <Modal visible={showConfirmModal} animationType="fade" transparent={true}>
      <TouchableWithoutFeedback
        onPress={onPressNo}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={{alignSelf: 'flex-end', padding: 8}}
              onPress={onPressNo}>
              <Cancel />
            </TouchableOpacity>
            <Text style={styles.modalText}>
              {title}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                paddingHorizontal: 30,
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
});
