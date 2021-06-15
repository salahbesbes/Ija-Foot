import {useEffect} from 'react';
import {useChatRoom} from './useChatRoom';
import db from '@react-native-firebase/firestore';
import {matchActions} from '../stateManager/actions/match-A';
import {teamActions} from '../stateManager/actions/team-A';
import {actionCreators} from '../stateManager/actions/auth-A';

export const useHomeListner = () => {
  const {
    listenOnMembersCollection,
    match,
    team,
    user,
    userDispatch,
    teamDispatch,
    matchDispatch,
  } = useChatRoom();

  useEffect(() => {
    const unsubChatRoomMembers = db()
      .doc(`matchs/${match.uid}`)
      .collection('members')
      .onSnapshot(snapshot => {
        const newMembers = snapshot.docs.map(member => {
          return {uid: member.id, ...member.data()};
        });
        matchDispatch(
          matchActions.setMatch({
            ...match,
            members: newMembers,
          }),
        );
        console.log('new member added to the match');
      });
    return unsubChatRoomMembers;
  }, [matchDispatch]);

  useEffect(() => {
    const unsubProfile = db()
      .doc(`players/${user.uid}`)
      .onSnapshot(snapshot => {
        // console.log('snapshot :>> ', snapshot);
        console.log('snap =>', snapshot.data());
        teamDispatch(
          teamActions.setTeam({
            ...team,
            uid: snapshot.data()?.teamId,
            chatRoomId: snapshot.data()?.chatRoomId,
          }),
        );
        userDispatch(
          actionCreators.loadUser({
            ...user,
            teamId: snapshot.data()?.teamId,
            chatRoomId: snapshot.data()?.chatRoomId,
          }),
        );
      });
    console.log('unsubProfile');
    return unsubProfile;
  }, [teamDispatch]);

  //listning on members changes in homescreen
  useEffect(() => {
    const unsub = listenOnMembersCollection();
    return () => unsub();
  }, [listenOnMembersCollection]);

  return {user, match, team, userDispatch, teamDispatch, matchDispatch};
};
