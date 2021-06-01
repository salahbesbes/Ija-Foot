import React, {useContext, useReducer} from 'react';
import {Text, SafeAreaView, Button, View} from 'react-native';
import {actionCreators} from './stateManager/actions/auth-A';
import SignIn from './Screen/SignIn';
import SignUp from './Screen/SignUp';
import GoogleButton from './components/GoogleButton';
import AppStateProvider, {AppStateContext} from './stateProvider';
import {authReducer, initialState} from './stateManager/reducers/auth-R';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => (
  <AppStateProvider>
    <App />
  </AppStateProvider>
);
