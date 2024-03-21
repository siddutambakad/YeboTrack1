import { Linking } from 'react-native';

export const handleCallPress = (phoneNumber) => {
  Linking.openURL(`tel:${phoneNumber}`);
};

export const openGoogleMap = (latitude, longitude) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  Linking.openURL(url);
};