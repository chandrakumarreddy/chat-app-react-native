import {Dimensions, Platform} from 'react-native';

export default {
  os: Platform.OS,
  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,
};
