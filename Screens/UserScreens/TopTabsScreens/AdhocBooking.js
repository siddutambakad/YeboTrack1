import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import DropDown from '../../Components/DropDown';
import {
  fontPixel,
  horizontalScale,
  pixelSizeHorizontal,
  pixelSizeVertical,
  responsiveBorderRadius,
  verticalScale,
} from '../../Utils/Dimensions';
import {BarChart} from 'react-native-gifted-charts';
import FontFamily from '../../Styles/FontFamily';

const AdhocBooking = () => {
  const {height, width} = Dimensions.get('window');
  const [isClicked, setIsClicked] = useState(false);
  const data = [
    {name: 'Monday'},
    {name: 'Tuesday'},
    {name: 'Wednesday'},
    {name: 'Thrusday'},
    {name: 'Friday'},
    {name: 'Saturday'},
    {name: 'Sunday'},
  ];
  const [selectedWeek, setSelectedWeek] = useState(null);
  const barData = [
    {
      value: 0,
      frontColor: '#C5197D',
      spacing: 0,
      label: 'Weak 01',
      // topLabelComponent: () => (
      //   <Text
      //     style={{
      //       color: 'black',
      //       fontSize: fontPixel(18),
      //       marginBottom: pixelSizeVertical(1),
      //     }}>
      //     1
      //   </Text>
      // ),
    },
    {
      value: 0,
      frontColor: '#FF2FA8',
      spacing: 0,
      // topLabelComponent: () => (
      //   <Text
      //     style={{
      //       color: 'black',
      //       fontSize: fontPixel(18),
      //       marginBottom: pixelSizeVertical(1),
      //     }}>
      //     2
      //   </Text>
      // ),
    },
    {
      value: 0,
      frontColor: '#FF9FD7',
      // topLabelComponent: () => (
      //   <Text
      //     style={{
      //       color: 'black',
      //       fontSize: fontPixel(18),
      //       marginBottom: pixelSizeVertical(1),
      //     }}>
      //     2
      //   </Text>
      // ),
    },

    {
      value: 0,
      frontColor: '#FF2FA8',
      spacing: 0,
      label: 'Week 02',
      // topLabelComponent: () => (
      //   <Text
      //     style={{
      //       color: 'black',
      //       fontSize: fontPixel(18),
      //       marginBottom: pixelSizeVertical(1),
      //     }}>
      //     2
      //   </Text>
      // ),
    },
    {
      value: 0,
      frontColor: '#FF2FA8',
      spacing: 0,
    },
    {
      value: 0,
      frontColor: '#FF2FA8',
      // topLabelComponent: () => (
      //   <Text
      //     style={{
      //       color: 'black',
      //       fontSize: fontPixel(18),
      //       marginBottom: pixelSizeVertical(1),
      //     }}>
      //     2
      //   </Text>
      // ),
    },

    {
      value: 0,
      frontColor: '#FF2FA8',
      spacing: 0,
      label: 'Week 03',
      // topLabelComponent: () => (
      //   <Text
      //     style={{
      //       color: 'black',
      //       fontSize: fontPixel(18),
      //       marginBottom: pixelSizeVertical(1),
      //     }}>
      //     2
      //   </Text>
      // ),
    },
    {
      value: 0,
      frontColor: '#C5197D',
      spacing: 0,
      // topLabelComponent: () => (
      //   <Text
      //     style={{
      //       color: 'black',
      //       fontSize: fontPixel(18),
      //       marginBottom: pixelSizeVertical(1),
      //     }}>
      //     2
      //   </Text>
      // ),
    },
    {
      value: 0,
      frontColor: '#FF9FD7',
      // topLabelComponent: () => (
      //   <Text
      //     style={{
      //       color: 'black',
      //       fontSize: fontPixel(18),
      //       marginBottom: pixelSizeVertical(1),
      //     }}>
      //     2
      //   </Text>
      // ),
    },

    {
      value: 0,
      frontColor: '#C5197D',
      spacing: 0,
      label: 'Week 04',
      // topLabelComponent: () => (
      //   <Text
      //     style={{
      //       color: 'black',
      //       fontSize: fontPixel(18),
      //       marginBottom: pixelSizeVertical(1),
      //     }}>
      //     1
      //   </Text>
      // ),
    },
    {
      value: 0,
      frontColor: '#FF9FD7',
      spacing: 0,
      // topLabelComponent: () => (
      //   <Text
      //     style={{
      //       color: 'black',
      //       fontSize: fontPixel(18),
      //       marginBottom: pixelSizeVertical(1),
      //     }}>
      //     1
      //   </Text>
      // ),
    },
    {
      value: 0,
      frontColor: '#FF9FD7',
      spacing: 0,
      // topLabelComponent: () => (
      //   <Text
      //     style={{
      //       color: 'blue',
      //       fontSize: fontPixel(18),
      //       marginBottom: pixelSizeVertical(1),
      //     }}>
      //     2
      //   </Text>
      // ),
    },
    {value: 0, frontColor: '#C5197D', spacing: 0},
    {
      value: 9.9,
      frontColor: '#C5197D',
      spacing: 0,
      label: 'Week 05',
      topLabelComponent: () => (
        <Text
          style={{
            color: 'black',
            fontSize: fontPixel(14),
            // marginBottom: pixelSizeVertical(1),
          }}>
          1
        </Text>
      ),
    },
    {
      value: 9.9,
      frontColor: '#FF2FA8',
      spacing: 0,
      topLabelComponent: () => (
        <Text
          style={{
            color: 'black',
            fontSize: fontPixel(14),
            // marginBottom: pixelSizeVertical(1),
          }}>
          2
        </Text>
      ),
    },
    {
      value: 9.9,
      frontColor: '#FF9FD7',
      topLabelComponent: () => (
        <Text
          style={{
            color: 'black',
            fontSize: fontPixel(14),
            // marginBottom: pixelSizeVertical(1),
          }}>
          2
        </Text>
      ),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.weekDropdownContainer}>
        <DropDown
          options={data}
          initialText={'Week'}
          style={{
            width: horizontalScale(140),
            backgroundColor: '#FFFFFF',
            borderRadius: responsiveBorderRadius(25),
            height: verticalScale(50),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          customOptionStyles={{
            width: horizontalScale(140),
            backgroundColor: '#FFFFFF',
            position: 'absolute',
            top: pixelSizeVertical(33),
            borderBottomLeftRadius: responsiveBorderRadius(10),
            borderBottomRightRadius: responsiveBorderRadius(10),
            height: verticalScale(160),
            zIndex: 2,
          }}
          handleClick={item => {
            setSelectedWeek(item);
            setIsClicked(false);
          }}
          isClicked={isClicked}
          setIsClicked={() => {
            setIsClicked(!isClicked);
          }}
        />
      </View>
      <View style={{padding: 20, alignItems: 'center'}}>
        <BarChart
          data={barData}
          barWidth={width * 0.038}
          dashWidth={0}
          barStyle={[styles.barStyle, {height: height * 1}]}
          initialSpacing={10}
          spacing={22}
          yAxisThickness={0}
          xAxisThickness={0}
          yAxisTextStyle={{color: 'black'}}
          noOfSections={5}
          labelWidth={horizontalScale(100)}
          xAxisLabelTextStyle={{
            color: 'black',
            width: width * 0.25,
            fontSize: fontPixel(13),
            fontFamily: FontFamily.regular,
            height: height * 0.1,
            marginLeft: pixelSizeHorizontal(-30),
            paddingTop: pixelSizeVertical(10),
          }}
          xAxisTextNumberOfLines={2}
          // isAnimated
          capThickness={0}
        />
      </View>
    </View>
  );
};

export default AdhocBooking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  weekDropdownContainer: {
    alignSelf: 'flex-end',
    paddingHorizontal: pixelSizeHorizontal(20),
    paddingVertical: pixelSizeVertical(25),
  },
  barStyle: {
    marginTop: pixelSizeVertical(3),
  },
});
