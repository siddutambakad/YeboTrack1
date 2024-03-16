import {
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Back from '../../assets/images/VectorBack.svg';
import Sos from '../../assets/images/sos.svg';
import Bell from '../../assets/images/bellIcon.svg';
import {
  fontPixel,
  horizontalScale,
  pixelSizeHorizontal,
  pixelSizeVertical,
  verticalScale,
} from '../Utils/Dimensions';
import FontFamily from '../Styles/FontFamily';
import BottomTab from '../Components/BottomTab';
import Call from '../../assets/images/call.svg';
import Location from '../../assets/images/location.svg';

const EmployeePickUp = () => {
  const [data, setData] = useState([
    {
      employeeName: 'siddu',
      employeeAddress:
        '118, 80 Feet Rd, Above Bodyworks Spa, KHB Colony, 7th Block, Koramangala, Bengaluru, Karnataka 560095',
      image: require('../../assets/images/profile.png'),
    },
    {
      employeeName: 'balu',
      employeeAddress:
        '118, 80 Feet Rd, Above Bodyworks Spa, KHB Colony, 7th Block, Koramangala, Bengaluru, Karnataka 560095',
      image: require('../../assets/images/profile.png'),
    },
    {
      employeeName: 'ankit',
      employeeAddress:
        '118, 80 Feet Rd, Above Bodyworks Spa, KHB Colony, 7th Block, Koramangala, Bengaluru, Karnataka 560095',
      image: require('../../assets/images/profile.png'),
    },
    {
      employeeName: 'mahesh',
      employeeAddress:
        '118, 80 Feet Rd, Above Bodyworks Spa, KHB Colony, 7th Block, Koramangala, Bengaluru, Karnataka 560095',
      image: require('../../assets/images/profile.png'),
    },
  ]);

  const handleDialPress = () => {
    const phoneNumber = '1234567890';
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const openGoogleMaps = () => {
    const latitude = '37.7749';
    const longitude = '-122.4194';
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };
  const renderItems = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.cardContainer} onPress={() => {}}>
        <View style={styles.employeesText}>
          <View style={{flex: 0.3, alignItems: 'center'}}>
            <Image source={item.image} style={styles.profileImage} />
            <Text style={styles.employeeName}>{item.employeeName}</Text>
          </View>
          <View style={{flex: 0.7}}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <TouchableOpacity onPress={handleDialPress}>
                <Call />
              </TouchableOpacity>
              <TouchableOpacity onPress={openGoogleMaps}>
                <Location />
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={{
                  textAlign: 'left',
                  fontSize: fontPixel(16),
                  fontFamily: FontFamily.medium,
                  color: 'black',
                }}>
                {item.employeeAddress}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: pixelSizeHorizontal(20),
          }}>
          <TouchableOpacity
            style={styles.checkOutButton}
            onPress={() => {
              setShowOtpModal(true);
            }}>
            <Text style={styles.checkOutText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.checkOutButton}
            onPress={() => {
              setShowOtpModal(true);
            }}>
            <Text style={styles.checkOutText}>Check In</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <TouchableOpacity
            style={styles.backbutton}
            onPress={() => {
              navigation.goBack();
            }}>
            <Back width={horizontalScale(25)} height={verticalScale(25)} />
            <Text style={styles.backbuttonText}>My Trips</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.subMainHeader}>
          <TouchableOpacity style={{paddingRight: 20}}>
            <Sos width={50} height={50} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            style={styles.bellButton}>
            <Bell width={25} height={25} fill={'#C5197D'} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.subContainer}>
        <FlatList data={data} renderItem={renderItems} style={{flex: 1}} />
        <BottomTab activeTab="MyTrips" />
      </View>
    </View>
  );
};

export default EmployeePickUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(102, 39, 110, 1)',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  backbutton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backbuttonText: {
    color: 'white',
    fontSize: fontPixel(18),
    paddingLeft: 20,
  },
  subMainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bellButton: {
    width: 50,
    height: 50,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  subContainer: {
    flex: 1,
    backgroundColor: 'rgba(246, 246, 246, 1)',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  cardContainer: {
    width: '90%',
    backgroundColor: 'white',
    marginVertical: 20,
    alignSelf: 'center',
    borderRadius: 20,
    paddingHorizontal: pixelSizeHorizontal(20),
    paddingVertical: pixelSizeVertical(20),
  },
  employeesText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: '100%',
    flex: 1,
  },
  profileImage: {
    width: 62,
    height: 62,
  },
  employeeName: {
    fontFamily: FontFamily.semiBold,
    fontSize: fontPixel(18),
    color: 'black',
  },
  checkOutButton: {
    width: horizontalScale(120),
    backgroundColor: 'rgba(197, 25, 125, 1)',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    // marginRight: 20,
    borderRadius: 8,
  },
  checkOutText: {
    color: 'white',
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(14),
  },
});
