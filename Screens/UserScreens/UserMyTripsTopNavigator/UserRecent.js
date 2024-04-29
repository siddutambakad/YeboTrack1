import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import Loader from '../../Components/Loader';
import {Rating} from 'react-native-ratings';
import {fontPixel} from '../../Utils/Dimensions';
import FontFamily from '../../Styles/FontFamily';
import {AppContext} from '../../Context/AppContext';
import {formatDate} from '../../Utils/ReusableFunctions';
import {useFocusEffect} from '@react-navigation/native';

const UserRecent = () => {
  // const data = [
  //   {
  //     id: 1,
  //     roasterType: 'Upcoming',
  //     tripType: 'pickUp',
  //     date: '16-02-2024',
  //     logout: '8:00 pm',
  //     bookingType: 'Roaster',
  //     vehicle: 'MI 01 6667 (R6667)',
  //     Sequence: '1',
  //     CheckInOTP: '5487',
  //     Status: 'Vehicle allocated',
  //   },
  //   {
  //     id: 2,
  //     roasterType: 'Upcoming',
  //     tripType: 'pickUp',
  //     date: '16-02-2024',
  //     logout: '8:00 pm',
  //     bookingType: 'Roaster',
  //     vehicle: 'MI 01 6667 (R6667)',
  //     Sequence: '1',
  //     CheckInOTP: '5487',
  //     Status: 'Vehicle allocated',
  //   },
  //   {
  //     id: 3,
  //     roasterType: 'Upcoming',
  //     tripType: 'pickUp',
  //     date: '16-02-2024',
  //     logout: '8:00 pm',
  //     bookingType: 'Roaster',
  //     vehicle: 'MI 01 6667 (R6667)',
  //     Sequence: '1',
  //     CheckInOTP: '5487',
  //     Status: 'Vehicle allocated',
  //   },
  //   {
  //     id: 4,
  //     roasterType: 'Upcoming',
  //     tripType: 'logout',
  //     date: '16-02-2024',
  //     logout: '8:00 pm',
  //     bookingType: 'Roaster',
  //     vehicle: 'MI 01 6667 (R6667)',
  //     Status: 'Vehicle allocated',
  //     Sequence: '1',
  //     CheckInOTP: '5487',
  //   },
  // ];
  const {employeeRoasterList, getUserList, idEmployee, setLoader, loader} =
    useContext(AppContext);
  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [idEmployee]),
  );
  const loadData = async () => {
    setLoader(true);
    await getUserList(idEmployee);
    setLoader(false);
  };
  const renderItems = ({item, index}) => {
    // const tripType = item?.roasterRoutetypeDesc; // Get the trip type
    // const capitalizedTripType = `${tripType
    //   .charAt(0)
    //   .toUpperCase()}${tripType.slice(1)}`;

    return (
      <View style={{marginVertical: 10, marginHorizontal: 20}}>
        <Text style={styles.ticketNoText}>{item?.roasterRoutetypeDesc}</Text>
        <Text style={styles.dateAndTimeText}>{`Date: ${formatDate(
          item?.roasterPlanDtms,
        )}`}</Text>
        <Text style={styles.dbTestText}>{`${item?.roasterStatusDesc}`}</Text>
        <View style={styles.rateing}>
          <Text
            style={
              styles.rateingText
            }>{`vehicleRegNo: ${item?.vehicleRegNo}`}</Text>
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
            startingValue={item?.driverRating}
            readonly
          />
        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(246, 246, 246, 1)',
        justifyContent:
          employeeRoasterList.recent.length === 0 ? 'center' : null,
      }}>
      {employeeRoasterList.recent.length === 0 ? (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              fontFamily: FontFamily.medium,
              fontSize: fontPixel(18),
              color: 'black',
            }}>
            No Recent Trips
          </Text>
        </View>
      ) : (
        <FlatList
          data={employeeRoasterList?.recent}
          renderItem={renderItems}
          style={{marginTop: 20}}
        />
      )}
      {loader && <Loader />}
    </View>
  );
};

export default UserRecent;

const styles = StyleSheet.create({
  ticketNoText: {
    color: 'black',
    fontSize: fontPixel(20),
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
