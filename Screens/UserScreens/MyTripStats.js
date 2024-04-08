import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import BackButton from '../../assets/images/VectorBack.svg';
import {
  fontPixel,
  horizontalScale,
  pixelSizeHorizontal,
  verticalScale,
} from '../Utils/Dimensions';
import FontFamily from '../Styles/FontFamily';
import MyStatsTabNavi from './TopTabsScreens/MyStatsTabNavi';

const MyTripStats = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.headerBackButton}>
          <BackButton width={horizontalScale(25)} height={verticalScale(25)} />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Trip Stats</Text>
      </View>
      <View style={styles.tabContainer}>
        <MyStatsTabNavi />
      </View>
    </SafeAreaView>
  );
};

export default MyTripStats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#66276E',
  },
  headerContainer: {
    flexDirection: 'row',
    padding: pixelSizeHorizontal(20),
    alignItems: 'center',
  },
  headerBackButton: {
    padding: 10,
  },
  headerText: {
    color: 'white',
    fontSize: fontPixel(20),
    fontFamily: FontFamily.regular,
    paddingLeft: pixelSizeHorizontal(15),
  },
  tabContainer: {
    flex: 1
  },
});
