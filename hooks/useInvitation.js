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
          // add doc to team members
          await db().doc(`teams/${team.uid}/members/${playerData.uid}`).set({
            nickName: playerData.nickName,
            avatar: playerData.avatar,
          });
          console.log('add  player card  to member team');

          let updatedProfile = {};

          console.log(`matchs/${match.uid}/members/${playerData.uid}`);
          if (match.uid) {
            // if player has match
            updatedProfile = {
              teamId: team.uid,
              chatRoomId: team.chatRoomId,
              matchId: match.uid,
              matchRoomId: match.matchRoomId,
            };
            // update match memebers collction
            await db()
              .doc(`matchs/${match.uid}/members/${playerData.uid}`)
              .set({});
            console.log('add  player card  to member match');
          } else {
            // if player has no match
            updatedProfile = {
              teamId: team.uid,
              chatRoomId: team.chatRoomId,
            };
          }
          // update user profile
          await db().doc(`players/${playerData.uid}`).update(updatedProfile);
          console.log('updated player card  profile');
          // update local state
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
