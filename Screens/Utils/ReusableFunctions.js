import {Linking, Platform} from 'react-native';

export const handleCallPress = phoneNumber => {
  Linking.openURL(`tel:${phoneNumber}`);
};

export const openGoogleMap = (latitude, longitude) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
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