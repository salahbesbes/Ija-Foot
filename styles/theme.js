import {Dimensions} from 'react-native';

import {DefaultTheme} from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  roundness: 6,
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
    paddingHorizontal: 10,
  },
  submitButton: {
    marginVertical: 30,
  },
  textButton: {
    fontWeight: 'bold',
    fontSize: 17,
    width: Dimensions.get('screen').width / 2,
  },
  bigTitle: {fontSize: 30, fontWeight: '700'},
  raisedInput: {
    width: '100%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  firstElement: {marginTop: 60},
  row: {flexDirection: 'row'},
  mv: {marginVertical: 10},
  widthScr: Dimensions.get('screen').width,
  heightScr: Dimensions.get('screen').height,
  colors: {
    ...DefaultTheme.colors,
    primary: '#22A826', // middle geen
    accent: '#286D11', // grass green
    darkGreen: '#003400', // dark grren
    alert: '#EC2914', // error
  },
};
