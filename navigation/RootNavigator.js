import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainNavigator from './MainNavigator';
import SignIn from '../screen/SignIn';
import SignUp from '../screen/SignUp';
import {AppStateContext} from '../stateProvider';
import auth from '@react-native-firebase/auth';
import db from '@react-native-firebase/firestore';
import {actionCreators} from '../stateManager/actions/auth-A';
import {teamActions} from '../stateManager/actions/team-A';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const {authContext, teamContext} = useContext(AppStateContext);
  const [authState, userDispatch] = authContext;
  const [teamState, teamDispatch] = teamContext;
  const {team} = teamState;
  const {user} = authState;
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async userChanged => {
      console.log('on auth changed is executed');
      try {
        if (userChanged) {
          //* fetch player

          let userDoc = await db()
            .collection('players')
            .doc(userChanged.uid)
            .get();
          let loggedUser = userDoc.data();
          userDispatch(
            actionCreators.loadUser({
              ...loggedUser,
              uid: userChanged.uid,
            }),
          );

          //* fetch friends

          let friendsDocs = await db()
            .collection('players')
            .doc(userChanged.uid)
            .collection('friends')
            .get();

          let playerFriends = friendsDocs.docs.map(playerDoc => {
            return {...playerDoc.data(), uid: playerDoc.id};
          });

          userDispatch(actionCreators.setFriends(playerFriends));

          console.log('team of the player is ', loggedUser.teamId);
          //* fetch team if exist
          if (loggedUser.teamId) {
            let teamDoc = await db()
              .collection('teams')
              .doc(loggedUser.teamId)
              .get();
            const playerTeam = teamDoc.data();

            //* get members

            let membersDocs = await db()
              .collection('teams')
              .doc(loggedUser.teamId)
              .collection('members')
              .get();

            const teamMembers = membersDocs.docs.map(memberDoc => {
              return {...memberDoc.data(), uid: memberDoc.id};
            });

            //* get ChatRoom

            let chatRoomsDocs = await db()
              .collection('teams')
              .doc(loggedUser.teamId)
              .collection('chatRoom')
              .get();
            const chatRooms = chatRoomsDocs.docs.map(charRoomDoc => {
              return {...charRoomDoc.data(), uid: charRoomDoc.id};
            });
            const chatRoom = chatRooms[0]; // always available
            console.log('we set new Team in the root screen');
            teamDispatch(
              teamActions.setTeam({
                ...playerTeam,
                admin: chatRoom.admin,
                uid: teamDoc.id,
                chatRoomId: chatRoom.uid,
                members: teamMembers,
              }),
            );
          }
        } else {
          /// no one connected userChanged === null
          userDispatch(actionCreators.logOut());
          userDispatch(teamActions.logOut());
        }
      } catch (error) {
        console.log('routNav ERROR :>> ', error.message);
        userDispatch(actionCreators.failure(error.message));
        return;
      }
    });
    return () => subscriber(); // unsubscribe on unmount
  }, [userDispatch, teamDispatch]);
  return (
    <NavigationContainer>
      {user ? (
        <MainNavigator />
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;
