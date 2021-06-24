import {useCallback, useEffect} from 'react';
import {teamActions} from '../../stateManager/actions/team-A';
import db from '@react-native-firebase/firestore';

export const useOnTeamMembers = ({team, teamDispatch}) => {
  const listenOnMembersCollection = useCallback(() => {
    let unsub = () => {};
    if (team.uid) {
      console.log('listenOnMembersCollection is listning');

      unsub = db()
        .doc(`teams/${team.uid}`)
        .collection('members')
        .onSnapshot(async snapshot => {
          // every time the collection memebers is  updated (add/remove) this callback should excute
          console.log('listenOnMembersCollection  callback is fired');

          const membersDb = snapshot.docs.map(doc => {
            return {...doc.data(), uid: doc.id};
          });
          console.log('membersDb', membersDb.length);
          console.log(membersDb.map(el => el.nickName));
          // we update the team members
          const updatedTeam = {
            ...team,
            members: membersDb,
          };
          teamDispatch(teamActions.setTeam(updatedTeam));
        });
    }
    return unsub;
  }, [teamDispatch]);

  //   useEffect(() => {
  //     const unsub = listenOnMembersCollection();
  //     return () => unsub();
  //   }, [listenOnMembersCollection]);

  return {listenOnMembersCollection, team};
};
