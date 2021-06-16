import db from '@react-native-firebase/firestore';
import {useCallback} from 'react';
import {teamActions} from '../stateManager/actions/team-A';

export const useInvitaion = ({
  teamState,
  teamDispatch,
  matchState,
  matchDispatch,
}) => {
  const {team} = teamState;
  const {match} = matchState;

  const inviteplayer = useCallback(
    async playerData => {
      console.log('playerData :>> ', playerData);
      try {
        if (team.uid) {
          await db().doc(`teams/${team.uid}/members/${playerData.uid}`).set({
            nickName: playerData.nickName,
            avatar: playerData.avatar,
          });
          console.log('add  player card  to member team');

          let updatedProfile = {};

          console.log(`matchs/${match.uid}/members/${playerData.uid}`);
          if (match.uid) {
            updatedProfile = {
              teamId: team.uid,
              chatRoomId: team.chatRoomId,
              matchId: match.uid,
              matchRoomId: match.matchRoomId,
            };
            await db()
              .doc(`matchs/${match.uid}/members/${playerData.uid}`)
              .set({});
            console.log('add  player card  to member match');
          } else {
            updatedProfile = {
              teamId: team.uid,
              chatRoomId: team.chatRoomId,
            };
          }
          await db().doc(`players/${playerData.uid}`).update(updatedProfile);
          console.log('updated player card  profile');

          teamDispatch(
            teamActions.setTeam({
              ...team,
              members: [...team.members, {uid: playerData.uid}],
            }),
          );
          console.log('we add the player to the team');
        } else {
          console.log('NO Team found');
        }
      } catch (error) {
        console.error(error);
        console.log('useInvitaion ERROR =>>', error.message);
      }
    },
    [teamDispatch, team],
  );

  return {
    inviteplayer,
    ...teamState,
    ...matchState,
    teamDispatch,
    matchDispatch,
  };
};
