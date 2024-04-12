import {
  Dimensions,
  SafeAreaView,
  ScrollView,
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
  pixelSizeVertical,
  responsiveBorderRadius,
  verticalScale,
} from '../../Utils/Dimensions';
import Back from '../../../assets/images/VectorBack.svg';
import FontFamily from '../../Styles/FontFamily';
import Closed from '../../../assets/images/closed.svg';
import StepIndicator from 'react-native-step-indicator-v2';

const {width, height} = Dimensions.get('window');

const TicketDetails = ({navigation}) => {
  const [selectedPosition, setSelectedPosition] = useState(0);

  const lables = ['Ticket Raised', 'On going', 'Closed'];
  const customStyles = {
    stepIndicatorSize: 24,
    currentStepIndicatorSize: 24,
    separatorStrokeWidth: 5,
    currentStepStrokeWidth: 0,
    stepStrokeCurrentColor: 'lightgray',
    stepStrokeWidth: 0,
    stepStrokeFinishedColor: 'gray',
    stepStrokeUnFinishedColor: 'lightgray',
    separatorFinishedColor: 'gray',
    separatorUnFinishedColor: 'lightgray',
    stepIndicatorFinishedColor: 'gray',
    stepIndicatorUnFinishedColor: 'lightgray',
    stepIndicatorCurrentColor: selectedPosition ? 'gray' : 'lightgray',
    stepIndicatorLabelFontSize: 0,
    currentStepIndicatorLabelFontSize: 0,
    labelColor: '#000',
    labelSize: fontPixel(14),
    labelFontFamily: FontFamily.medium,
    currentStepLabelColor: '#000',
    borderRadiusSize: 20,
    labelAlign: 'flex-start',
  };

  const handleClickTicketRaised = () => {
    setSelectedPosition(1);
  };

  const handleOngoing = () => {
    setSelectedPosition(2);
  };

  const handleClosed = () => {
    setSelectedPosition(3);
  };

  const stepActions = [handleClickTicketRaised, handleOngoing, handleClosed];
  return (
    <SafeAreaView style={styles.conatiner}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.goBack();
          }}>
          <Back width={horizontalScale(24)} height={verticalScale(24)} />
        </TouchableOpacity>
        <Text style={styles.myTripsText}>Ticket Details</Text>
      </View>
      <View style={styles.subContainer}>
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <View style={styles.ticketNoAndDate}>
            <Text style={styles.ticketNo}>{'Ticket No-\n#00011232009'}</Text>
            <Text style={styles.dateText}>March 12, 2022</Text>
          </View>
          <View style={styles.iconContainer}>
            <Closed width={horizontalScale(100)} height={verticalScale(100)} />
            <Text style={styles.closedText}>Closed</Text>
          </View>
          <View style={styles.reasonContainer}>
            <Text style={styles.reasonText}>Reason</Text>
            <Text style={styles.reason}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laoreet
              nulla tortor sed auctor est nam quam quis cursus. Tristique
              lobortis pretium arcu dolor, varius mi praesent. Ac dui, mauris
              risus eu, vulputate. Mauris mattis sed enim nec semper ipsum.
              Fusce porta faucibus ultricies suscipit cum
            </Text>
          </View>
          <View
            style={{
              height: height * 0.35,
              paddingLeft: pixelSizeHorizontal(10),
            }}>
            <StepIndicator
              direction="vertical"
              customStyles={customStyles}
              currentPosition={
                selectedPosition === 0 ? selectedPosition : selectedPosition - 1
              }
              stepCount={3}
              labels={lables.map((item, index) => (
                <Text
                  style={{
                    paddingLeft: index < selectedPosition ? 20 : 10,
                    color: 'black',
                    opacity: index > selectedPosition - 1 ? 1 : 0.5,
                    fontFamily:
                      index > selectedPosition - 1
                        ? FontFamily.regular
                        : FontFamily.semiBold,
                  }}>
                  {item}
                </Text>
              ))}
              onPress={index => {
                if (index < selectedPosition) {
                  return;
                } else if (index > selectedPosition) {
                  return;
                }
                stepActions[index]();
              }}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default TicketDetails;

const styles = StyleSheet.create({
  conatiner: {
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
    borderTopLeftRadius: responsiveBorderRadius(40),
    borderTopRightRadius: responsiveBorderRadius(40),
    backgroundColor: '#F6F6F6',
    marginTop: pixelSizeVertical(15),
    paddingTop: pixelSizeVertical(10),
    paddingHorizontal: pixelSizeHorizontal(20),
  },
  ticketNo: {
    color: 'black',
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(14),
  },
  dateText: {
    color: 'black',
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(14),
  },
  ticketNoAndDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: pixelSizeVertical(25),
    alignItems: 'center'
  },
  iconContainer: {
    alignItems: 'center',
    paddingVertical: pixelSizeVertical(8),
  },
  closedText: {
    color: 'black',
    fontFamily: FontFamily.semiBold,
    fontSize: fontPixel(18),
    paddingVertical: pixelSizeVertical(8),
  },
  reasonContainer: {},
  reasonText: {
    color: 'black',
    fontSize: fontPixel(16),
    fontFamily: FontFamily.medium,
  },
  reason: {
    color: 'black',
    fontSize: fontPixel(14),
    fontFamily: FontFamily.regular,
    textAlign: 'justify',
  },
});
