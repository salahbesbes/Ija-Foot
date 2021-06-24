import React, {useContext, useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainNavigator from './MainNavigator';
import SignIn from '../screen/SignIn';
import SignUp from '../screen/SignUp';

import LoadingScreen from '../screen/LoadingScreen';

const Stack = createStackNavigator();

const RootNavigator = () => {
  let homeSRender = useRef(0);
  const isInitialMount = useRef(true);
  useEffect(() => {
    homeSRender.current += 1;
    console.log({RootNavigatorRender: homeSRender.current});
    if (isInitialMount.current) {
      isInitialMount.current = false;

      return;
    }

    return console.log('root has update');
  }, []);
  // const {getMatch} = useGetMatchInfo();

  // useGetMatchInfo(user);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitle: false,
        }}>
        <>
          <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
          <Stack.Screen
            options={{headerShown: false}}
            name="MainNavigator"
            component={MainNavigator}
          />
        </>

        <>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
