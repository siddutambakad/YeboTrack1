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
import ConformationModal from '../Components/ConformationModal';
import CustomModal from '../Components/Modal';

const EmployeePickUp = ({navigation}) => {
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
  const [showConformationModal, setShowConformationModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

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
  const removeItem = () => {
    if (selectedItemIndex !== null) {
      const newData = [...data];
      newData.splice(selectedItemIndex, 1); // Remove the item at selectedItemIndex
      setData(newData);
    }
    setShowConformationModal(false);
  };

  const formatTime = time => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const amOrPm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12; // Convert 0 to 12
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
  };
  const handleButtonClick = index => {
    const currentTime = new Date();
    const formattedTime = formatTime(currentTime);
    return formattedTime;
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
              setShowConformationModal(true);
              setSelectedItemIndex(index);
            }}>
            <Text style={styles.checkOutText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.checkOutButton}
            onPress={() => {
              setShowOtpModal(true);
              setSelectedItemIndex(index);
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
            <Text style={styles.backbuttonText}>Employee Check In</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.subMainHeader}>
          <TouchableOpacity style={{paddingRight: 20}}>
            <Sos width={horizontalScale(50)} height={verticalScale(50)} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}>
            <Bell width={horizontalScale(50)} height={verticalScale(50)} fill={'#C5197D'} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.subContainer}>
        <FlatList
          data={data}
          renderItem={renderItems}
          style={{marginTop: pixelSizeVertical(10)}}
        />
        <BottomTab activeTab="MyTrips" />
      </View>
      <ConformationModal
        showConfirmModal={showConformationModal}
        title={'Are you sure you want to skip the employee pickup?'}
        onPressNo={() => {
          setShowConformationModal(false);
        }}
        onPressYes={() => {
          removeItem();
          if (data.length === 1) {
            navigation.navigate('UpcomingScreen');
          }
        }}
      />
      <CustomModal
        visible={showOtpModal}
        onClose={() => {
          setShowOtpModal(false);
        }}
        onPressSubmitButton={() => {
          handleButtonClick();
          setShowOtpModal(false);
          removeItem();
          if (data.length === 1) {
            navigation.navigate('MyTripDetail', {
              otpVerified: true,
              clickedTime: handleButtonClick(),
            });
          }
        }}
        onPressCancelButton={() => {
          setShowOtpModal(false);
        }}
        title={'Enter Employee check-In pin '}
      />
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
    fontFamily: FontFamily.regular,
  },
  subMainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subContainer: {
    flex: 1,
    backgroundColor: 'rgba(246, 246, 246, 1)',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
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
