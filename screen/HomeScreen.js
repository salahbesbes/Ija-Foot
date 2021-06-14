import React, {useContext} from 'react';
import {Button, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import PlayersFeed from './PlayersFeed';
import TeamsFeed from './TeamsFeed';
import SignOutButton from '../components/SignOutButton';
import GoogleButton from '../components/GoogleButton';
import Avatar from '../components/Avatar';
import {AppStateContext} from '../stateProvider';
import FindMatchModal from '../components/FindMatchModal';
import CreateTeamModal from '../components/team/CreateTeamModal';
import {actionCreators} from '../stateManager/actions/auth-A';
import {teamActions} from '../stateManager/actions/team-A';

const FeedTab = createMaterialTopTabNavigator();

const HomeScreen = ({navigation}) => {
  const {authContext, teamContext} = useContext(AppStateContext);
  const [authState, userDispatch] = authContext;
  const [teamState, teamDispatch] = teamContext;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Avatar navigation={navigation} />,
    });
  }, [navigation]);
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          height: 60,
          backgroundColor: 'magenta',
        }}>
        <SignOutButton />
        <Button
          title="go to Profile"
          onPress={() => {
            navigation.navigate('ProfileNavigation', {nbColumn: 2});
          }}
        />
        <GoogleButton />
      </View>
      <View
        style={{
          flexDirection: 'row',
          height: 60,
          backgroundColor: 'magenta',
        }}>
        <Button
          title="InviteFriend"
          onPress={() => {
            navigation.navigate('InviteFriend');
          }}
        />
        <Button
          title="reset State"
          onPress={() => {
            userDispatch(actionCreators.reset());
            teamDispatch(teamActions.logOut());
          }}
        />
      </View>
      <FeedTab.Navigator>
        <FeedTab.Screen name="PlayersFeed" component={PlayersFeed} />
        <FeedTab.Screen name="TeamsFeed" component={TeamsFeed} />
      </FeedTab.Navigator>
      <View
        style={{
          flexDirection: 'row',
          height: 65,
          padding: 5,
        }}>
        <FindMatchModal />
        <CreateTeamModal />
        <Button
          title="chat Room"
          onPress={() => navigation.navigate('MyTeam')}
        />
      </View>
    </>
  );
};

export default HomeScreen;
