// import React from 'react';
// import { View, Image, Dimensions, StyleSheet, KeyboardAvoidingView } from 'react-native';

// const ScreenHeight = Dimensions.get('window').height;

// const AdhacScreen = () => {
//   return (
//     <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
//       {/* Div taking up 70% of screen height */}
//       <View style={[styles.div, { height: 0.7 * ScreenHeight }]}>
//         {/* Your content inside the div */}
//       </View>

//       {/* Image taking up 30% of screen height */}
//       <View style={[styles.imageContainer, { height: 0.3 * ScreenHeight }]}>
//         <Image source={require('../assets/images/bottomImage.png')} style={styles.image} />
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   div: {
//     // Styles for the div
//   },
//   imageContainer: {
//     // Additional styles for the image container if needed
//   },
//   image: {
//     flex: 1,
//     width: undefined,
//     height: undefined,
//     resizeMode: 'cover',
//   },
// });

// export default AdhacScreen;

import React from 'react';
import { View, Image, Dimensions, StyleSheet, Platform, StatusBar } from 'react-native';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;
const StatusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;
const NavigationBarHeight = 0; // Adjust this according to your device's default navigation bar height

const AdhacScreen = () => {
  // Calculate available screen height after considering status bar and navigation bar
  const availableScreenHeight =((ScreenHeight>550))? ((ScreenWidth>550)?ScreenHeight - StatusBarHeight - NavigationBarHeight:ScreenHeight):
  ScreenHeight - StatusBarHeight - NavigationBarHeight;

  // Calculate the height of your components based on the available screen height
  const divHeight = 0.7 * availableScreenHeight;
  const imageHeight = 0.3 * availableScreenHeight;

  return (
    <View style={styles.container}>
      {/* Div taking up 70% of screen height */}
      <View style={[styles.div, { height: divHeight }]}>
        {/* Your content inside the div */}
      </View>

      {/* Image taking up 30% of screen height */}
      <View style={[styles.imageContainer, { height: imageHeight }]}>
        <Image source={require('../assets/images/bottomImage.png')} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  div: {
    // Styles for the div
  },
  imageContainer: {
    // Additional styles for the image container if needed
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
    borderWidth:5,
    borderColor:'red'
  },
});

export default AdhacScreen;
