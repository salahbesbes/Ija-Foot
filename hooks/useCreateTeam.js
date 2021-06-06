import db from '@react-native-firebase/firestore';
import {useEffect} from 'react';

import {useCallback, useContext} from 'react';
import {teamActions} from '../stateManager/actions/team-A';
import {AppStateContext} from '../stateProvider';
const timeStump = db.FieldValue.serverTimestamp();

export const useCreateTeam = params => {
  const {authContext, teamContext} = useContext(AppStateContext);
  const [authState, userDispatch] = authContext;
  const [teamState, teamDispatch] = teamContext;
  const {team} = teamState;
  const {user} = authState;

  useEffect(() => {}, []);
  const createTeam = useCallback(
    async teamData => {
      try {
        // update local state merge 2 objects
        const newTeam = {...team, ...teamData};
        console.log(newTeam);
        let res = await db()
          .collection('teams')
          .add({...teamData, createdAt: timeStump});

        res.onSnapshot(async snap => {
          try {
            const admin = {
              fullName: user.fullName,
              nickName: user.nickName,
              email: user.email,
            };
            // create Admin member
            const chatroom = await db()
              .doc(`teams/${snap.id}/chatRoom/${user.uid}`)
              .set({
                createdAt: timeStump,
                admin,
              });
            // we dont save all user info
            const {availabilityData, isAvailable, uid, ...restProps} = user;
            await db()
              .doc(`teams/${snap.id}`)
              .collection('members')
              .add(restProps);
            newTeam.admin = {...admin, uid: user.uid};
            newTeam.chatRoomId = chatroom.id;
            newTeam.uid = snap.id;
            newTeam.members = [{...restProps, uid: user.uid}];
            teamDispatch(teamActions.createTeam(newTeam));
          } catch (error) {
            console.log(error);
            console.log('create collections Team ERROR =>> ', error.message);
          }
        });
      } catch (error) {
        console.log('useCreateTeam ERROR =>> ', error.message);
      }
    },
    [team, teamDispatch, user],
  );

  return {createTeam, userDispatch, teamDispatch, ...authState, ...teamState};
};
