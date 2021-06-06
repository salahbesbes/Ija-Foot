import db from '@react-native-firebase/firestore';
import {useEffect} from 'react';

import {useCallback, useContext} from 'react';
import {AppStateContext} from '../stateProvider';
const timeStump = db.FieldValue.serverTimestamp();

export const useCreateTeam = params => {
  const [state, dispatch] = useContext(AppStateContext).authContext;
  const {user} = state;
  useEffect(() => {}, []);
  const createTeam = useCallback(
    async teamData => {
      try {
        let res = await db().collection('teams').add(teamData);

        res.onSnapshot(async snap => {
          try {
            // create Admin member
            await db().doc(`teams/${snap.id}/members/${user.uid}`).set(user);
            const chatroom = await db()
              .doc(`teams/${snap.id}`)
              .collection('chatRoom')
              .add({createdAt: timeStump});
            console.log('chatroom :>> ', chatroom);
          } catch (error) {
            console.log('create admin Team ERROR =>> ', error.message);
          }
        });
      } catch (error) {
        console.log('useCreateTeam ERROR =>> ', error.message);
      }
    },
    [user],
  );

  return {createTeam, ...state, dispatch};
};
