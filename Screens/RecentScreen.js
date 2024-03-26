import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import FontFamily from './Styles/FontFamily';
import {AirbnbRating, Rating} from 'react-native-ratings';
import { AppContext, UpcomingLists } from './Context/AppContext';
import { fontPixel } from './Utils/Dimensions';

const RecentScreen = () => {
  // const [data, setData] = useState([1, 1, 1, 1, 1, 1, 1]);
const {driverRoasterList} = useContext(AppContext)

  const renderItems = (item, index) => {
    return (
      <View style={{marginVertical: 10, marginHorizontal: 20}}>
        <Text
          style={styles.ticketNoText}>
          Ticket no. - 00052386-1
        </Text>
        <Text
          style={styles.dateAndTimeText}>
          13March 2021 12:30 PM
        </Text>
        <Text
          style={styles.dbTestText}>
          debTest
        </Text>
        <View
          style={styles.rateing}>
          <Text
            style={styles.rateingText}>
            OR O5 1234
          </Text>
          <Rating
            type="star"
            tintColor="#F6F6F6"
            // ratingImage={require('../assets/images/star.png')}
            ratingBackgroundColor="white"
            ratingColor="#C5197D"
            ratingCount={5}
            imageSize={18}
            fractions={1}
            jumpValue={0.5}
            startingValue={4.5}
            readonly
          />
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: 'rgba(246, 246, 246, 1)'}}>
      <FlatList data={driverRoasterList?.recent} renderItem={renderItems} style={{marginTop: 20}} />
    </View>
  );
};

export default RecentScreen;

const styles = StyleSheet.create({
  ticketNoText: {
    color: 'black',
    fontSize: fontPixel(19),
    fontFamily: FontFamily.semiBold,
  },
  dateAndTimeText: {
    color: 'black',
    marginTop: 8,
    fontSize: fontPixel(14),
    fontFamily: FontFamily.regular,
  },
  dbTestText: {
    color: 'black',
    marginTop: 8,
    fontSize: fontPixel(14),
    fontFamily: FontFamily.regular,
  },
  rateing: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rateingText: {
    color: 'black',
    marginTop: 8,
    fontSize: fontPixel(14),
    fontFamily: FontFamily.regular,
  },
});
