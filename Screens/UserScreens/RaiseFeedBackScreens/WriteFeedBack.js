import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import DropDown from '../../Components/DropDown';
import {
  fontPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  responsiveBorderRadius,
} from '../../Utils/Dimensions';
import FontFamily from '../../Styles/FontFamily';
import {AirbnbRating, Rating} from 'react-native-ratings';
import {AppContext} from '../../Context/AppContext';
import {APIS} from '../../APIURLS/ApiUrls';
import axios from 'axios';
import Loader from '../../Components/Loader';

const {width, height} = Dimensions.get('window');

const WriteFeedBack = ({route}) => {
  const {idRoasterDetails, driverRating} = route.params;
  const {loader, setLoader} = useContext(AppContext);
  const [comments, setComments] = useState('');
  const [rating, setRating] = useState(0);
  const [showError, setShowError] = useState({isTrue: false, errorMessage: ''});
  // const data = [
  //   {name: '1'},
  //   {name: '2'},
  //   {name: '3'},
  //   {name: '4'},
  //   {name: '5'},
  //   {name: '6'},
  //   {name: '7'},
  // ];

  // const [isClicked, setIsclicked] = useState(false);
  // const [selectedFeedBack, setSelectedFeedBack] = useState(null);

  // useEffect(() => {
  //   sendFeedBack();
  // }, []);

  const sendFeedBack = async (IdRoasterDetails, DriverRating, Comments) => {
    if (!comments) {
      setShowError({
        isTrue: true,
        errorMessage: 'Please enter your feedback',
      });
    } else {
      setLoader(true);
    }
    try {
      const apiUrl = `${APIS.giveFeedBackToDriver}/${IdRoasterDetails}/${DriverRating}/${Comments}`;
      console.log('🚀 ~ sendFeedBack ~ apiUrl:', apiUrl);
      const response = await axios.put(apiUrl);
      console.log('response', response);
      if (response?.status === 200) {
        setShowError({
          isTrue: false,
          errorMessage: '',
        });
      }
    } catch (error) {
      console.log('error', error?.message);
      setShowError({
        isTrue: true,
        errorMessage: 'Please enter your feedback',
      });
    } finally {
      setLoader(false);
    }
  };
  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.issueAndDropdown}>
        <Text style={styles.issueCategoryText}>Issue Category</Text>
        <DropDown
          options={data}
          handleClick={item => {
            setIsclicked(false);
            setSelectedFeedBack(item);
          }}
          initialText={'None'}
          isClicked={isClicked}
          setIsClicked={() => {
            setIsclicked(!isClicked);
          }}
          style={styles.dropdownHeader}
          customOptionStyles={styles.dropdown}
        />
      </View> */}
      <View style={styles.subContainer}>
        <Text style={styles.howDoWeText}>How did we do?</Text>
        <Rating
          type="custom"
          tintColor="#F6F6F6"
          ratingBackgroundColor={'lightgray'}
          ratingColor="#66276E"
          ratingCount={5}
          imageSize={50}
          fractions={1}
          jumpValue={0.5}
          style={styles.ratings}
          onFinishRating={e => {
            console.log('rating=====>', e);
            setRating(e);
          }}
          onSwipeRating={e => {
            console.log('rating----->>', e);
            setRating(e);
          }}
        />
        <Text style={styles.feedBackText}>Do you want to share about it?</Text>
        <TextInput
          style={styles.feedBackContainer}
          multiline={true}
          keyboardType="ascii-capable"
          value={comments}
          onChangeText={e => {
            setComments(e);
          }}
        />
        {showError.errorMessage && (
          <Text
            style={{
              color: 'red',
              fontSize: fontPixel(14),
              fontFamily: FontFamily.regular,
            }}>
            {showError.errorMessage}
          </Text>
        )}
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => {
            sendFeedBack(idRoasterDetails, rating, comments);
            setComments('');
          }}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
      {loader && <Loader />}
    </ScrollView>
  );
};

export default WriteFeedBack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropdownHeader: {
    width: width * 0.5,
    backgroundColor: '#F6F6F6',
    height: height * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: pixelSizeHorizontal(10),
    borderRadius: responsiveBorderRadius(10),
    ...Platform.select({
      ios: {
        shadowColor: 'lightgray',
        shadowOffset: {width: 4, height: 5},
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  dropdown: {
    width: width * 0.5,
    height: height * 0.3,
    position: 'absolute',
    top: pixelSizeVertical(48),
    borderRadius: responsiveBorderRadius(10),
    ...Platform.select({
      ios: {
        shadowColor: 'lightgray',
        shadowOffset: {width: 4, height: 5},
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 10,
      },
    }),
    backgroundColor: '#FFFF',
    zIndex: 2,
  },
  issueAndDropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: pixelSizeHorizontal(25),
    paddingVertical: pixelSizeVertical(25),
    alignItems: 'center',
  },
  issueCategoryText: {
    color: 'black',
    fontSize: fontPixel(16),
    fontFamily: FontFamily.semiBold,
  },
  ratings: {
    alignSelf: 'flex-start',
    paddingVertical: pixelSizeVertical(16),
  },
  howDoWeText: {
    color: 'black',
    fontSize: fontPixel(16),
    fontFamily: FontFamily.regular,
  },
  subContainer: {
    paddingHorizontal: pixelSizeHorizontal(20),
    paddingVertical: pixelSizeVertical(20),
  },
  feedBackText: {
    color: 'black',
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(16),
    paddingVertical: pixelSizeVertical(10),
  },
  feedBackContainer: {
    backgroundColor: '#E5E5E5',
    width: width * 0.9,
    height: height * 0.3,
    borderRadius: responsiveBorderRadius(10),
    textAlign: 'justify',
    textAlignVertical: 'top',
    paddingHorizontal: pixelSizeHorizontal(16),
    paddingVertical: pixelSizeVertical(10),
  },
  sendButton: {
    width: width * 0.45,
    height: height * 0.07,
    backgroundColor: '#C5197D',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveBorderRadius(10),
    marginVertical: pixelSizeVertical(20),
  },
  sendText: {
    color: '#FFFF',
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(15),
  },
});
