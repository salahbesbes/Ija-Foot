import {useCallback, useContext} from 'react';
import db from '@react-native-firebase/firestore';

import {actionCreators} from '../stateManager/actions/auth-A';
import {AppStateContext} from '../stateProvider';
import {matchActions} from '../stateManager/actions/match-A';
import {teamActions} from '../stateManager/actions/team-A';
const timeStump = db.FieldValue.serverTimestamp();

export const useCreateMatch = () => {
  const {authContext, matchContext, teamContext} = useContext(AppStateContext);
  const [authState, userDispatch] = authContext;
  const [matchState, matchDispatch] = matchContext;
  const [teamState, teamDispatch] = teamContext;
  const {match} = matchState;
  const {user} = authState;
  const {team} = teamState;

  const createMatch = useCallback(
    async ({teamA, teamB}) => {
      try {
        const newmatch = {...match, ...{teamA, teamB}};
        await db()
          .collection('matchs')
          .add({...{teamA, teamB}, createdAt: timeStump})
          .then(async snap => {
            try {
              // create new chatRoom
              const chatRoom = await db()
                .doc(`matchs/${snap.id}`)
                .collection('chatRoom')
                .add({
                  createdAt: timeStump,
                });
              console.log('from create match');
              // update profile
              db().doc(`players/${user.uid}`).update({
                isAvailable: false,
                matchId: snap.id,
                matchRoomId: chatRoom.id,
              });

              userDispatch(
                actionCreators.loadUser({
                  ...user,
                  isAvailable: false,
                  matchId: snap.id,
                  matchRoomId: chatRoom.id,
                }),
              );

              // we dont save all user info
              let batch = db().batch();

              // save all current members
              let currentMembers = team.members.map(member => {
                const docRef = db().doc(
                  `matchs/${snap.id}/members/${member.uid}`,
                ); //automatically generate unique id
                batch.set(docRef, member);
              });
              console.log('currentMembers :>> ', currentMembers);

              // save opposit memebers
              const membersDocs = await db()
                .doc(`teams/${teamB}`)
                .collection('members')
                .get();
              // update all oppsit team profile
              membersDocs.docs.map(member => {
                const docRef = db().doc(`teams/${teamB}/members/${member.id}`);
                batch.update(docRef, {
                  matchId: snap.id,
                  matchRoomId: chatRoom.id,
                });
              });
              const teamBmembers = membersDocs.docs.map(doc => {
                const docRef = db().doc(`matchs/${snap.id}/members/${doc.id}`);
                batch.set(docRef, doc);
                return {...doc.data(), uid: doc.id};
              });

              await batch.commit();
              console.log('teamBmembers :>> ', teamBmembers);
              console.log('team.members :>> ', team.members);

              newmatch.matchRoomId = chatRoom.id;
              newmatch.uid = snap.id;
              newmatch.members = [...teamBmembers, ...team.members];
              newmatch.teamA = team.uid;
              newmatch.teamB = teamB;
              console.log('newmatch :>> ', newmatch);
              matchDispatch(matchActions.setMatch(newmatch));
              console.log('we created match and save it to local state');
            } catch (error) {
              console.log(error);
              console.log('create collections match ERROR =>> ', error.message);
            }
          });
      } catch (error) {
        console.log('failed to create match ERROR =>> ', error.message);
      }
    },
    [match, team, matchDispatch, user, userDispatch],
  );

  const exitFromRoom = useCallback(async () => {
    await db().doc(`players/${user.uid}`).update({
      teamId: null,
      chatRoomId: null,
      matchId: null,
      matchRoomId: null,
    });
    await db().doc(`teams/${team.uid}/members/${user.uid}`).delete();
    userDispatch(
      actionCreators.loadUser({
        ...user,
        teamId: null,
        chatRoomId: null,
        matchId: null,
        matchRoomId: null,
      }),
    );
    teamDispatch(teamActions.logOut());
  }, [userDispatch]);

  return {
    createMatch,
    userDispatch,
    matchDispatch,
    exitFromRoom,
    ...authState,
    ...matchState,
    ...teamState,
  };
};
