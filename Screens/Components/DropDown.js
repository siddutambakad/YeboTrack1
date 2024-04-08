import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import VectorDown from '../../assets/images/VectorDown.svg';
import {
  fontPixel,
  horizontalScale,
  pixelSizeHorizontal,
  pixelSizeVertical,
  verticalScale,
} from '../Utils/Dimensions';
import FontFamily from '../Styles/FontFamily';

const DropDown = React.forwardRef((props, ref) => {
  const {
    options,
    handleClick,
    initialText,
    isClicked,
    setIsClicked,
    style,
    customOptionStyles,
  } = props;
  const [selectedItem, setSelectedItem] = useState(null);
  const handleOptionClick = item => {
    setSelectedItem(item);
    handleClick(item);
    setIsClicked(false);
  };
  return (
    <View ref={ref}>
      <TouchableOpacity
        style={style}
        activeOpacity={0.9}
        onPress={() => {
          setIsClicked(!isClicked);
        }}>
        <TouchableOpacity
          style={styles.dropdownSelector}
          onPress={() => {
            setIsClicked(!isClicked);
          }}
          activeOpacity={1}>
          <Text
            style={[styles.dropdownText, !selectedItem && styles.initialText]}>
            {selectedItem?.name || initialText}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.dropdownArrow}
          onPress={() => {
            setIsClicked(!isClicked);
          }}>
          <VectorDown
            width={horizontalScale(15)}
            height={verticalScale(10)}
            style={[isClicked && styles.reverseImage]}
          />
        </TouchableOpacity>
      </TouchableOpacity>
      {isClicked && (
        <ScrollView
          nestedScrollEnabled={true}
          scrollEnabled={true}
          style={[styles.optionsStyle, customOptionStyles]}>
          {options.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                handleOptionClick(item);
              }}
              style={[
                styles.inputField,
                selectedItem?.name === item.name && styles.selectedDropdown,
                initialText === item.name &&
                  !selectedItem?.name &&
                  styles.matchingDropdown,
              ]}>
              <Text
                key={index}
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  styles.dropdownOptionText,
                  // {color: selectedItem?.name === item.name ? '#fff' : '#000'},
                  selectedItem?.name === item.name && styles.selectedText,
                  initialText === item.name &&
                    !selectedItem?.name &&
                    styles.matchingText,
                ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
});

export default DropDown;

const styles = StyleSheet.create({
  selectedText: {
    color: '#FFF8F2',
  },
  matchingText: {
    color: '#FFF8F2',
  },
  matchingDropdown: {
    backgroundColor: '#873900',
  },
  selectedDropdown: {
    backgroundColor: '#66276E',
  },
  inputField: {
    paddingLeft: pixelSizeHorizontal(10),
    paddingVertical: pixelSizeVertical(5),
    overflow: 'hidden',
  },
  dropdownOptionText: {
    color: '#000',
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(14),
  },
  dropdownSelector: {
    justifyContent: 'center',
    paddingLeft: pixelSizeHorizontal(5),
  },
  optionsStyle: {
    backgroundColor: '#FFF8F2',
    maxHeight: horizontalScale(140),
    // zIndex: 5,
    overflow: 'hidden',
  },
  dropdownText: {
    color: '#454545',
    fontFamily: FontFamily.regular,
    fontSize: fontPixel(14),
  },
  dropdownArrow: {
    paddingHorizontal: pixelSizeHorizontal(10),
    paddingVertical: pixelSizeVertical(7),
  },
  reverseImage: {
    transform: [{rotate: '180deg'}],
  },
  initialText: {
    color: 'lightgray',
    paddingLeft: pixelSizeHorizontal(20),
    fontSize: fontPixel(15),
    fontFamily: FontFamily.regular
  },
});
