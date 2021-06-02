import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screen/HomeScreen';
import MyTeam from '../screen/MyTeam';
import FindMatch from '../screen/FindMatch';
import Match from '../screen/Match';

const MainStack = createStackNavigator();

const MainNavigator = () => {
  return (
    <MainStack.Navigator initialRouteName="Home" backBehavior="initialRoute">
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="MyTeam" component={MyTeam} />
      <MainStack.Screen name="LookingForMatch" component={FindMatch} />
      <MainStack.Screen name="Match" component={Match} />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
