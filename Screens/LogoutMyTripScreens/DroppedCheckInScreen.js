import {
  FlatList,
  Image,
  Linking,
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
import Clock from '../../assets/images/clock.svg';
import FontFamily from '../Styles/FontFamily';
import Call from '../../assets/images/call.svg';
import Location from '../../assets/images/location.svg';
import {
  fontPixel,
  horizontalScale,
  pixelSizeHorizontal,
  pixelSizeVertical,
  verticalScale,
} from '../Utils/Dimensions';
import CustomModal from '../Components/Modal';
import BottomTab from '../Components/BottomTab';
import RN from 'react-native';
import {
  convertedTime,
  convertedTimeforEvent,
  getCurrentLocation,
  getLocationName,
  handleCallPress,
  openGoogleMap,
  requestLocationPermission,
} from '../Utils/ReusableFunctions';
import {AppContext} from '../Context/AppContext';
import ConformationModal from '../Components/ConformationModal';
import {APIS} from '../APIURLS/ApiUrls';
import axios from 'axios';
import Loader from '../Components/Loader';

const SCREEN_HEIGHT = RN.Dimensions.get('window').height;

const DroppedCheckInScreen = ({navigation, route}) => {
  const {
    tripId,
    tripType,
    roasterIds,
    selectedPosition,
    tripDetail,
    _tripDetail,
  } = route.params;
  const [showConformationModal, setShowConformationModal] = useState(false);
  const [showConformationCheckOutModal, setShowConformationCheckOutModal] =
    useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);

  const [loader, setLoader] = useState(false);
  const [otpError, setOtpError] = useState({
    isOtpError: false,
    otpErrorMessage: '',
  });
  const [tripIds, setTripIds] = useState(null);
  const [idRoasterDays, setIdRoasterDays] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  // console.log("🚀 ~ DroppedCheckInScreen ~ selectedItem:", selectedItem)
  const {getTripDetails, employeeDetails, idTrip} = useContext(AppContext);
  // console.log(
  //   '\nemployeeDetails',
  //   JSON.stringify(employeeDetails, null, 2),
  //   '\n',
  // );
  const [rousterRouteType, setRousterRouteType] = useState(0);
  // console.log('🚀 ~ EmployeePickUp ~ rousterRouteType:', rousterRouteType);
  const [newEmployeeList, setNewEmployeeList] = useState([]);
  // console.log(
  //   '\nnewEmployeeList',
  //   JSON.stringify(newEmployeeList, null, 2),
  //   '\n',
  // );
  // const setSelectedPosition = navigation.getParam('setSelectedPosition');

  useEffect(() => {
    if (employeeDetails) {
      const filteredList =
        employeeDetails.filter(
          filterObj => filterObj.tripBoardStatus?.onBoardStatus === 1,
        ) || [];
      if (filteredList.length === 0) {
        navigationScreen('MyLogoutTrip');
        // selectedPosition(4);
        // tripDetail({..._tripDetail,tripStatusDesc: "Trip CheckOut"})
      } else {
        setRousterRouteType(filteredList[0]?.roasterRoutetype);
      }
      setNewEmployeeList(filteredList);
    }
  }, [employeeDetails]);

  const navigationScreen = screenName => {
    navigation.navigate(screenName, {
      employeeCheckedOut: true,
      tripId: tripIds,
      idRoasterDays: idRoasterDays,
      otpVerified: false,
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
    handleCallPress(`${item?.employeeMobile}`);
  };

  const sendBeakEmployee = async item => {
    setLoader(true);
    try {
      await requestLocationPermission();
      const currentLocation = await getCurrentLocation();
      const {latitude, longitude} = currentLocation;
      const apiUrl = `${APIS.sendBreakEmployeeTrip}`;
      const locationName = await getLocationName(latitude, longitude);
      const requestBodyForBreakEmp = {
        tripId: idTrip,
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
        '\nrequestBodyForBreakEmp',
        JSON.stringify(requestBodyForBreakEmp, null, 2),
        '\n',
      );
      const response = await axios.post(apiUrl, requestBodyForBreakEmp);
      console.log('\nresponse', JSON.stringify(response, null, 2), '\n');
      await getTripDetails(roasterIds);

      setTripIds(tripIds);
      setIdRoasterDays(response.data?.returnLst?.idRoasterDays);
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

  const sendEmpTripCheckOut = async item => {
    console.log('🚀 ~ sendEmpTripCheckOut ~ item:', item);
    setLoader(true);
    try {
      await requestLocationPermission();
      const apiUrl = `${APIS.sendEmployeeCheckOutTrip}`;
      const currentLocation = await getCurrentLocation();
      const {latitude, longitude} = currentLocation;
      const locationName = await getLocationName(latitude, longitude);
      const requestBodyForEmpCheckOut = {
        tripId: idTrip,
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
        '\nrequestBodyForEmpCheckOut',
        JSON.stringify(requestBodyForEmpCheckOut, null, 2),
        '\n',
      );
      const response = await axios.post(apiUrl, requestBodyForEmpCheckOut);
      console.log('\nresponse', JSON.stringify(response, null, 2), '\n');
      await getTripDetails(roasterIds);

      setTripIds(tripIds);
      setIdRoasterDays(response.data?.returnLst?.idRoasterDays);
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
              setSelectedItem(item);
            }}>
            <Text style={styles.checkOutText}>Break</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.checkOutButton}
            onPress={() => {
              // setShowOtpModal(true);
              // sendOtpForEmployeeCheckIn(item);
              setShowConformationCheckOutModal(true);
              setSelectedItem(item);
            }}>
            <Text style={styles.checkOutText}>Check Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
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
            <Sos width={horizontalScale(50)} height={verticalScale(50)} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            style={styles.bellButton}>
            <Bell width={horizontalScale(50)} height={verticalScale(50)} />
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
        title={'Are you sure you want to Break the employee Trip?'}
        onPressNo={() => {
          setShowConformationModal(false);
        }}
        onPressYes={item => {
          setShowConformationModal(false);
          sendBeakEmployee(selectedItem);
          console.log('selectedItem', selectedItem?.idRoasterDetails);
        }}
      />
      <ConformationModal
        showConfirmModal={showConformationCheckOutModal}
        title={'Are you sure you want to CheckOut the employee Trip?'}
        onPressNo={() => {
          setShowConformationCheckOutModal(false);
        }}
        onPressYes={item => {
          setShowConformationCheckOutModal(false);
          sendEmpTripCheckOut(selectedItem);
          console.log('selectedItem', selectedItem?.idRoasterDetails);
        }}
      />
      <CustomModal
        visible={showOtpModal}
        onClose={() => {
          setShowOtpModal(false);
        }}
        onPressSubmitButton={enteredOtp => {
          // validateOtpForEmployee(enteredOtp, selectedItem);
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

export default DroppedCheckInScreen;

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
  bellButton: {},
  subContainer: {
    flex: 1,
    backgroundColor: 'rgba(246, 246, 246, 1)',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  timeAndMinutes: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: pixelSizeVertical(20),
    marginLeft: pixelSizeHorizontal(30),
  },
  timeText: {
    width: horizontalScale(120),
    height: verticalScale(55),
    fontSize: fontPixel(30),
    color: 'black',
    fontFamily: FontFamily.medium,
    backgroundColor: 'rgba(231, 231, 231, 1)',
    textAlign: 'center',
    borderRadius: 8,
    textAlignVertical: 'center',
  },
  minutesText: {
    color: 'black',
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(14),
    paddingLeft: 8,
  },
  waitingText: {
    fontFamily: FontFamily.medium,
    fontSize: fontPixel(14),
    color: 'black',
    marginTop: 10,
  },
  profileImage: {
    width: SCREEN_HEIGHT * 0.06,
    height: SCREEN_HEIGHT * 0.06,
    borderRadius: (SCREEN_HEIGHT * 0.06) / 2,
    // resizeMode: 'contain',
  },
  container1: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 0.5,
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
