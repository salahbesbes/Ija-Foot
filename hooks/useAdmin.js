import db from '@react-native-firebase/firestore';
import {useEffect, useReducer} from 'react';
import {useState} from 'react';

import {useCallback, useContext} from 'react';
import {teamActions} from '../stateManager/actions/team-A';
import {AppStateContext} from '../stateProvider';

export const useAdmin = () => {
  const [members, setMembers] = useState([
    {uid: '1'},
    {uid: '2'},
    {uid: '3'},
    {uid: '4'},
    {uid: '5'},
  ]);
  const {authContext, teamContext} = useContext(AppStateContext);
  const [authState, userDispatch] = authContext;
  const [teamState, teamDispatch] = teamContext;
  const {team} = teamState;
  const {user} = authState;

  //   teamDispatch(teamActions.setTeam({...team, members}));
  const kickPlayer = useCallback(
    async playerId => {
      const listOfAdminsIds = team.members.map(el => el.uid);

      if (listOfAdminsIds.includes(playerId)) {
        try {
          // delete player from chatRoom Members collection
          await db().doc(`teams/${team.uid}/members/${playerId}`).delete();

          // update plyer profile to delete chatRoomId
          await db().doc(`players/${playerId}`).update({
            teamId: null,
          });

          // if player is admin -> update chatRoom kick Admin
          const playerIsAdmin = team.admins.includes(playerId);

          if (playerIsAdmin) {
            const updatedAdminsList = team.admins.filter(
              admin => admin !== playerId,
            );

            await db()
              .doc(`teams/${team.uid}/chatRoom/${team.chatRoomId}`)
              .update({
                admins: updatedAdminsList,
              });

            const updatedMembersList = team.members.filter(
              player => player.uid !== playerId,
            );

            teamDispatch(
              teamActions.setTeam({
                ...team,
                members: updatedMembersList,
                admins: updatedAdminsList,
              }),
            );
          } else {
            // update only members
            const updatedMembersList = team.members.filter(
              player => player.uid !== playerId,
            );

            teamDispatch(
              teamActions.setTeam({...team, members: updatedMembersList}),
            );
          }

          console.log('plyer ', playerId, ' successfully deleted!');
        } catch (error) {
          console.error('Error removing document: ', error.message);
        }
      } else {
        console.log('player is not in the team cant delete him ');
      }
    },

    [team, teamDispatch],
  );

  const getAllMembers = useCallback(async () => {
    const teamDocs = await db()
      .doc(`teams/${team.uid}`)
      .collection('members')
      .get();
    const teamPlayers = teamDocs.docs.map(memberDoc => {
      const member = memberDoc.data();
      return {
        ...member,
        uid: memberDoc.id,
      };
    });
    teamDispatch(teamActions.setTeam({...team, members: teamPlayers}));
  }, [team, teamDispatch]);

  const givePrivilege = useCallback(
    async playerId => {
      // if player in is the team
      if (team.members.map(el => el.uid).includes(playerId)) {
        try {
          // if player is not already admin update chatRoom Admins
          const playerIsAdmin = team.admins.includes(playerId);
          if (!playerIsAdmin) {
            // we add player to list of admin in the charRoom doc
            await db()
              .doc(`teams/${team.uid}/chatRoom/${team.chatRoomId}`)
              .update({
                admins: [...team.admins, playerId],
              });
            // todo: need to listen to this change so that in the front end we detect this update

            // update local state
            teamDispatch(
              teamActions.setTeam({
                ...team,
                admins: [...team.admins, playerId],
              }),
            );
            console.log('we add ', playerId, 'to the admin list');
          } else {
            console.log('player is already admin');
          }
        } catch (error) {
          console.log('Error while updating admins list =>> ', error.message);
        }
      } else {
        console.log('player is not in the team cant give him privilege');
      }
    },
    [team, teamDispatch],
  );
  const updateDeatails = useCallback(
    async chatRoomDetails => {
      try {
        await db().doc(`teams/${team.uid}`).update(chatRoomDetails);
      } catch (error) {
        console.log('update teamDoc Details ERROR =>>  ', error.message);
      }
    },
    [team],
  );
  return {
    updateDeatails,
    kickPlayer,
    getAllMembers,
    givePrivilege,
    ...authState,
    ...teamState,
  };
};
