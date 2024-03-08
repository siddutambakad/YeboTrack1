import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Logo from '../assets/images/yeboLogo.svg';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Logo width={120} height={40} />
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
