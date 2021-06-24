import {useCallback, useEffect} from 'react';
import {teamActions} from '../../stateManager/actions/team-A';
import db from '@react-native-firebase/firestore';

export const useOnChatRoom = () => {
  const ListenOnChatRoomDoc = useCallback(({team, teamDispatch}) => {
    let unsub = () => {};
    // only if teamid exist
    if (team.uid) {
      console.log('ListenOnChatRoomDoc is listning');
      unsub = db()
        .doc(`teams/${team.uid}/chatRoom/${team.chatRoomId}`)
        .onSnapshot(snapshot => {
          // every time the admin changes the details of a team this callback should execute and updates the view
          console.log('ListenOnChatRoomDoc callback is fired');

          console.log('chatRoom', snapshot.data().admins);
          console.log('team :>> ', team);
          teamDispatch(
            teamActions.setTeam({
              ...team,
              admins: [...snapshot.data().admins],
            }),
          );
        });
    }
    return unsub;
  }, []);
  //   useEffect(() => {
  //     const unsub = ListenOnChatRoomDoc();
  //     return () => unsub();
  //   }, [ListenOnChatRoomDoc]);
  return {ListenOnChatRoomDoc};
};
