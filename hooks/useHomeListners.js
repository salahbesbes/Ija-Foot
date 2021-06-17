import {useContext, useEffect} from 'react';
import db from '@react-native-firebase/firestore';
import {matchActions} from '../stateManager/actions/match-A';
import {teamActions} from '../stateManager/actions/team-A';
import {actionCreators} from '../stateManager/actions/auth-A';
import {AppStateContext} from '../stateProvider';

export const useHomeListner = () => {
  const {authContext, teamContext, matchContext} = useContext(AppStateContext);
  const [authState, userDispatch] = authContext;
  const [teamState, teamDispatch] = teamContext;
  const [matchState, matchDispatch] = matchContext;
  const {team} = teamState;
  const {user} = authState;
  const {match} = matchState;

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
        console.log('RoomMembers start listning from Home Screen');
      });
    return unsubChatRoomMembers;
  }, []);

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
            ...snapshot.data(),
            uid: snapshot.id,
            teamId: snapshot.data()?.teamId,
            chatRoomId: snapshot.data()?.chatRoomId,
          }),
        );
      });
    console.log('current User Profile start listning from Home Screen');

    return unsubProfile;
  }, []);

  //listning on members changes in homescreen
  useEffect(() => {
    const unsub = db()
      .doc(`teams/${team.uid}`)
      .collection('members')
      .onSnapshot(snapshot => {
        // console.log('snapshot.docs', snapshot.docs.length);
        // console.log('snapshot.docChanges()', snapshot.docChanges().length);
        // cteate new list of members --> update local state

        const membersDb = snapshot.docs.map(doc => {
          return {...doc.data(), uid: doc.id};
        });
        console.log('membersDb :>> ', membersDb);
        teamDispatch(
          teamActions.setTeam({
            ...team,
            members: membersDb,
          }),
        );
      });
    return unsub;
  }, []);
  return {user, match, team, userDispatch, teamDispatch, matchDispatch};
};
