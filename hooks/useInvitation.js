import db from '@react-native-firebase/firestore';
import {useCallback, useContext} from 'react';
import {teamActions} from '../stateManager/actions/team-A';
import {AppStateContext} from '../stateProvider';

export const useInvitaion = () => {
  const {authContext, teamContext} = useContext(AppStateContext);
  const [authState, userDispatch] = authContext;
  const [teamState, teamDispatch] = teamContext;
  const {team} = teamState;
  const {user} = authState;

  const addFriend = useCallback(
    async playerId => {
      try {
        console.log('team is ', team);
        if (team.uid) {
          await db().doc(`teams/${team.uid}/members/${playerId}`).set({});
          await db().doc(`players/${playerId}`).update({teamId: team.uid});
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
    [teamDispatch],
  );
  return {addFriend, ...authState, ...teamState};
};
