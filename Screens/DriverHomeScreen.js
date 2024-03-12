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
        <View>
          <Image
            source={require('../assets/images/profile.png')}
            style={styles.profileImage}
          />
          <Text style={styles.jhonedoeText}>Jhon Doe</Text>
          <Text style={styles.driverIdText}>Driver ID - #1234</Text>
          <TouchableOpacity style={styles.addPhoto}>
            <Camera width={15} height={15} />
            <Text style={styles.addPhotoText}>Add Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.myHistoryButton}>
            <History width={30} height={30} />
            <Text style={styles.myhistoryText}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              handleMyTripsPress();
            }}
            style={styles.myTripsButton}>
            <Car width={40} height={40} />
            <Text style={styles.myTripsText}>My Trips</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.myProfileButton}
            onPress={() => {
              handleMyProfilePress();
            }}>
            <Profile width={30} height={30} />
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
    width: '25%',
    height: '42%',
    alignSelf: 'center',
    position: 'absolute',
    top: -90,
    //   borderWidth: 1,
    //   borderColor: 'black',
    borderRadius: 50,
    resizeMode: 'contain',
  },
  jhonedoeText: {
    color: 'black',
    textAlign: 'center',
    marginTop: 70,
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
  },
  driverIdText: {
    color: 'black',
    textAlign: 'center',
    marginTop: 3,
    fontFamily: FontFamily.regular,
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
  },
  myHistoryButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '55%',
    height: 70,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 8,
    elevation: 10,
  },
  myhistoryText: {
    color: 'black',
    fontSize: 16,
    fontFamily: FontFamily.regular,
    paddingRight: 20,
  },
  myTripsButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '55%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 25,
    borderRadius: 8,
    elevation: 10,
  },
  myTripsText: {
    color: 'black',
    fontSize: 16,
    fontFamily: FontFamily.regular,
    paddingRight: 10,
  },
  myProfileButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '55%',
    height: 70,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',
    marginTop: 25,
    borderRadius: 8,
    elevation: 10,
  },
  myProfileText: {
    color: 'black',
    fontSize: 16,
    fontFamily: FontFamily.regular,
    // paddingLeft: 20,
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
