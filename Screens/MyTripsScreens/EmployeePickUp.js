import {
  FlatList,
  Image,
  Linking,
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
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
import {AppContext} from '../Context/AppContext';
const SCREEN_HEIGHT = RN.Dimensions.get('window').height;

const EmployeePickUp = ({navigation, route}) => {
  const {tripId, idTrip, idRoasterDays: idMainRoasterDays} = route.params;
  console.log('🚀 ~ EmployeePickUp ~ tripId:', tripId);

  const [showConformationModal, setShowConformationModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);

  const [loader, setLoader] = useState(false);
  const [checkinResponse, setCheckInResponse] = useState([]);
  const [otpError, setOtpError] = useState({
    isOtpError: false,
    otpErrorMessage: '',
  });
  const [tripIds, setTripIds] = useState(null);
  const [idRoasterDays, setIdRoasterDays] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const {getTripDetails, employeeDetails, idTrips} = useContext(AppContext);
  console.log("🚀 ~ EmployeePickUp ~ idTrip:", idTrips)
  // console.log('🚀 ~ EmployeePickUp ~ employeeDetails:', employeeDetails);
  const [rousterRouteType, setRousterRouteType] = useState(0);
  console.log('🚀 ~ EmployeePickUp ~ rousterRouteType:', rousterRouteType);
  const [newEmployeeList, setNewEmployeeList] = useState([]);
  const [driverContactNo, setDriverContactNo] = useState(null);

  useEffect(() => {
    // Filter employeeDetails when it changes
    if (employeeDetails) {
      const filteredList = employeeDetails.filter(
        filterObj => filterObj.tripBoardStatus.onBoardStatus === 0,
      );
      if (filteredList.length === 0) {
        if (rousterRouteType === 1) {
          navigationScreen('MyTripDetail');
        } else {
          navigationScreen('MyLogoutTrip');
        }
      } else {
        setRousterRouteType(filteredList[0]?.roasterRoutetype);
      }
      console.log(
        '\nfilteredList===>>>',
        JSON.stringify(filteredList[0]?.roasterRoutetype, null, 2),
        '\n',
      );
      setNewEmployeeList(filteredList);
    }
  }, [employeeDetails]);

  const navigationScreen = screenName => {
    navigation.navigate(screenName, {
      otpVerified: true,
      tripId: tripIds,
      idRoasterDays: idRoasterDays,
      driverContactNo: driverContactNo,
    });
  };

  const openGoogleMaps = item => {
    const [latitude, longitude] = item?.dropLocation?.split(',') || [];

    if (latitude && longitude) {
      openGoogleMap(parseFloat(latitude), parseFloat(longitude));
    } else {
      console.error('Invalid drop location format:', item.dropLocation);
    }
  };

  const handleDialPress = item => {
    handleCallPress(item?.employeeMobile);
  };

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
        tripId: idTrips,
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

      setCheckInResponse(apiResponse.data?.returnLst);
      setShowOtpModal(true);
    } catch (error) {
      console.log('\nerror', JSON.stringify(error?.message, null, 2), '\n');
      if (error.response.data.statusMessage === 'Record Exists') {
        setShowOtpModal(true);
      } else {
        setShowOtpModal(false);
      }
    } finally {
      setLoader(false);
    }
  };

  const validateOtpForEmployee = async (enteredOtp, selectedItem) => {
    setLoader(true);
    try {
      await requestLocationPermission();
      const currentLocation = await getCurrentLocation();
      const {latitude, longitude} = currentLocation;

      const locationName = await getLocationName(latitude, longitude);
      const apiUrl = `${APIS.validateEmployeeCheckIn}`;
      const validateEmployee = {
        tripId: idTrips,
        roasterId: selectedItem?.idRoaster,
        roasterDetailId: selectedItem?.idRoasterDetails,
        idRoasterDays: selectedItem?.idRoasterDays,
        emplolyeeID: selectedItem?.idEmployee,
        mobileNo: selectedItem?.employeeMobile,
        tripOtp: enteredOtp,
        empOTPGPSDTM: convertedTime(),
        empOTPGPSLocationLatLon: `${latitude},${longitude}`,
        empOTPGPSLocationName: locationName,
      };
      console.log(
        '\nvalidateEmployee',
        JSON.stringify(validateEmployee, null, 2),
        '\n',
      );
      const response = await axios.post(apiUrl, validateEmployee);
      console.log(
        '\nvalidOtpresponse',
        JSON.stringify(response.data.returnLst, null, 2),
        '\n',
      );
      const tripIds = response.data.returnLst?.tripId;
      setTripIds(tripIds);
      setIdRoasterDays(response.data?.returnLst?.idRoasterDays);
      setDriverContactNo(response.data?.returnLst?.driverContactNo);
      await getTripDetails(idMainRoasterDays);

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

  const skipEmployeeOtp = async item => {
    setLoader(true);
    try {
      await requestLocationPermission();
      const currentLocation = await getCurrentLocation();
      const {latitude, longitude} = currentLocation;

      const locationName = await getLocationName(latitude, longitude);
      const apiUrl = `${APIS.sendSkipEmpCheckIn}`;
      const skipRequestBody = {
        tripId: idTrips,
        roasterId: item?.idRoaster,
        roasterDetailId: item?.idRoasterDetails,
        idRoasterDays: item?.idRoasterDays,
        tripEventDtm: convertedTimeforEvent(),
        eventGpsdtm: convertedTime(),
        eventGpslocationLatLon: `${latitude},${longitude}`,
        eventGpslocationName: locationName,
        employeeID: item?.idEmployee,
        driverID: item?.driverId,
        routeType: item?.roasterRoutetype,
      };
      console.log(
        '\nskipRequestBody',
        JSON.stringify(skipRequestBody, null, 2),
        '\n',
      );
      const skipResponse = await axios.post(apiUrl, skipRequestBody);
      console.log(
        '\nvskipResponse',
        JSON.stringify(skipResponse, null, 2),
        '\n',
      );
      const {tripIds, onBoardStatusDesc} = skipResponse.data.returnLst;
      console.log(
        '🚀 ~ skipEmployeeOtp ~ onBoardStatusDesc:',
        onBoardStatusDesc,
      );
      await getTripDetails(idMainRoasterDays);

      setTripIds(tripIds);
      setIdRoasterDays(skipResponse.data?.returnLst?.idRoasterDays);
      setDriverContactNo(skipResponse.data?.returnLst?.driverContactNo);
      setShowConformationModal(false);
    } catch (error) {
      console.log(
        '\nerror===>>',
        JSON.stringify(error?.message, null, 2),
        '\n',
      );
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
              setSelectedItem(item);
            }}>
            <Text style={styles.checkOutText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.checkOutButton}
            onPress={() => {
              sendOtpForEmployeeCheckIn(item);
              setSelectedItem(item);
              console.log(
                'selecteditem for checkin',
                selectedItem?.idRoasterDays,
              );
            }}>
            <Text style={styles.checkOutText}>Check In</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
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
          data={newEmployeeList}
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
        onPressYes={item => {
          setShowConformationModal(false);
          skipEmployeeOtp(selectedItem);
          console.log('selectedItem', selectedItem?.idRoasterDetails);
        }}
      />
      <CustomModal
        visible={showOtpModal}
        onClose={() => {
          setShowOtpModal(false);
        }}
        onPressSubmitButton={enteredOtp => {
          validateOtpForEmployee(enteredOtp, selectedItem);
          setShowOtpModal(false);
        }}
        onPressCancelButton={() => {
          setShowOtpModal(false);
        }}
        title={'Enter Employee check-In pin '}
        isOtpError={otpError.isOtpError}
        OTPErrorMessage={otpError.otpErrorMessage}
      />
      {loader && <Loader />}
    </SafeAreaView>
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
