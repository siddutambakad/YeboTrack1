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

const MyUsage = () => {
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
      value: 9.9,
      frontColor: '#C5197D',
      spacing: 0,
      label: 'Jan01\nJan07',
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
      value: 3,
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
      value: 7,
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

    {
      value: 5,
      frontColor: '#FF2FA8',
      spacing: 0,
      label: 'Feb 01\nFeb 02',
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
      value: 0,
      frontColor: '#FF2FA8',
      spacing: 0,
    },
    {
      value: 6,
      frontColor: '#FF2FA8',
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
      value: 3,
      frontColor: '#FF2FA8',
      spacing: 0,
      label: 'Mar 01\n Mar 07',
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
      value: 5,
      frontColor: '#C5197D',
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
      value: 5,
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

    {
      value: 4,
      frontColor: '#C5197D',
      spacing: 0,
      label: 'Apr 01\n Apr 07',
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
      value: 4,
      frontColor: '#FF9FD7',
      spacing: 0,
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
      value: 5,
      frontColor: '#C5197D',
      spacing: 0,
      label: 'Jan 01\nJan 07',
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
      value: 0,
      frontColor: '#FF2FA8',
      spacing: 0,
    },
    {
      value: 5,
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
      <View style={{flex: 1}}>
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
              paddingHorizontal: pixelSizeHorizontal(5),
            }}
            customOptionStyles={{
              width: horizontalScale(140),
              backgroundColor: '#FFFFFF',
              position: 'absolute',
              top: pixelSizeVertical(33),
              borderBottomLeftRadius: responsiveBorderRadius(10),
              borderBottomRightRadius: responsiveBorderRadius(10),
              height: verticalScale(180),
              overflow: 'hidden',
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
        <View
          style={{
            padding: 20,
            alignItems: 'center',
            height: height * 0.5,
          }}>
          <BarChart
            data={barData}
            barWidth={width * 0.038}
            barStyle={[styles.barStyle, {height: height * 1}]}
            dashWidth={0}
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
            yAxisAtTop={50}
            // isAnimated
            capThickness={0}
          />
        </View>
      </View>
    </View>
  );
};

export default MyUsage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  weekDropdownContainer: {
    alignSelf: 'flex-end',
    paddingHorizontal: pixelSizeHorizontal(20),
    paddingVertical: pixelSizeVertical(25),
  },
  barGraph: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height * 0.4,
  },
  barStyle: {
    marginTop: pixelSizeVertical(3),
  },
});
