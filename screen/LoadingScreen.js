import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';

import SignOutButton from '../components/SignOutButton';
import {useLoadingScreen} from '../hooks/useLoadingScreen';

export default function LoadingScreen({navigation}) {
  const {user, team, userFriends} = useLoadingScreen(navigation);

  let loadingScreen = useRef(0);
  const isInitialMount = useRef(true);

  useEffect(() => {
    loadingScreen.current += 1;
    console.log({loadingScreenRender: loadingScreen.current});
    if (isInitialMount.current) {
      isInitialMount.current = false;

      return;
    }
    return () => {
      console.log('loading Screen has updated');
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'lightred',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Button
        mode="contained"
        title="go to Profile"
        loading
        onPress={() => {
          navigation.navigate('MainNavigator');
        }}>
        Go to Home Screen
      </Button>
      <SignOutButton navigation={navigation} />
    </View>
  );
}
