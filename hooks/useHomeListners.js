import {useContext, useEffect} from 'react';
import db from '@react-native-firebase/firestore';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
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
  const {user, userFriends} = authState;
  const {match} = matchState;

  //listning on match members changes in homescreen
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
  //listning on profile changes in homescreen
  useEffect(() => {
    try {
      const unsubProfile = db()
        .doc(`players/${user.uid}`)
        .onSnapshot(snapshot => {
          const newProfile = snapshot.data();

          //* update the profile inside the friends list
          console.log('user Friends', userFriends.length);
          userFriends.forEach(async friend => {
            try {
              console.log(typeof FirebaseFirestoreTypes.DocumentReference);

              const test = db().doc(
                `players/${friend.uid}/friends/${user.uid}`,
              );
              console.log('type', typeof test);
            } catch (error) {
              console.log(error.message);
            }
            await db()
              .doc(`players/${friend.uid}/friends/${user.uid}`)
              .update(newProfile);
          });
          console.log(
            `we updated your profile in the doc of ${userFriends.length} of your friend`,
          );
          /*
        // * update user profile in the team
            //* if the player has a team
            if (team.uid) {
              const {availabilityData, isAvailable, uid, ...restProps} = user;
              await db()
                .doc(`teams/${team.uid}/members/${user.uid}`)
                .set(restProps);
              console.log('you updated your doc in the members collection ');
            }
        */
          // console.log('snapshot :>> ', snapshot);
          console.log('snap =>', snapshot.data());
          teamDispatch(
            teamActions.setTeam({
              ...team,
              uid: newProfile?.teamId,
              chatRoomId: newProfile?.chatRoomId,
            }),
          );
          userDispatch(
            actionCreators.loadUser({
              ...newProfile,
              uid: snapshot.id,
              teamId: newProfile?.teamId,
              chatRoomId: newProfile?.chatRoomId,
            }),
          );
        });
      console.log('current User Profile start listning from Home Screen');

      return unsubProfile;
    } catch (error) {
      console.log('profile changes', error.message);
    }
  }, []);

  //listning on team members changes in homescreen
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
