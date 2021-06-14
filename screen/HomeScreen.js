import React, {useContext, useEffect} from 'react';
import {Button, Image, StyleSheet, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import db from '@react-native-firebase/firestore';

import PlayersFeed from './PlayersFeed';
import TeamsFeed from './TeamsFeed';
import SignOutButton from '../components/SignOutButton';
import GoogleButton from '../components/GoogleButton';
import Avatar from '../components/Avatar';
import {AppStateContext} from '../stateProvider';
import FindMatchModal from '../components/FindMatchModal';
import CreateTeamModal from '../components/team/CreateTeamModal';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

import {actionCreators} from '../stateManager/actions/auth-A';
import {teamActions} from '../stateManager/actions/team-A';

const FeedTab = createMaterialTopTabNavigator();

const HomeScreen = ({navigation}) => {
  const {authContext, teamContext} = useContext(AppStateContext);
  const [authState, userDispatch] = authContext;
  const [teamState, teamDispatch] = teamContext;
  const {user} = authState;
  const {team} = teamState;
  useEffect(() => {
    const unsubProfile = db()
      .doc(`players/${user.uid}`)
      .onSnapshot(snapchot => {
        console.log('snapchot :>> ', snapchot);
        teamDispatch(
          teamActions.setTeam({
            ...team,
            uid: snapchot.data()?.teamId,
            chatRoomId: snapchot.data()?.chatRoomId,
          }),
        );
      });
    return unsubProfile;
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Avatar navigation={navigation} />,
    });
  }, [navigation]);
  return (
    <>
      {/* <View
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
        <Button
          title="reset State"
          onPress={() => {
            userDispatch(actionCreators.reset());
            teamDispatch(teamActions.logOut());
          }}
        />
      </View> */}

      <FeedTab.Navigator>
        <FeedTab.Screen name="PlayersFeed" component={PlayersFeed} />
        <FeedTab.Screen name="TeamsFeed" component={TeamsFeed} />
      </FeedTab.Navigator>
      <View style={styles.bottomBar}>
        <FindMatchModal />
        <CreateTeamModal navigation={navigation} />
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Match')}>
          <View>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={require('../assets/icons/icons8-stadium-100.png')}
            />
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
    elevation: 5,
    backgroundColor: '#22A826',
    marginBottom: 15,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 25,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 3.5,
    //bottom: -15,
    //elevation: 5,
  },
  button: {
    height: 60,
    width: 60,
    borderRadius: 20,
    backgroundColor: '#23A727',
    elevation: 5,
  },
  image: {width: 60, height: 60},

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
