import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
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

  const renderItem = (item, index) => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 8,
          width: width - 50,
          height: 175,
          marginHorizontal: 14,
          elevation: 10,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 20,
            marginHorizontal: 20,
          }}>
          <CardProfile />
          <View style={{width: '80%', marginLeft: 10}}>
            <Text style={{color: 'black', marginTop: 10, fontSize: 18}}>
              Women Employee Saftey
            </Text>
            <Text style={{color: 'black', marginTop: 15, fontSize: 16}}>
              Board the cab during dark hours only if there are male colleagues
              or a guard already present in the cab
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
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
            navigation.navigate('Test');
          }}>
          <Bell width={horizontalScale(50)} height={verticalScale(50)} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{flex: 1, backgroundColor: 'white'}}>
        {/* banner starts */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            
            width: Dimensions.get('window').width,
            alignItems: 'center',
            paddingHorizontal: pixelSizeHorizontal(15),
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
          {/* <View style={{width: Dimensions.get('window').width * 0.47, height: verticalScale(200), borderWidth: 1}}> */}
          {/* <BannerImage /> */}
          <Image source={require('../assets/images/bannerImage.png')} style={{
            width: '45%',
            height: '100%',
            resizeMode: 'contain',
            borderColor: 'red',
            borderWidth: 2
          }} />
          {/* </View> */}
        </View>
        {/* my profile button starts */}
        <View
          style={{
            flex: 1,
            backgroundColor: '#F6F6F6',
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            marginTop: 20,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              backgroundColor: 'white',
              width: '35%',
              height: 50,
              paddingHorizontal: 15,
              alignItems: 'center',
              justifyContent: 'space-between',
              alignSelf: 'center',
              marginTop: 25,
              borderRadius: 8,
            }}>
            <Profile width={30} height={30} />
            <Text style={{color: 'black'}}>My Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              backgroundColor: 'white',
              width: '35%',
              height: 50,
              paddingHorizontal: 15,
              alignItems: 'center',
              justifyContent: 'space-between',
              alignSelf: 'center',
              marginTop: 25,
              borderRadius: 8,
            }}>
            <Stats width={30} height={30} />
            <Text style={{color: 'black'}}>My Stats</Text>
          </TouchableOpacity>
          {/* carousel starts */}
          <FlatList
            data={data}
            renderItem={renderItem}
            horizontal
            pagingEnabled
            onScroll={e => {
              const x = e.nativeEvent.contentOffset.x;
              setCurrentIndex((x / width).toFixed(0));
            }}
            style={{}}
            contentContainerStyle={{
              marginTop: 25,
            }}
            contentInsetAdjustmentBehavior="never"
            snapToAlignment="center"
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={1}
          />
          <View
            style={{
              flexDirection: 'row',
              width: width,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {data.map((item, index) => {
              return (
                <View
                  style={{
                    width: currentIndex == index ? 10 : 8,
                    height: currentIndex == index ? 10 : 8,
                    borderRadius: currentIndex == index ? 5 : 4,
                    backgroundColor:
                      currentIndex == index ? 'gray' : 'lightgray',
                    marginLeft: 5,
                  }}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
