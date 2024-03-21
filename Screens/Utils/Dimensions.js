import {Dimensions, PixelRatio, RN} from 'react-native';
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');


const widthBaseScale = SCREEN_WIDTH / 414;
const heightBaseScale = SCREEN_HEIGHT / 896;

function normalize(size, based = 'width') {
  const newSize =
    based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}
//for width  pixel
const horizontalScale = size => {
  return normalize(size, 'width');
};
//for height  pixel
const verticalScale = size => {
  return normalize(size, 'height');
};
//for font  pixel
const fontPixel = size => {
  return verticalScale(size);
};
//for Margin and Padding vertical pixel
const pixelSizeVertical = size => {
  return verticalScale(size);
};
//for Margin and Padding horizontal pixel
const pixelSizeHorizontal = size => {
  return horizontalScale(size);
};
function responsiveBorderRadius(size) {
  const scaleFactor = Math.min(horizontalScale, verticalScale);
  return normalize(size, scaleFactor);
}
export {
  horizontalScale,
  verticalScale,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
  responsiveBorderRadius,
};
