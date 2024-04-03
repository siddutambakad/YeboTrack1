import {
  FlatList,
  Image,
  Linking,
  PermissionsAndroid,
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
import {
  convertedTime,
  convertedTimeforEvent,
  getCurrentLocation,
  getLocationName,
  handleCallPress,
  openGoogleMap,
  requestLocationPermission,
} from '../Utils/ReusableFunctions';
import RN from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import {APIS} from '../APIURLS/ApiUrls';
import Loader from '../Components/Loader';
const SCREEN_HEIGHT = RN.Dimensions.get('window').height;

const EmployeePickUp = ({navigation, route}) => {
  const {employeeDetail, tripId, tripType} = route.params;
  console.log("🚀 ~ EmployeePickUp ~ tripType:", tripType)

  const [showConformationModal, setShowConformationModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [updatedEmployeeDetail, setUpdatedEmployeeDetail] =
    useState(employeeDetail);
   
  const [loader, setLoader] = useState(false);
  const [checkinResponse, setCheckInResponse] = useState([]);
  const [otpError, setOtpError] = useState({
    isOtpError: false,
    otpErrorMessage: '',
  });
  const [tripIds, setTripIds] = useState(null);
  const [idRoasterDays, setIdRoasterDays] = useState(null);

  const openGoogleMaps = item => {
    openGoogleMap(item?.pickUpLocation);
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

  useEffect(() => {
    console.log('hi1');
    if (updatedEmployeeDetail.length === 0) {
      console.log('hi2');
      if (updatedEmployeeDetail.roasterRoutetypeDesc === 'PickUp') {
        // navigation.navigate('MyTripDetail', {
        //   otpVerified: true,
        //   tripId: tripIds,
        //   idRoasterDays: idRoasterDays,
        // });
        console.log('hi3');
      } else if (employeeDetail.roasterRoutetypeDesc === 'Drop') {
        // navigation.navigate('MyLogoutTrip', {
        //   otpVerified: true,
        //   tripId: tripIds,
        //   idRoasterDays: idRoasterDays,
        // });
        console.log('hello');
      }
    }
  }, [updatedEmployeeDetail]);

  const sendOtpForEmployeeCheckIn = async item => {
    setLoader(true);
    setOtpError({
      isOtpError: false,
      otpErrorMessage: '',
    });
    try {
      await requestLocationPermission();
      const currentLocation = await getCurrentLocation();
      const {latitude, longitude} = currentLocation;

      const locationName = await getLocationName(latitude, longitude);
      const requestBodyForEmployee = {
        tripId: tripId,
        roasterId: item.idRoaster,
        roasterDetailId: item.idRoasterDetails,
        idRoasterDays: item.idRoasterDays,
        tripEventDtm: convertedTimeforEvent(),
        eventGpsdtm: convertedTime(),
        eventGpslocationLatLon: `${latitude},${longitude}`,
        eventGpslocationName: locationName,
        employeeID: item.idEmployee,
        mobileNo: item.employeeMobile,
        driverID: item.driverId,
        routeType: item.roasterRoutetype,
      };
      console.log(
        '\nrequestBodyForEmployee',
        JSON.stringify(requestBodyForEmployee, null, 2),
        '\n',
      );
      const apiUrl = `${APIS.sendOtpForEmployeeCheckIn}`;
      const apiResponse = await axios.post(apiUrl, requestBodyForEmployee);
      console.log(
        '\nrapiResponse',
        JSON.stringify(apiResponse.data?.returnLst, null, 2),
        '\n',
      );
      setCheckInResponse(apiResponse.data?.returnLst);
      setShowOtpModal(true);
    } catch (error) {
      console.log('\nerror', JSON.stringify(error?.message, null, 2), '\n');
    } finally {
      setLoader(false);
    }
  };

  const validateOtpForEmployee = async enteredOtp => {
    setLoader(true);
    try {
      await requestLocationPermission();
      const currentLocation = await getCurrentLocation();
      const {latitude, longitude} = currentLocation;

      const locationName = await getLocationName(latitude, longitude);
      const apiUrl = `${APIS.validateEmployeeCheckIn}`;
      const validateEmployee = {
        tripId: checkinResponse?.tripId,
        roasterId: checkinResponse?.roasterId,
        roasterDetailId: checkinResponse?.roasterDetailId,
        idRoasterDays: checkinResponse?.roasterDaysId,
        emplolyeeID: checkinResponse?.employeeId,
        mobileNo: checkinResponse.mobileNo,
        tripOtp: enteredOtp,
        empOTPGPSDTM: convertedTime(),
        empOTPGPSLocationLatLon: `${latitude},${longitude}`,
        empOTPGPSLocationName: locationName,
      };
      const response = await axios.post(apiUrl, validateEmployee);
      console.log(
        '\nvalidOtpresponse',
        JSON.stringify(response.data.returnLst, null, 2),
        '\n',
      );
      const tripId = response.data.returnLst?.tripId;
      setTripIds(tripId);
      setIdRoasterDays(response.data?.returnLst?.idRoasterDays);
      if (response.data.statusCode === 200) {
        setOtpError({
          isOtpError: false,
          otpErrorMessage: '',
        });
      } else {
        setOtpError({
          isOtpError: true,
          otpErrorMessage: 'Incorrect Otp',
        });
      }
    } catch (error) {
      console.log('\nvalidOtperror', JSON.stringify(error, null, 2), '\n');
    } finally {
      setLoader(false);
    }
  };

  const skipEmployeeOtp = async (item, _tripId) => {
    setLoader(true);
    try {
      await requestLocationPermission();
      const currentLocation = await getCurrentLocation();
      const {latitude, longitude} = currentLocation;

      const locationName = await getLocationName(latitude, longitude);
      const apiUrl = `${APIS.sendSkipEmpCheckIn}`;
      const skipRequestBody = {
        tripId: _tripId,
        roasterId: item?.idRoaster,
        roasterDetailId: item?.idRoasterDetails,
        tripEventDtm: convertedTimeforEvent(),
        eventGpsdtm: convertedTime(),
        eventGpslocationLatLon: `${latitude},${longitude}`,
        eventGpslocationName: locationName,
        employeeID: item?.idEmployee,
        driverID: item?.driverId,
        routeType: item?.roasterRoutetype,
      };
      console.log('🚀 ~ skipEmployeeOtp ~ skipRequestBody:', skipRequestBody);
      const skipResponse = await axios.post(apiUrl, skipRequestBody);
      console.log(
        '\nvskipResponse',
        JSON.stringify(skipResponse.data.returnLst, null, 2),
        '\n',
      );
      const tripId = skipResponse.data.returnLst?.tripId;

      setTripIds(tripId);
      setIdRoasterDays(skipResponse.data?.returnLst?.idRoasterDays);
      removeItem();
      setShowConformationModal(false);
    } catch (error) {
      console.log('\nerror', JSON.stringify(error?.message, null, 2), '\n');
    } finally {
      setLoader(false);
    }
  };

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
                {item?.pickUpLocationName}
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
              sendOtpForEmployeeCheckIn(item);
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
          skipEmployeeOtp(updatedEmployeeDetail[selectedItemIndex], tripId);
          setShowConformationModal(false);
        }}
      />
      <CustomModal
        visible={showOtpModal}
        onClose={() => {
          setShowOtpModal(false);
        }}
        onPressSubmitButton={enteredOtp => {
          validateOtpForEmployee(
            enteredOtp,
            updatedEmployeeDetail[selectedItemIndex],
          );
          setShowOtpModal(false);
          removeItem();
        }}
        onPressCancelButton={() => {
          setShowOtpModal(false);
        }}
        title={'Enter Employee check-In pin '}
        isOtpError={otpError.isOtpError}
        OTPErrorMessage={otpError.otpErrorMessage}
      />
      {loader && <Loader />}
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
