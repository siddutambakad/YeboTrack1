import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Back from '../../assets/images/VectorBack.svg';
import Sos from '../../assets/images/sos.svg';
import Bell from '../../assets/images/bell.svg';
import FontFamily from '../Styles/FontFamily';
import {horizontalScale} from '../Utils/Dimensions';
import CustomModal from '../Components/Modal';
import BottomTab from '../Components/BottomTab';

const DriveToOffice = ({navigation}) => {
  const [data, setData] = useState([
    {
      name: 'Employee Check-Out',
      employeeName: 'Jhone Doe',
      employeeCheckInTime: '10:13 am',
      image: require('../../assets/images/profile.png'),
    },
    {
      name: 'Guard Check-Out',
      employeeName: 'Jhone Doe',
      employeeCheckInTime: '10:40 am',
      image: require('../../assets/images/profile.png'),
    },
  ]);
  const [showOtpModal, setShowOtpModal] = useState(false);

  const handleCheckOut = index => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
    console.log(newData);
    // Hide the modal
    setShowOtpModal(false);
  };

  const formatTime = time => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const amOrPm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12; // Convert 0 to 12
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
  };
  const handleButtonClick = () => {
    const currentTime = new Date();
    const formattedTime = formatTime(currentTime);
    handleCheckOut();
    navigation.navigate('MyTripDetail', {
      driveOfficeOtp: true,
      reachTime: formattedTime,
    });
  };

  const renderItems = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.cardContainer} onPress={() => {}}>
        <Text style={styles.employeeText}>{item.name}</Text>
        <View style={styles.employeesText}>
          <Image
            source={item.image}
            style={styles.profileImage}
          />
          <View style={styles.employee}>
            <Text style={styles.employeeName}>{item.employeeName}</Text>
            <Text style={styles.employeeCheckIn}>{`Check-in-Time-${item.employeeCheckInTime}`}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.checkOutButton}
          onPress={() => {
            setShowOtpModal(true);
          }}>
          <Text style={styles.checkOutText}>Check out</Text>
        </TouchableOpacity>
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
            <Back width={25} height={25} />
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
        <FlatList
          data={data}
          renderItem={renderItems}
          style={{marginTop: 20}}
        />
        <CustomModal
          visible={showOtpModal}
          title={'Enter check-Out pin'}
          onClose={() => setShowOtpModal(false)}
          onPressSubmitButton={() => {
            handleButtonClick();
          }}
          onPressCancelButton={() => {
            setShowOtpModal(false);
          }}
        />
      </View>
      <BottomTab activeTab="MyTrips" />
    </View>
  );
};

export default DriveToOffice;

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
    fontSize: 18,
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
    width: '80%',
    backgroundColor: 'white',
    marginVertical: 20,
    alignSelf: 'center',
    borderRadius: 20,
    paddingLeft: 40,
    paddingRight: 20,
    // alignItems: 'center'
  },
  employeeText: {
    fontFamily: FontFamily.semiBold,
    fontSize: 16,
    color: 'black',
    marginVertical: 12,
  },
  profileImage: {
    width: 62,
    height: 62,
  },
  employeesText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  employee: {
    paddingLeft: 10,
  },
  employeeName: {
    fontFamily: FontFamily.semiBold,
    fontSize: 14,
    color: 'black',
  },
  employeeCheckIn: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: 'black',
  },
  checkOutButton: {
    width: horizontalScale(110),
    backgroundColor: 'rgba(197, 25, 125, 1)',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 8,
  },
  checkOutText: {
    color: 'white',
    fontFamily: FontFamily.regular,
    fontSize: 12,
  },
});
