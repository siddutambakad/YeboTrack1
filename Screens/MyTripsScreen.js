import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Back from '../assets/images/VectorBack.svg';
import Sos from '../assets/images/sos.svg';
import Bell from '../assets/images/bell.svg';
import MyTripNavigator from './Components/MyTripNavigator';

const MyTripsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* header starts */}
      <View style={styles.header}>
        <View>
          <TouchableOpacity
            style={styles.backbutton}
            onPress={() => {
              navigation.goBack();
            }}>
            <Back width={30} height={30} />
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
      {/* sub container starts */}
      <View style={styles.myTripNavi}>
        <MyTripNavigator />
      </View>
    </View>
  );
};

export default MyTripsScreen;

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
    marginVertical: 20,
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
  myTripNavi: {
    flex: 1,
    // marginTop: -50,
  },
});