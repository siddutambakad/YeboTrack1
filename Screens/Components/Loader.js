import {View, Text, StyleSheet, ActivityIndicator, Image} from 'react-native';
import React from 'react';
import {horizontalScale, verticalScale} from '../Utils/Dimensions';

const Loader = () => {
  return (
    <View style={styles.Loader}>
      {/* <ActivityIndicator
        size={50}
        color={'#C5197D'}
        animating={true}></ActivityIndicator> */}
      <Image
        source={require('../../assets/Gifs/lazyloader.gif')}
        style={{
          width: horizontalScale(70),
          height: verticalScale(80),
        }}
      />
    </View>
  );
};

export default Loader;
const styles = StyleSheet.create({
  Loader: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    zIndex: 5,
  },
});
