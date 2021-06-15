import db from '@react-native-firebase/firestore';
import {useCallback, useContext} from 'react';
import {teamActions} from '../stateManager/actions/team-A';
import {AppStateContext} from '../stateProvider';

export const useInvitaion = () => {
  const {matchContext, teamContext, authContext} = useContext(AppStateContext);
  const [teamState, teamDispatch] = authContext;
  const [userState, userDispatch] = teamContext;
  const [matchState, matchDispatch] = matchContext;
  const {team} = teamState;
  const {match} = matchState;

  const inviteplayer = useCallback(
    async playerId => {
      try {
        if (team.uid) {
          await db().doc(`teams/${team.uid}/members/${playerId}`).set({});

          let updatedProfile = {};

          if (match.uid) {
            updatedProfile = {
              teamId: team.uid,
              chatRoomId: team.chatRoomId,
              matchId: match.uid,
              matchRoomId: match.matchRoomId,
            };
            await db().doc(`matchs/${match.uid}/members/${playerId}`).set({});
          } else {
            updatedProfile = {
              teamId: team.uid,
              chatRoomId: team.chatRoomId,
            };
          }
          await db().doc(`players/${playerId}`).update(updatedProfile);
          teamDispatch(
            teamActions.setTeam({
              ...team,
              members: [...team.members, {uid: playerId}],
            }),
          );
          console.log('we add the player to the team');
        } else {
          console.log('NO Team found');
        }
      } catch (error) {
        console.log('useInvitaion ERROR =>>', error.message);
      }
    },
    [teamDispatch, team],
  );

  return {inviteplayer, ...teamState, ...matchState, ...userState};
};
