import React, {useContext} from 'react';
import {Button, Image, StyleSheet, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import PlayersFeed from './PlayersFeed';
import TeamsFeed from './TeamsFeed';
import SignOutButton from '../components/SignOutButton';
import GoogleButton from '../components/GoogleButton';
import Avatar from '../components/Avatar';
import {AppStateContext} from '../stateProvider';
import FindMatchModal from '../components/FindMatchModal';
import CreateTeamModal from '../components/team/CreateTeamModal';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const FeedTab = createMaterialTopTabNavigator();

const HomeScreen = ({navigation}) => {
  const {authContext} = useContext(AppStateContext);
  const [state, dispatch] = authContext;
  const {user, userFriends} = state;
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
            navigation.navigate('Profile');
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
      </View>
      <FeedTab.Navigator>
        <FeedTab.Screen name="PlayersFeed" component={PlayersFeed} />
        <FeedTab.Screen name="TeamsFeed" component={TeamsFeed} />
      </FeedTab.Navigator>
      <View style={styles.bottomBar}>
        <FindMatchModal />
        <CreateTeamModal />
        <Pressable onPress={() => navigation.navigate('Match')}>
          <View>
            <Image source={require('../assets/icons/icons8-stadium-100.png')} />
          </View>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 65,
    elevation: 2,
    backgroundColor: '#ffffee',
    marginBottom: 15,
    borderRadius: 24,
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    //bottom: -15,
    //elevation: 5,
  },
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default HomeScreen;
