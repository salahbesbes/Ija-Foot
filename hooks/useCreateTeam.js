import db from '@react-native-firebase/firestore';
import {useEffect} from 'react';

import {useCallback, useContext} from 'react';
import {teamActions} from '../stateManager/actions/team-A';
import {AppStateContext} from '../stateProvider';
const timeStump = db.FieldValue.serverTimestamp();

export const useCreateTeam = () => {
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
        await db()
          .collection('teams')
          .add({...teamData, createdAt: timeStump})
          .then(async snap => {
            try {
              // create new chatRoom
              const chatRoom = await db()
                .doc(`teams/${snap.id}`)
                .collection('chatRoom')
                .add({
                  createdAt: timeStump,
                  admins: [user.uid],
                });
              console.log('from create team');

              // update profile
              db().doc(`players/${user.uid}`).update({
                isAvailable: false,
                teamId: snap.id,
              });

              // we dont save all user info
              const {availabilityData, isAvailable, uid, ...restProps} = user;
              console.log('restProps :>> ', restProps);

              const fakeFriends = [
                {uid: 'fRNCo14Bl3aqwj7tvWM60FB8WIP2'},
                {uid: 'byMvNSft2MOcEovT19jz8UEBjUM2'},
                {uid: 'TtiY62vegubkXQgB1kIisdex5852'},
                {uid: 'JyHSe4DMerbNUbisFApttw955uW2'},
                {uid: user.uid},
              ];
              fakeFriends.forEach(async el => {
                await db().doc(`teams/${snap.id}/members/${el.uid}`).set({});
              });
              newTeam.members = fakeFriends;

              // await db()
              //   .doc(`teams/${snap.id}/members/${user.uid}`)
              //   .set(restProps);
              newTeam.admins = [user.uid];
              newTeam.chatRoomId = chatRoom.id;
              newTeam.uid = snap.id;
              // newTeam.members = [{...restProps, uid: user.uid}];
              teamDispatch(teamActions.setTeam(newTeam));
            } catch (error) {
              console.log(error);
              console.log('create collections Team ERROR =>> ', error.message);
            }
          });
      } catch (error) {
        console.log('failed to create team ERROR =>> ', error.message);
      }
    },
    [team, teamDispatch, user],
  );

  return {createTeam, userDispatch, teamDispatch, ...authState, ...teamState};
};
