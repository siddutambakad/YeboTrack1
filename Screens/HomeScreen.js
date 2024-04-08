import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import YeboFinal from '../assets/images/yeboFinalLogo.svg';
import Bell from '../assets/images/homeBellIcon.svg';
// import BannerImage from '../assets/images/banner.svg';
import Profile from '../assets/images/profilePic.svg';
import Stats from '../assets/images/statsPic.svg';
import CardProfile from '../assets/images/womenSafety.svg';
import {
  fontPixel,
  horizontalScale,
  pixelSizeHorizontal,
  pixelSizeVertical,
  responsiveBorderRadius,
  verticalScale,
} from './Utils/Dimensions';
import FontFamily from './Styles/FontFamily';

const HomeScreen = ({navigation}) => {
  const {height, width} = Dimensions.get('window');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState([1, 1, 1, 1, 1]);

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 8,
          width: width * 0.91,
          marginLeft: pixelSizeHorizontal(13),
          marginRight: pixelSizeHorizontal(13),
          marginBottom: pixelSizeVertical(10),
          elevation: 10,
          shadowColor: '#171717',
          shadowOffset: {width: 2, height: 4},
          shadowOpacity: 0.2,
          shadowRadius: 3,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: pixelSizeVertical(16),
            height: 'auto',
          }}>
          <CardProfile width={horizontalScale(50)} height={verticalScale(50)} />
          <View
            style={{
              width: '80%',
              height: 'auto',
              marginLeft: pixelSizeHorizontal(10),
            }}>
            <Text
              style={{
                color: '#66276E',
                marginTop: pixelSizeVertical(10),
                fontSize: fontPixel(20),
                fontFamily: FontFamily.semiBold,
              }}>
              Women Employee Saftey
            </Text>
            <Text
              style={{
                color: 'black',
                paddingBottom: pixelSizeVertical(10),
                fontSize: fontPixel(16),
                fontFamily: FontFamily.regular,
                textAlign: 'left',
              }}>
              Board the cab during dark hours only if there are male colleagues
              or a guard already present in the cab.
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{height: height, backgroundColor: 'white'}}>
      {/*header strats */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <YeboFinal width={horizontalScale(70)} height={verticalScale(70)} />
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            // navigation.navigate('Test');
          }}>
          <Bell width={horizontalScale(50)} height={verticalScale(50)} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{flex: 1}} contentContainerStyle={{height: height}}>
        {/* banner starts */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: Dimensions.get('window').width,
            alignItems: 'center',
            paddingHorizontal: pixelSizeHorizontal(20),
          }}>
          <View
            style={{
              width: Dimensions.get('window').width * 0.47,
            }}>
            <Text
              style={{
                fontSize: fontPixel(18),
                marginBottom: pixelSizeVertical(10),
                color: '#66276E',
                fontFamily: FontFamily.semiBold,
                textAlign: 'left',
              }}>
              Health warning for the cab users
            </Text>
            <Text
              style={{
                fontSize: fontPixel(16),
                color: 'black',
                fontFamily: FontFamily.regular,
                textAlign: 'left',
              }}>
              The health & wellbeing of our transport user is our utmost
              priority More
            </Text>
          </View>
          {/* <BannerImage /> */}
          <Image
            source={require('../assets/images/bannerImage.png')}
            style={{
              width: '45%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />
          {/* </View> */}
        </View>
        {/* my profile button starts */}
        <View
          style={{
            backgroundColor: '#F6F6F6',
            borderTopLeftRadius: responsiveBorderRadius(40),
            borderTopRightRadius: responsiveBorderRadius(40),
            height: height,
            marginTop: pixelSizeVertical(20),
          }}>
          <View style={{gap: 25, paddingVertical: 25}}>
            <TouchableOpacity
            onPress={() => {
              navigation.navigate('UserProfile', {screen: "Home "})
            }}
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                width: Dimensions.get('window').width * 0.5,
                height: Dimensions.get('window').height * 0.09,
                paddingHorizontal: pixelSizeHorizontal(15),
                alignItems: 'center',
                justifyContent: 'space-evenly',
                alignSelf: 'center',
                // marginTop: pixelSizeVertical(25),
                borderRadius: 8,
                elevation: 8,
                shadowColor: '#171717',
                shadowOffset: {width: -2, height: 4},
                shadowOpacity: 0.2,
                shadowRadius: 3,
              }}>
              <Profile width={horizontalScale(40)} height={verticalScale(40)} />
              <Text
                style={{
                  color: 'black',
                  fontSize: fontPixel(16),
                  fontFamily: FontFamily.regular,
                }}>
                My Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MyTripStats');
              }}
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                width: Dimensions.get('window').width * 0.5,
                height: Dimensions.get('window').height * 0.09,
                paddingHorizontal: pixelSizeHorizontal(15),
                alignItems: 'center',
                justifyContent: 'space-evenly',
                alignSelf: 'center',
                // marginTop: pixelSizeVertical(25),
                borderRadius: 8,
                elevation: 8,
                shadowColor: '#171717',
                shadowOffset: {width: 2, height: 4},
                shadowOpacity: 0.2,
                shadowRadius: 3,
              }}>
              <Stats width={horizontalScale(40)} height={verticalScale(40)} />
              <Text
                style={{
                  color: 'black',
                  fontSize: fontPixel(16),
                  fontFamily: FontFamily.regular,
                }}>
                My Stats
              </Text>
            </TouchableOpacity>
          </View>
          {/* carousel starts */}
          <View
            style={{
              backgroundColor: '#F6F6F6',
            }}>
            {/* card carousel */}
            <FlatList
              data={data}
              renderItem={renderItem}
              horizontal
              pagingEnabled
              onScroll={e => {
                const x = e.nativeEvent.contentOffset.x;
                setCurrentIndex((x / width).toFixed(0));
              }}
              contentContainerStyle={{
                padding: 8,
              }}
              contentInsetAdjustmentBehavior="automatic"
              snapToAlignment="center"
              automaticallyAdjustContentInsets={false}
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={1}
            />
            {/* </View> */}
            <View
              style={{
                flexDirection: 'row',
                width: width,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F6F6F6',
                padding: 2,
              }}>
              {data.map((item, index) => {
                return (
                  <View
                    style={{
                      width: currentIndex == index ? 10 : 6,
                      height: currentIndex == index ? 10 : 6,
                      borderRadius: currentIndex == index ? 5 : 3,
                      backgroundColor:
                        currentIndex == index ? 'gray' : 'lightgray',
                      marginLeft: 5,
                    }}
                  />
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
