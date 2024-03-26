import {
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {handleCallPress, openGoogleMap} from '../Utils/ReusableFunctions';
import RN from 'react-native';
const SCREEN_HEIGHT = RN.Dimensions.get('window').height;

const EmployeePickUp = ({navigation, route}) => {
  const {employeeDetail} = route.params;
  const [showConformationModal, setShowConformationModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [updatedEmployeeDetail, setUpdatedEmployeeDetail] =
    useState(employeeDetail);

  const openGoogleMaps = item => {
    openGoogleMap(item?.pickUpLocation);
    console.log('pickUpLocation', item?.pickUpLocation);
  };

  const handleDialPress = item => {
    handleCallPress(item?.employeeMobile);
  };
  const removeItem = () => {
    if (selectedItemIndex !== null) {
      const newData = [...updatedEmployeeDetail];
      newData.splice(selectedItemIndex, 1); // Remove the item at selectedItemIndex
      setUpdatedEmployeeDetail(newData); // Update the state with the new data
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

  useEffect(() => {
    if (updatedEmployeeDetail.length === 0) {
      const clickedTime = formatTime(new Date()); // Get the current time
      navigation.navigate('MyTripDetail', {
        otpVerified: true,
        clickedTime: clickedTime,
      });
    }
  }, [updatedEmployeeDetail]);

  const renderItems = ({item, index}) => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.employeesText}>
          <View style={{flex: 0.4, alignItems: 'center'}}>
            <Image
              source={require('../../assets/images/profile.png')}
              style={styles.profileImage}
            />
            <Text style={styles.employeeName}>{item.employeeName}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginVertical: pixelSizeVertical(8),
              }}>
              <TouchableOpacity
                onPress={() => {
                  handleDialPress(item);
                }}>
                <Call width={horizontalScale(45)} height={verticalScale(45)} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  openGoogleMaps(item);
                }}>
                <Location
                  width={horizontalScale(45)}
                  height={verticalScale(45)}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 0.6}}>
            <View>
              <Text
                style={{
                  textAlign: 'left',
                  fontSize: fontPixel(14),
                  fontFamily: FontFamily.medium,
                  color: 'black',
                }}>
                {item?.dropLocationName}
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
      </View>
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
          <TouchableOpacity activeOpacity={1} onPress={() => {}}>
            <Bell
              width={horizontalScale(50)}
              height={verticalScale(50)}
              fill={'#C5197D'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.subContainer}>
        <FlatList
          data={updatedEmployeeDetail}
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
    width: SCREEN_HEIGHT * 0.06,
    height: SCREEN_HEIGHT * 0.06,
    borderRadius: (SCREEN_HEIGHT * 0.06) / 2,
  },
  employeeName: {
    fontFamily: FontFamily.semiBold,
    fontSize: fontPixel(14),
    color: 'black',
    textAlign: 'center',
  },
  checkOutButton: {
    width: horizontalScale(120),
    backgroundColor: 'rgba(197, 25, 125, 1)',
    height: verticalScale(45),
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
