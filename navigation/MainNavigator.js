import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screen/HomeScreen';
import MyTeam from '../screen/MyTeam';
import Match from '../screen/Match';
import InviteFriend from '../components/InviteFriend';
import {ChatRoom} from '../components/chat/chatRoom';
import ProfileNavigation from '../screen/ProfileNavigation';
const MainStack = createStackNavigator();

const MainNavigator = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerTitle: false,
      }}
      initialRouteName="Home"
      backBehavior="initialRoute">
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="InviteFriend" component={InviteFriend} />
      <MainStack.Screen name="MyTeam" component={MyTeam} />
      <MainStack.Screen name="Match" component={Match} />
      <MainStack.Screen
        name="ProfileNavigation"
        component={ProfileNavigation}
      />
      <MainStack.Screen name="Chat" component={ChatRoom} />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
