import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Logo from '../assets/images/yeboLogo.svg';
import { horizontalScale, verticalScale } from './Utils/Dimensions';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Logo width={horizontalScale(120)} height={verticalScale(40)} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C5197D',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
