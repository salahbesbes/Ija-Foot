import {useContext, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import db from '@react-native-firebase/firestore';

import {useHomeListner} from '../hooks/useHomeListners';
import {AppStateContext} from '../stateProvider';
import {actionCreators} from '../stateManager/actions/auth-A';
import {teamActions} from '../stateManager/actions/team-A';
import {useGetMatchInfo} from '../hooks/useGetMatchInfo';
import {matchActions} from '../stateManager/actions/match-A';

export const useLoadingScreen = navigation => {
  const {authContext, teamContext, matchContext} = useContext(AppStateContext);
  const [authState, userDispatch] = authContext;
  const [teamState, teamDispatch] = teamContext;
  const [matchState, matchDispatch] = matchContext;

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

          console.log('team of the player is ', loggedUser.teamId, '\v');
          console.log('match of the player is ', loggedUser.matchId);
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
            teamDispatch(
              teamActions.setTeam({
                ...playerTeam,
                admins: chatRoom.admins,
                uid: teamDoc.id,
                chatRoomId: chatRoom.uid,
                members: teamMembers,
              }),
            );
            console.log('we set new Team in the local State');

            navigation.navigate('MainNavigator');
          }
        } else {
          /// no one connected userChanged === null
          navigation.navigate('SignIn');
          teamDispatch(teamActions.logOut());
          matchDispatch(matchActions.logOut());
          userDispatch(actionCreators.logOut());
        }
      } catch (error) {
        console.log('routNav ERROR :>> ', error.message);
        userDispatch(actionCreators.failure(error.message));
        return;
      }
    });
    return () => subscriber(); // unsubscribe on unmount
  }, [matchDispatch, teamDispatch, userDispatch, navigation]);
  return {...authState, ...teamState, ...matchState};
};
