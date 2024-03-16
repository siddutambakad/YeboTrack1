import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import React from 'react';
import Profile from '../assets/images/profilePic.svg';
import Camera from '../assets/images/Camera.svg';
import Car from '../assets/images/Car.svg';
import History from '../assets/images/history.svg';
import Bell from '../assets/images/bell.svg';
import FontFamily from './Styles/FontFamily';
import {
  fontPixel,
  getFontSize,
  horizontalScale,
  moderateScale,
  moderateScaleVertical,
  pixelSizeHorizontal,
  pixelSizeVertical,
  verticalScale,
} from './Utils/Dimensions';

const DriverHomeScreen = ({navigation}) => {
  const handleMyTripsPress = () => {
    navigation.navigate('MyTrip', {screen: 'MyTrips'});
  };

  const handleMyProfilePress = () => {
    navigation.navigate('Profile', {screen: 'Profile'});
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/imageBack.png')}
        style={styles.imageback}
      />
      <View style={styles.backgroundContainer}>
        <View style={{}}>
          <View
            style={{
              width: horizontalScale(100),
              height: verticalScale(105),
              alignItems: 'center',
              alignSelf: 'center',
              top: pixelSizeVertical(-50),
              borderRadius: 50,
            }}>
            <Image
              source={require('../assets/images/profile.png')}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.jhonedoeText}>Jhon Doe</Text>
          <Text style={styles.driverIdText}>Driver ID - #1234</Text>
          <TouchableOpacity style={styles.addPhoto}>
            <Camera width={15} height={15} />
            <Text style={styles.addPhotoText}>Add Photo</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.myHistoryButton}>
            <History width={30} height={30} />
            <Text style={styles.myhistoryText}>History</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              handleMyTripsPress();
            }}
            style={styles.myTripsButton}>
            <View style={{paddingRight: pixelSizeHorizontal(25)}}>
              <Car
                width={pixelSizeHorizontal(40)}
                height={pixelSizeVertical(35)}
                style={styles.carImage}
              />
            </View>
            <Text style={styles.myTripsText}>My Trips</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.myProfileButton}
            onPress={() => {
              handleMyProfilePress();
            }}>
            <View style={{paddingRight: pixelSizeHorizontal(25)}}>
              <Profile
                width={pixelSizeHorizontal(40)}
                height={pixelSizeVertical(35)}
              />
            </View>
            <Text style={styles.myProfileText}>My Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/*header strats */}
      <View style={styles.headerIcon}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {}}
          style={styles.headerIconButton}>
          <Bell width={25} height={25} fill={'#C5197D'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DriverHomeScreen;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  imageback: {
    backgroundColor: '#66276e',
    opacity: 0.8,
    width: '100%',
    height: '35%',
  },
  backgroundContainer: {
    flex: 1,
    backgroundColor: 'rgba(246, 246, 246, 1)',
    marginTop: -60,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    // alignSelf: 'center',
    // position: 'absolute',
    objectFit: 'scale-down',
    borderRadius: 50,
    // zIndex: 5,
  },
  jhonedoeText: {
    color: 'black',
    textAlign: 'center',
    marginTop: pixelSizeVertical(-35),
    fontSize: fontPixel(16),
    fontFamily: FontFamily.semiBold,
  },
  driverIdText: {
    color: 'black',
    textAlign: 'center',
    marginTop: 3,
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(12),
  },
  addPhoto: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  addPhotoText: {
    color: 'black',
    paddingLeft: 8,
    textDecorationLine: 'underline',
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(12),
  },
  myTripsButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: horizontalScale(230),
    height: verticalScale(80),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 25,
    paddingHorizontal: pixelSizeHorizontal(30),
    borderRadius: 8,
    elevation: 10,
  },
  myTripsText: {
    color: 'black',
    fontSize: fontPixel(16),
    fontFamily: FontFamily.regular,
    paddingLeft: pixelSizeHorizontal(-12),
  },
  myProfileButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: horizontalScale(230),
    height: verticalScale(80),
    paddingHorizontal: pixelSizeHorizontal(35),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 25,
    borderRadius: 8,
    elevation: 10,
  },
  myProfileText: {
    color: 'black',
    fontSize: fontPixel(16),
    fontFamily: FontFamily.regular,
    paddingLeft: pixelSizeHorizontal(-12),
  },
  headerIcon: {
    alignSelf: 'flex-end',
    marginHorizontal: 20,
    alignItems: 'center',
    marginVertical: 20,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  headerIconButton: {
    width: 60,
    height: 60,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
});
