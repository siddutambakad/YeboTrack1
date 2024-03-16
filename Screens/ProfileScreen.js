import {Button, Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const ProfileScreen = () => {
  const handleDialPress = () => {
    // Phone number to dial
    const phoneNumber = '1234567890'; // Replace with the desired phone number

    // Use Linking API to open the dial pad with the specified phone number
    Linking.openURL(`tel:${phoneNumber}`);
  };
  return (
    <View>
       <TouchableOpacity onPress={handleDialPress}>
        <Text>open dialer</Text>
       </TouchableOpacity>
       
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
