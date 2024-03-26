import React, {useState} from 'react';
import {
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import Cancel from '../../assets/images/cancel.svg';
import FontFamily from '../Styles/FontFamily';
import {
  fontPixel,
  horizontalScale,
  pixelSizeHorizontal,
  pixelSizeVertical,
  verticalScale,
} from '../Utils/Dimensions';

const CustomModal = props => {
  const {
    visible,
    onClose,
    onPressSubmitButton,
    onPressCancelButton,
    title,
    options,
  } = props;

  const handleCancelButton = () => {
    onPressCancelButton();
  };

  const [userDetails, setUserDetails] = useState({
    otp: '',
  });

  const [errorMsg, setErrorMsg] = useState({
    otp: '',
  });

  const [showError, setShowError] = useState({
    otp: false,
  });

  const otpRegex = /^\d{6}$/;
  const handleButtonClick = () => {
    if (!otpRegex.test(userDetails.otp)) {
      setErrorMsg({...errorMsg, otp: 'Enter valid otp'});
      setShowError({...showError, otp: true});
    } else {
      setShowError({
        ...showError,
        otp: false,
      });
      setUserDetails('');
      setErrorMsg({});
      onPressSubmitButton();
    }
  };

  const handleContentClick = event => {
    event.stopPropagation();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={handleContentClick}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={{alignSelf: 'flex-end', padding: 8}}
                onPress={onClose}>
                <Cancel />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'black',
                  fontFamily: FontFamily.regular,
                  alignSelf: 'flex-start',
                  paddingHorizontal: pixelSizeHorizontal(54),
                  fontSize: fontPixel(14),
                }}>
                {title}
              </Text>
              <TextInput
                style={{
                  width: '70%',
                  height: verticalScale(55),
                  backgroundColor: 'rgba(227, 227, 227, 1)',
                  marginVertical: pixelSizeVertical(10),
                  color: 'black',
                  paddingLeft: pixelSizeHorizontal(10),
                  fontSize: fontPixel(14),
                }}
                maxLength={6}
                keyboardType="number-pad"
                onChangeText={e => {
                  setUserDetails({
                    ...userDetails,
                    otp: e,
                  });
                  setShowError({
                    ...showError,
                    otp: false,
                  });
                }}
                // onBlur={() => {
                //   if (!otpRegex.test(userDetails.otp)) {
                //     setErrorMsg({
                //       ...errorMsg,
                //       otp: 'Enter valid otp',
                //     });
                //     setShowError({
                //       ...showError,
                //       otp: true,
                //     });
                //   } else {
                //     setErrorMsg({
                //       ...errorMsg,
                //       otp: '',
                //     });
                //     setShowError({
                //       ...showError,
                //       otp: false,
                //     });
                //   }
                // }}
                value={userDetails.otp}
              />
              {showError.otp && (
                <Text style={styles.errorText}>{errorMsg.otp}</Text>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '90%',
                  paddingHorizontal: pixelSizeHorizontal(36),
                  marginBottom: pixelSizeVertical(25),
                  marginVertical: pixelSizeVertical(30),
                }}>
                <TouchableOpacity
                  onPress={() => {
                    handleButtonClick();
                  }}
                  style={{
                    width: horizontalScale(100),
                    height: verticalScale(45),
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(197, 25, 125, 1)',
                    borderRadius: 8,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: FontFamily.regular,
                      fontSize: fontPixel(14),
                    }}>
                    Submit
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleCancelButton();
                  }}
                  style={{
                    width: horizontalScale(100),
                    height: verticalScale(45),
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(69, 69, 70, 1)',
                    borderRadius: 8,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: FontFamily.regular,
                      fontSize: fontPixel(14),
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomModal;

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
  errorText: {
    color: 'red',
    fontFamily: FontFamily.regular,
    alignSelf: 'center',
    fontSize: fontPixel(14),
  },
});
