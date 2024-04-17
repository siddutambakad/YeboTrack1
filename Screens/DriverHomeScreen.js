import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
  PermissionsAndroid,
  Linking,
  Platform,
  SafeAreaView,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Profile from '../assets/images/profilePic.svg';
import Camera from '../assets/images/Camera.svg';
import Car from '../assets/images/Car.svg';
import Bell from '../assets/images/bellIcon.svg';
import FontFamily from './Styles/FontFamily';
import {
  fontPixel,
  horizontalScale,
  pixelSizeHorizontal,
  pixelSizeVertical,
  responsiveBorderRadius,
  verticalScale,
} from './Utils/Dimensions';
import AddPhotoModal from './Components/AddPhotoModal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  check,
  PERMISSIONS,
  RESULTS,
  request,
  openSettings,
} from 'react-native-permissions';
import RN from 'react-native';
import {AppContext} from './Context/AppContext';

const SCREEN_HEIGHT = RN.Dimensions.get('window').height;

const DriverHomeScreen = ({navigation}) => {
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  // console.log("🚀 ~ DriverHomeScreen ~ selectedImage:", selectedImage)
  const {driverDetails} = useContext(AppContext);

  
  const handleMyTripsPress = () => {
    navigation.navigate('MyTrip');
  };

  const handleMyProfilePress = () => {
    navigation.navigate('Profile');
  };

  const requestCameraPermission = async () => {
    try {
      const permission = await check(
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.CAMERA
          : PERMISSIONS.IOS.CAMERA,
      );
      if (permission === RESULTS.GRANTED) {
        openCamera();
      } else {
        const result = await request(
          Platform.OS === 'android'
            ? PERMISSIONS.ANDROID.CAMERA
            : PERMISSIONS.IOS.CAMERA,
        );
        if (result === RESULTS.GRANTED) {
          openCamera();
        } else {
          console.log('Camera permission denied');
          Alert.alert(
            'Alert!!',
            'Please grant camera permission to take photos.',
            [
              {text: 'Ask Me Later'},
              {text: 'Cancel'},
              {text: 'Ok', onPress: () => openSettings()},
            ],
            {cancelable: false},
          );
        }
      }
    } catch (error) {
      console.error('Error requesting camera permission:', error);
    }
  };

  const requestGalleryPermission = async () => {
    try {
      const permission = await check(
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.IOS.MEDIA_LIBRARY,
      );
      if (permission === RESULTS.GRANTED) {
        openGallery();
      } else {
        const result = await request(
          Platform.OS === 'android'
            ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
            : PERMISSIONS.IOS.PHOTO_LIBRARY,
        );
        if (result === RESULTS.GRANTED) {
          openGallery();
        } else {
          console.log('gallery permission denied');
          Alert.alert(
            'Alert!!',
            'Please grant gallery permission to select photos.',
            [
              {text: 'Ask Me Later'},
              {text: 'Cancel'},
              {text: 'Ok', onPress: () => openSettings()},
            ],
            {cancelable: false},
          );
        }
      }
    } catch (error) {
      console.error('Error requesting camera permission:', error);
    }
  };

  const openSettings = () => {
    if (Platform.OS === 'android') {
      Linking.openSettings();
    } else {
      Linking.openURL('app-settings:');
    }
  };

  const openCamera = () => {
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
        mediaType: 'photo',
      },
    };

    launchCamera(options, response => handleImageResponse(response));
  };

  const openGallery = () => {
    const options = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, response => handleImageResponse(response));
  };

  const handleImageResponse = response => {
    if (response.didCancel) {
      console.log('User canceled');
    } else if (response.errorCode) {
      console.log('Image error', response.errorCode);
    } else if (response.errorMessage) {
      console.log('Image error message', response.errorMessage);
    } else {
      const source = {uri: response.assets[0].uri};
      setSelectedImage(source.uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/images/imageBack.png')}
        style={styles.imageback}
      />
      <View style={styles.backgroundContainer}>
        <View style={{}}>
          {selectedImage ? (
            <Image source={{uri: selectedImage}} style={styles.profileImage} />
          ) : (
            <Image
              source={require('../assets/images/profile.png')}
              style={styles.profileImage}
            />
          )}
          <Text style={styles.jhonedoeText}>{driverDetails?.driverName}</Text>
          <Text
            style={
              styles.driverIdText
            }>{`Driver ID - ${driverDetails?.idDriver}`}</Text>
          <TouchableOpacity
            style={styles.addPhoto}
            onPress={() => {
              setShowPhotoModal(true);
            }}>
            <Camera width={horizontalScale(18)} height={verticalScale(18)} />
            <Text style={styles.addPhotoText}>Add Photo</Text>
          </TouchableOpacity>
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
      <SafeAreaView style={styles.headerIconButton}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            console.log('clicked--->>>');
          }}
          // style={styles.headerIconButton}
        >
          <Bell width={horizontalScale(55)} height={verticalScale(55)} />
        </TouchableOpacity>
      </SafeAreaView>
      <AddPhotoModal
        onOpenGallery={() => {
          requestGalleryPermission();
        }}
        onOpenCamera={() => {
          requestCameraPermission();
        }}
        image={
          selectedImage
            ? {uri: selectedImage}
            : require('../assets/images/profile.png')
        }
        showPhotoModal={showPhotoModal}
        onClickOutSide={() => {
          setShowPhotoModal(false);
        }}
      />
    </SafeAreaView>
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
    marginTop: pixelSizeVertical(-100),
    borderTopLeftRadius: responsiveBorderRadius(50),
    borderTopRightRadius: responsiveBorderRadius(50),
  },
  profileImage: {
    width: SCREEN_HEIGHT * 0.12,
    height: SCREEN_HEIGHT * 0.12,
    borderRadius: (SCREEN_HEIGHT * 0.12) / 2,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: pixelSizeVertical(-60),
    borderWidth: 1,
    borderColor: '#66276E',
  },
  jhonedoeText: {
    color: 'black',
    textAlign: 'center',
    marginTop: pixelSizeVertical(10),
    fontSize: fontPixel(18),
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
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
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
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  myProfileText: {
    color: 'black',
    fontSize: fontPixel(16),
    fontFamily: FontFamily.regular,
    paddingLeft: pixelSizeHorizontal(-12),
  },
  headerIconButton: {
    alignSelf: 'flex-end',
    marginHorizontal: 20,
    alignItems: 'center',
    marginVertical: 20,
    position: 'absolute',
    right: 10,
    top: Platform.OS === 'ios' ? 60 : 10,
  },
});
