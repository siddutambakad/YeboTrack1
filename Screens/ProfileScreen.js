import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from './Context/AppContext';
import Back from '../assets/images/VectorBack.svg';
import Logout from '../assets/images/logout.svg';
import Bell from '../assets/images/bellIcon.svg';
import {
  fontPixel,
  horizontalScale,
  pixelSizeHorizontal,
  pixelSizeVertical,
  responsiveBorderRadius,
  verticalScale,
} from './Utils/Dimensions';
import FontFamily from './Styles/FontFamily';
import BottomTab from './Components/BottomTab';
import ConformationModal from './Components/ConformationModal';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './Components/Loader';
import axios from 'axios';
import {APIS} from './APIURLS/ApiUrls';

const ProfileScreen = ({navigation}) => {
  const {handleLogout, driverId} = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    // retrieveOtpResponseData();
    getDriversDetail(driverId);
  }, []);

  // const retrieveOtpResponseData = async () => {
  //   setLoader(true);
  //   try {
  //     const storedOtpResponseData = await AsyncStorage.getItem(
  //       'otpResponseData',
  //     );
  //     if (storedOtpResponseData !== null) {
  //       setUserData(JSON.parse(storedOtpResponseData?.idDriver));
  //     }
  //     console.log(
  //       'storedOtpResponseData',
  //       JSON.stringify(storedOtpResponseData?.idDriver, null, 2),
  //       '\n',
  //     );
  //   } catch (error) {
  //     console.error(
  //       'Error retrieving otpResponseData from AsyncStorage:',
  //       error,
  //     );
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  const getDriversDetail = async driverId => {
    setLoader(true)
    try {
      const apiUrl = `${APIS.getDriversDetails}/${driverId}`
      const responseData = await axios.get(apiUrl)
      console.log(
        '\nresponseData',
        JSON.stringify(responseData.data?.returnLst, null, 2),
        '\n',
      );
      setUserData(responseData.data?.returnLst)
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoader(false)
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'rgba(102, 39, 110, 1)'}}>
      <View style={styles.header}>
        <View>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.backbutton}
            onPress={() => {
              navigation.navigate('Driver');
            }}>
            <Back
              width={pixelSizeHorizontal(25)}
              height={pixelSizeVertical(25)}
            />
            <Text style={styles.backbuttonText}>My Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.subMainHeader}>
          <TouchableOpacity
            style={{paddingRight: 20}}
            onPress={() => {
              setShowModal(true);
            }}>
            <Logout
              width={pixelSizeHorizontal(30)}
              height={pixelSizeVertical(30)}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress={() => {}}>
            <Bell
              width={pixelSizeHorizontal(50)}
              height={pixelSizeVertical(50)}
              fill={'#C5197D'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.subContainer}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: pixelSizeHorizontal(20),
            paddingVertical: pixelSizeVertical(30),
            marginTop: pixelSizeVertical(20),
            flexGrow: 1,
          }}>
          <Text style={styles.firstName}>First name</Text>
          <TextInput
            editable={false}
            value={userData?.driverName}
            style={styles.firstNameInputField}
          />
          <Text style={styles.phoneNumber}>Phone Number</Text>
          <View style={styles.phoneNumberAndTextInput}>
            <Text style={styles.countryText}>+91</Text>
            <TextInput
              style={styles.phoneNumberInput}
              maxLength={10}
              keyboardType="number-pad"
              editable={false}
              value={userData?.driverContactNo}
            />
          </View>
          <Text style={styles.Licenseno}>License No.</Text>
          <TextInput
            editable={false}
            value={userData?.licenseNo}
            style={styles.licenseNoInputField}
          />
          <Text style={styles.Address}>Address</Text>
          <TextInput
            multiline={true}
            value={userData?.permanentAddress}
            style={styles.addressInputField}
            editable={false}
          />
          <ConformationModal
            onPressYes={() => {
              setLoader(true);
              setShowModal(false);
              handleLogout();
              let ck = setTimeout(() => {
                navigation.navigate('LoginPage');
                clearTimeout(ck);
              }, 800);
            }}
            onPressNo={() => {
              setShowModal(false);
            }}
            title={'Are you sure you Want to Logout?'}
            showConfirmModal={showModal}
          />
        </ScrollView>
        <BottomTab activeTab="Profile" />
      </View>
      {loader && <Loader />}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
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
    paddingLeft: pixelSizeHorizontal(20),
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
    borderTopLeftRadius: responsiveBorderRadius(40),
    borderTopRightRadius: responsiveBorderRadius(40),
    paddingTop: pixelSizeVertical(8),
  },
  firstName: {
    fontSize: fontPixel(16),
    fontFamily: FontFamily.regular,
    color: 'rgba(102, 39, 110, 1)',
    marginVertical: pixelSizeVertical(5),
  },
  firstNameInputField: {
    width: horizontalScale(375),
    backgroundColor: '#FFFFFF',
    height: verticalScale(60),
    elevation: 8,
    borderRadius: responsiveBorderRadius(8),
    color: '#65276F',
    paddingHorizontal: pixelSizeHorizontal(10),
    fontSize: fontPixel(16),
  },
  phoneNumber: {
    fontSize: fontPixel(16),
    fontFamily: FontFamily.regular,
    color: 'rgba(102, 39, 110, 1)',
    marginVertical: pixelSizeVertical(5),
  },
  Licenseno: {
    fontSize: fontPixel(16),
    fontFamily: FontFamily.regular,
    color: 'rgba(102, 39, 110, 1)',
    marginVertical: pixelSizeVertical(5),
  },
  licenseNoInputField: {
    width: horizontalScale(375),
    backgroundColor: '#FFFFFF',
    height: verticalScale(60),
    elevation: 8,
    borderRadius: responsiveBorderRadius(8),
    color: '#65276F',
    paddingHorizontal: pixelSizeHorizontal(10),
    fontSize: fontPixel(16),
  },
  Address: {
    fontSize: fontPixel(16),
    fontFamily: FontFamily.regular,
    color: 'rgba(102, 39, 110, 1)',
    marginVertical: pixelSizeVertical(5),
  },
  addressInputField: {
    width: horizontalScale(375),
    backgroundColor: '#FFFFFF',
    minHeight: verticalScale(120),
    elevation: 8,
    borderRadius: responsiveBorderRadius(8),
    textAlign: 'justify',
    textAlignVertical: 'top',
    paddingHorizontal: pixelSizeHorizontal(10),
    color: '#65276F',
    fontSize: fontPixel(16),
  },
  phoneNumberAndTextInput: {
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 8,
  },
  phoneNumberInput: {
    width: horizontalScale(305),
    height: verticalScale(60),
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    paddingLeft: 10,
    color: '#65276F',
    fontSize: fontPixel(16),
    elevation: 8,
    zIndex: -1,
  },
  countryText: {
    width: horizontalScale(70),
    backgroundColor: '#EDEDED',
    height: verticalScale(60),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'black',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    fontSize: fontPixel(16),
    elevation: 8,
    zIndex: 0,
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginHorizontal: 20,
    fontFamily: FontFamily.regular,
  },
  saveButton: {
    width: horizontalScale(180),
    height: verticalScale(55),
    backgroundColor: 'rgba(197, 25, 125, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: pixelSizeVertical(25),
    marginTop: pixelSizeVertical(40),
    borderRadius: 8,
  },
  saveText: {
    color: 'white',
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(16),
  },
});
