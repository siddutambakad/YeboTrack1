import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    Image,
  } from 'react-native';
  import React from 'react';
  import Profile from '../assets/images/profilePic.svg';
  import Camera from '../assets/images/Camera.svg';
  import Car from '../assets/images/Car.svg';
  import History from '../assets/images/history.svg';
  import Bell from '../assets/images/bell.svg';
  
  const DriverHomeScreen = ({navigation}) => {
    return (
      // <ImageBackground
      //   style={styles.imageBackground}
      //   source={require('../assets/images/imageBack.png')}>
      //   <View style={{backgroundColor: '#66276e', flex: 1, opacity: 0.8}}>
      //     {/*header strats */}
      //     <View
      //       style={{
      //         alignSelf: 'flex-end',
      //         marginHorizontal: 20,
      //         alignItems: 'center',
      //         marginVertical: 20,
      //       }}>
      //       <TouchableOpacity
      //         activeOpacity={1}
      //         onPress={() => {}}
      //         style={{
      //           width: 60,
      //           height: 60,
      //           backgroundColor: '#FFFFFF',
      //           alignItems: 'center',
      //           justifyContent: 'center',
      //           borderRadius: 30,
      //         }}>
      //         <Bell width={25} height={25} fill={'#C5197D'} />
      //       </TouchableOpacity>
      //     </View>
      //     <View
      //       style={{
      //         backgroundColor: 'white',
      //         flex: 1,
      //         borderTopLeftRadius: 50,
      //         borderTopRightRadius: 50,
      //         marginTop: 70,
      //       }}
      //     />
      //   </View>
      // </ImageBackground>
      <View style={{flex: 1}}>
        <Image
          source={require('../assets/images/imageBack.png')}
          style={{
            backgroundColor: '#66276e',
            opacity: 0.8,
            width: '100%',
            height: '35%',
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(246, 246, 246, 1)',
            marginTop: -60,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
          }}>
          <View>
            <Image
              source={require('../assets/images/profile.png')}
              style={{
                width: '25%',
                height: '42%',
                alignSelf: 'center',
                position: 'absolute',
                top: -90,
                //   borderWidth: 1,
                //   borderColor: 'black',
                borderRadius: 50,
                resizeMode: 'contain',
              }}
            />
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                marginTop: 70,
                fontSize: 18,
                fontWeight: '700',
              }}>
              Jhon Doe
            </Text>
            <Text style={{color: 'black', textAlign: 'center', marginTop: 3}}>
              Driver ID - #1234
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <Camera width={15} height={15} />
              <Text
                style={{
                  color: 'black',
                  paddingLeft: 8,
                  textDecorationLine: 'underline',
                }}>
                Add Photo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                width: '50%',
                height: 70,
                paddingHorizontal: 35,
                alignItems: 'center',
                justifyContent: 'space-between',
                alignSelf: 'center',
                marginTop: 25,
                borderRadius: 8,
                elevation: 10,
              }}>
              <History width={35} height={35} />
              <Text style={{color: 'black', fontSize: 16}}>My History</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('MyTrip');
              }}
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                width: '50%',
                height: 70,
                paddingHorizontal: 35,
                alignItems: 'center',
                justifyContent: 'space-between',
                alignSelf: 'center',
                marginTop: 25,
                borderRadius: 8,
                elevation: 10,
              }}>
              <Car width={40} height={40} />
              <Text style={{color: 'black', fontSize: 16}}>My Trips</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                width: '50%',
                height: 70,
                paddingHorizontal: 35,
                alignItems: 'center',
                justifyContent: 'space-between',
                alignSelf: 'center',
                marginTop: 25,
                borderRadius: 8,
                elevation: 10,
              }}>
              <Profile width={35} height={35} />
              <Text style={{color: 'black', fontSize: 16}}>My Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/*header strats */}
        <View
          style={{
            alignSelf: 'flex-end',
            marginHorizontal: 20,
            alignItems: 'center',
            marginVertical: 20,
            position: 'absolute',
            right: 10,
            top: 10,
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            style={{
              width: 60,
              height: 60,
              backgroundColor: '#FFFFFF',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 30,
            }}>
            <Bell width={25} height={25} fill={'#C5197D'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  export default DriverHomeScreen;
  
  const styles = StyleSheet.create({
    imageBackground: {
      flex: 1,
    },
  });