import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import FontFamily from '../../Styles/FontFamily';
import {
  fontPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  responsiveBorderRadius,
} from '../../Utils/Dimensions';

const TICKET_STATUS = {
  CLOSED: 'Closed',
  OPEN: 'Open',
  REOPEN: 'Reopen',
  ASSIGNED: 'Assigned',
};
const {width, height} = Dimensions.get('window');

const MyTickets = ({navigation}) => {
  const data = [
    {
      id: 1,
      roasterType: 'Upcoming',
      tripType: 'pickUp',
      date: '16-02-2024',
      logout: '8:00 pm',
      bookingType: 'Roaster',
      issues: 'Issue with driver',
      Status: 'Closed',
    },
    {
      id: 2,
      roasterType: 'Upcoming',
      tripType: 'pickUp',
      date: '16-02-2024',
      logout: '8:00 pm',
      bookingType: 'Roaster',
      issues: 'Issue with vehicle',
      Status: 'Reopen',
    },
    {
      id: 3,
      roasterType: 'Upcoming',
      tripType: 'pickUp',
      date: '16-02-2024',
      logout: '8:00 pm',
      bookingType: 'Roaster',
      issues: 'Issue with vehicle',
      Status: 'Assigned',
    },
    {
      id: 4,
      roasterType: 'Upcoming',
      tripType: 'logout',
      date: '16-02-2024',
      logout: '8:00 pm',
      bookingType: 'Roaster',
      issues: 'Issue with vehicle',
      CheckInOTP: '5487',
      Status: 'Open',
    },
  ];

  const renderButtonColor = status => {
    let colorCodesByStatus = Object.fromEntries([
      [TICKET_STATUS.OPEN, '#FC6170'],
      [TICKET_STATUS.REOPEN, '#FF8A47'],
      [TICKET_STATUS.CLOSED, '#26BFBF'],
      [TICKET_STATUS.ASSIGNED, '#FFD747'],
    ]);

    return {color: colorCodesByStatus[status], text: status};
  };

  const handleNavigation = () => {
    navigation.navigate('TicketDetails');
  };

  const renderItems = ({item}) => {
    const {color, text} = renderButtonColor(item?.Status);
    const tripType = item.tripType;
    const upperCasedTripType = `${tripType
      .charAt(0)
      .toUpperCase()}${tripType.slice(1)}`;
    return (
      <View style={styles.cardContainer}>
        <View style={styles.tripType}>
          <Text style={styles.tripTypeText}>{upperCasedTripType}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <Text style={styles.issuesText}>{item.issues}</Text>
        <TouchableOpacity
          onPress={item => {
            handleNavigation(item);
          }}
          style={[styles.statusButtons, {backgroundColor: color}]}>
          <Text style={styles.statusTexts}>{text}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList data={data} renderItem={renderItems} />
    </View>
  );
};

export default MyTickets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: pixelSizeHorizontal(25),
  },
  statusButtons: {
    width: width * 0.35,
    height: height * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    borderRadius: responsiveBorderRadius(10),
  },
  statusTexts: {
    color: 'black',
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(14),
  },
  tripType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: pixelSizeVertical(15),
    alignItems: 'center',
  },
  tripTypeText: {
    color: 'black',
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(14),
  },
  date: {
    color: 'black',
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(14),
  },
  issuesText: {
    color: 'black',
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(14),
  },
});
