import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';

export const handleCallPress = phoneNumber => {
  Linking.openURL(`tel:${phoneNumber}`);
};

export const openGoogleMap = (latitude, longitude) => {
  // const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  const url = `geo:${latitude},${longitude}?q=my_location`;
  Linking.openURL(url);
};

export const formatDate = dateString => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  return `${day}-${month}-${year}`;
};
export const convertedTime = () => {
  const time = new Date();
  const year = time.getFullYear();
  const month = ('0' + (time.getMonth() + 1)).slice(-2);
  const day = ('0' + time.getDate()).slice(-2);
  const hours = ('0' + time.getHours()).slice(-2);
  const minutes = ('0' + time.getMinutes()).slice(-2);
  const seconds = ('0' + time.getSeconds()).slice(-2);

  // Format the time string
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};
export const convertedTimeforEvent = () => {
  const time = new Date();
  const year = time.getFullYear();
  const month = ('0' + (time.getMonth() + 1)).slice(-2);
  const day = ('0' + time.getDate()).slice(-2);
  const hours = ('0' + time.getHours()).slice(-2);
  const minutes = ('0' + time.getMinutes()).slice(-2);
  const seconds = ('0' + time.getSeconds()).slice(-2);

  // Format the time string
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const openSettings = () => {
  // Open app settings for Android or app info page for iOS
  if (Platform.OS === 'android') {
    Linking.openSettings();
  } else {
    Linking.openURL('app-settings:');
  }
};

export const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      getCurrentLocation();
    } else {
      console.log('Location permission denied');
      Alert.alert(
        'Alert!!',
        'Please grant location permission to use this feature.',
        [
          {
            text: 'Ask me Later',
          },
          {
            text: 'Cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              openSettings();
            },
          },
        ],
        {cancelable: false},
      );
    }
  } catch (err) {
    console.warn(err);
  }
};

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        resolve({latitude, longitude});
      },
      error => {
        console.log('Error getting current location:', error);
        reject(error);
      },
      {enableHighAccuracy: true},
    );
  });
};

export const getLocationName = async (latitude, longitude) => {
  try {
    const apiKey = 'AIzaSyAol1uOPzQnphvxtIatoLH-Ayw6OUwRpbA';
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`,
    );

    // Parse the response
    const {results} = response.data;
    if (results && results.length > 0) {
      // Extract the formatted address or other relevant information
      const locationName = results[0].formatted_address;
      return locationName;
    } else {
      return 'Unknown Location';
    }
  } catch (error) {
    console.error('Error fetching location:', error);
    return 'Unknown Location';
  }
};
