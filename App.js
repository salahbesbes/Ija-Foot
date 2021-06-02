import React from 'react';
import SignIn from './Screen/SignIn';
import SignUp from './Screen/SignUp';
import AppStateProvider from './stateProvider';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from './Screen/Profile';
import Home from './Screen/Home';
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => (
  <AppStateProvider>
    <App />
  </AppStateProvider>
);
