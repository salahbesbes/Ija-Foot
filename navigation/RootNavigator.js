import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainNavigator from './MainNavigator';
import SignIn from '../screen/SignIn';
import SignUp from '../screen/SignUp';
import { AppStateContext } from '../stateProvider';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const {authContext} = React.useContext(AppStateContext);
  const [state, dispatch] = authContext; // distructuring
  const {user} = state;
  return (
    <NavigationContainer>
        {
          user? (
            <MainNavigator />
          ):(
            <Stack.Navigator>
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Navigator>
          )
        }
    </NavigationContainer>
  );
};

export default RootNavigator;