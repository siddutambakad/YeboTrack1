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
import React, {useState} from 'react';
import DropDown from '../../Components/DropDown';
import {
  fontPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  responsiveBorderRadius,
} from '../../Utils/Dimensions';
import FontFamily from '../../Styles/FontFamily';
import {AirbnbRating, Rating} from 'react-native-ratings';

const {width, height} = Dimensions.get('window');
const WriteFeedBack = () => {
  const data = [
    {name: '1'},
    {name: '2'},
    {name: '3'},
    {name: '4'},
    {name: '5'},
    {name: '6'},
    {name: '7'},
  ];

  const [isClicked, setIsclicked] = useState(false);
  const [selectedFeedBack, setSelectedFeedBack] = useState(null);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.issueAndDropdown}>
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
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.howDoWeText}>How did we do?</Text>
        <Rating
          type="custom"
          tintColor="#F6F6F6"
          //   ratingImage={require('../../../assets/images/star.png')}
          ratingBackgroundColor={'lightgray'}
          ratingColor="#66276E"
          ratingCount={5}
          imageSize={50}
          fractions={1}
          jumpValue={0.5}
          startingValue={4.5}
          readonly
          style={styles.ratings}
        />
        <Text style={styles.feedBackText}>Do you want to share about it?</Text>
        <TextInput
          style={styles.feedBackContainer}
          multiline={true}
          keyboardType="ascii-capable"
        />
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
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
