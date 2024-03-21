import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import StopTrip from '../../assets/images/stopTrip.svg';
import Bell from '../../assets/images/bellIcon.svg';
import Sos from '../../assets/images/sos.svg';
import Back from '../../assets/images/VectorBack.svg';
import {
  fontPixel,
  horizontalScale,
  responsiveBorderRadius,
  verticalScale,
} from '../Utils/Dimensions';
import FontFamily from '../Styles/FontFamily';
import BottomTab from '../Components/BottomTab';
import RN from 'react-native';
import {actuatedNormalize} from '../Utils/PixelScaling';
const SCREEN_HEIGHT = RN.Dimensions.get('window').height;

const StopTripScreen = ({navigation}) => {
  const formatTime = time => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const amOrPm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12; // Convert 0 to 12
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <TouchableOpacity
            style={styles.backbutton}
            onPress={() => {
              navigation.goBack();
            }}>
            <Back
              width={horizontalScale(25)}
              height={verticalScale(25)}
            />
            <Text style={styles.backbuttonText}>My Trips</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.subMainHeader}>
          <TouchableOpacity style={{paddingRight: 20}}>
            <Sos width={actuatedNormalize(30)} height={actuatedNormalize(30)} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            style={styles.bellButton}>
            <Bell
              width={actuatedNormalize(30)}
              height={actuatedNormalize(30)}
              fill={'#C5197D'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.subContainer}>
        <View
          style={{
            flex: 0.6,
            justifyContent: 'flex-end',
            marginBottom: 60,
          }}>
          <View style={styles.startSubContainer}>
            <StopTrip
              width={actuatedNormalize(50)}
              height={actuatedNormalize(50)}
            />
          </View>
          <Text
            style={{
              color: 'black',
              fontFamily: FontFamily.medium,
              fontSize: fontPixel(16),
              alignSelf: 'center',
              width: horizontalScale(150),
              textAlign: 'center',
            }}>
            You are about to stop the trip!
          </Text>
        </View>
        <View style={{flex: 0.4, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('UpComing', {
                // stopTrip: true,
                // stopTripTime: formatTime(new Date()),
              });
            }}
            style={{
              width: horizontalScale(130),
              height: verticalScale(50),
              backgroundColor: 'rgba(197, 25, 125, 1)',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: FontFamily.regular,
                fontSize: fontPixel(14),
              }}>
              End Trip
            </Text>
          </TouchableOpacity>
        </View>
        <BottomTab activeTab="MyTrips" />
      </View>
    </View>
  );
};

export default StopTripScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(102, 39, 110, 1)',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  backbutton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backbuttonText: {
    color: 'white',
    fontSize: fontPixel(18),
    paddingLeft: 20,
  },
  subMainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bellButton: {
    // width: 50,
    // height: 50,
    // backgroundColor: '#FFFFFF',
    // alignItems: 'center',
    // justifyContent: 'center',
    // borderRadius: 30,
  },
  subContainer: {
    flex: 1,
    backgroundColor: 'rgba(246, 246, 246, 1)',
    borderTopLeftRadius: responsiveBorderRadius(50),
    borderTopRightRadius: responsiveBorderRadius(50),
  },
  startSubContainer: {
    // width: SCREEN_HEIGHT * 0.1,
    // height: SCREEN_HEIGHT * 0.1,
    // borderRadius: (SCREEN_HEIGHT * 0.1) / 2,
    width: actuatedNormalize(100),
    height: actuatedNormalize(100),
    borderRadius: responsiveBorderRadius(100),
    backgroundColor: 'rgba(229, 229, 229, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
});
