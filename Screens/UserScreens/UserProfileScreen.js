import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {APIS} from '../APIURLS/ApiUrls';
import axios from 'axios';
import {AppContext} from '../Context/AppContext';
import {
  fontPixel,
  horizontalScale,
  pixelSizeHorizontal,
  pixelSizeVertical,
  responsiveBorderRadius,
  verticalScale,
} from '../Utils/Dimensions';
import ConformationModal from '../Components/ConformationModal';
import FontFamily from '../Styles/FontFamily';
import Loader from '../Components/Loader';
import Back from '../../assets/images/VectorBack.svg';
import Logout from '../../assets/images/logout.svg';
import Bell from '../../assets/images/bellIcon.svg';

const UserProfileScreen = ({navigation}) => {
  const {handleLogout, userId, loader, setLoader} = useContext(AppContext);
  // console.log('🚀 ~ UserProfileScreen ~ userId:', userId);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({});
  // console.log('🚀 ~ UserProfileScreen ~ userData:', userData);

  useEffect(() => {
    getUserDetails(userId);
  }, [userId]);

  const getUserDetails = async userId => {
    setLoader(true);
    try {
      const apiUrl = `${APIS.getUserDetails}/${userId}`;
      const responseData = await axios.get(apiUrl);
      // console.log(
      //   '\nresponseData',
      //   JSON.stringify(responseData?.data, null, 2),
      //   '\n',
      // );
      setUserData(responseData?.data);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoader(false);
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'rgba(102, 39, 110, 1)'}}>
        <View style={styles.header}>
          <View>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.backbutton}
              onPress={() => {
                navigation.navigate('MainStack');
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
              value={userData?.userFullName}
              style={styles.firstNameInputField}
            />
            <Text style={styles.Licenseno}>Email</Text>
            <TextInput
              editable={false}
              value={userData?.emailId}
              style={styles.licenseNoInputField}
            />
            <Text style={styles.phoneNumber}>Phone Number</Text>
            <View style={styles.phoneNumberAndTextInput}>
              <View style={styles.countriesText}>
                <Text style={styles.countryText}>+91</Text>
              </View>
              <TextInput
                style={styles.phoneNumberInput}
                maxLength={10}
                keyboardType="number-pad"
                editable={false}
                value={userData?.mobileNo}
              />
            </View>
            <Text style={styles.Address}>Address</Text>
            <TextInput
              multiline={true}
              value={userData?.address1}
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
          {/* <BottomTab activeTab="Profile" /> */}
        </View>
      </View>
      {loader && <Loader />}
    </SafeAreaView>
  );
};

export default UserProfileScreen;

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
    shadowColor: 'lightgray',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    overflow: 'visible',
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
    shadowColor: 'lightgray',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    overflow: 'visible',
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
    shadowColor: 'lightgray',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    overflow: 'visible',
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
    shadowColor: 'lightgray',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    overflow: 'visible',
  },
  countryText: {
    color: 'black',
    fontSize: fontPixel(16),
  },
  countriesText: {
    width: horizontalScale(70),
    backgroundColor: '#EDEDED',
    height: verticalScale(60),
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    elevation: 8,
    zIndex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'lightgray',
    shadowOffset: {width: 0, height: -5},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    overflow: 'visible',
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
