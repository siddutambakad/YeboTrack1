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
import {
  fontPixel,
  horizontalScale,
  pixelSizeHorizontal,
  pixelSizeVertical,
  responsiveBorderRadius,
  verticalScale,
} from '../Utils/Dimensions';
import FontFamily from '../Styles/FontFamily';
import Gallery from '../../assets/images/gallery.svg';
import Camera from '../../assets/images/Camera.svg';
import Cancel from '../../assets/images/cancel.svg';
import RN from 'react-native';

const SCREEN_HEIGHT = RN.Dimensions.get('window').height;

const AddPhotoModal = props => {
  const {onOpenGallery, onOpenCamera, showPhotoModal, onClickOutSide, image} =
    props;
  const handleContentClick = event => {
    event.stopPropagation();
  };
  return (
    <Modal visible={showPhotoModal} animationType="fade" transparent={true}>
      <TouchableWithoutFeedback onPress={onClickOutSide}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={handleContentClick}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={{alignSelf: 'flex-end'}}
                onPress={onClickOutSide}>
                <Cancel
                  width={horizontalScale(30)}
                  height={verticalScale(30)}
                />
              </TouchableOpacity>
              <Image source={image} style={styles.profileImage} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  width: '100%',
                  paddingHorizontal: pixelSizeHorizontal(20),
                  marginBottom: pixelSizeVertical(30),
                }}>
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={onOpenGallery}>
                    <Gallery
                      width={horizontalScale(35)}
                      height={verticalScale(35)}
                    />
                  </TouchableOpacity>
                  <Text style={styles.modalButtonText}>Gallery</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity
                    style={styles.modalButtonNo}
                    onPress={onOpenCamera}>
                    <Camera
                      width={horizontalScale(35)}
                      height={verticalScale(35)}
                    />
                  </TouchableOpacity>
                  <Text style={styles.modalButtonNoText}>Camera</Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddPhotoModal;

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
    color: '#000000',
    fontFamily: FontFamily.medium,
    fontSize: fontPixel(16),
  },
  modalButton: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    width: SCREEN_HEIGHT * 0.1,
    height: SCREEN_HEIGHT * 0.1,
    borderRadius: (SCREEN_HEIGHT * 0.1) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  modalButtonNo: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    width: SCREEN_HEIGHT * 0.1,
    height: SCREEN_HEIGHT * 0.1,
    borderRadius: (SCREEN_HEIGHT * 0.1) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  modalButtonNoText: {
    color: '#000000',
    fontFamily: FontFamily.medium,
    fontSize: fontPixel(16),
  },
  profileImage: {
    width: SCREEN_HEIGHT * 0.12,
    height: SCREEN_HEIGHT * 0.12,
    borderRadius: (SCREEN_HEIGHT * 0.12) / 2,
    marginBottom: pixelSizeVertical(20),
    marginTop: pixelSizeVertical(10),
    // borderRadius: responsiveBorderRadius(100),
    borderWidth: 1,
    borderColor: '#66276E'
  },
});
