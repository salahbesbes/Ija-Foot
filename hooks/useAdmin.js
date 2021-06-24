import {useCallback} from 'react';
import db from '@react-native-firebase/firestore';

import {teamActions} from '../stateManager/actions/team-A';

export const useAdmin = ({teamState, teamDispatch}) => {
  const {team} = teamState;

  //   teamDispatch(teamActions.setTeam({...team, members}));
  const kickPlayer = useCallback(
    async playerId => {
      // const listOfmembers = team.members.map(el => el.uid);

      try {
        // delete player from chatRoom Members collection
        await db().doc(`teams/${team.uid}/members/${playerId}`).delete();

        // update plyer profile to delete chatRoomId
        await db().doc(`players/${playerId}`).update({
          teamId: null,
          chatRoomId: null,
          matchId: null,
          matchRoomId: null,
        });

        // if player is admin -> update chatRoom kick Admin
        const playerIsAdmin = team.admins.includes(playerId);

        if (playerIsAdmin) {
          console.log(
            ' the player is a admin we update  memeber and admin list ',
          );

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
          // console.log('those players are admins', updatedAdminsList);
          // console.log('after kick new members are', updatedMembersList);
        } else {
          console.log(' the player is a memeber we update only memeber list ');
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
    },

    [team],
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
  }, [team]);

  const givePrivilege = useCallback(
    async playerId => {
      // if player in is the team

      try {
        // if player is not already admin update chatRoom Admins
        const playerIsAdmin = team.admins.includes(playerId);
        if (!playerIsAdmin) {
          // we add player to list of admin in the charRoom doc
          console.log(
            'we found ',
            team.admins,
            ' before we add ',
            playerId,
            ' to list of admin',
          );
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
    },
    [team],
  );

  const updateDeatails = useCallback(async chatRoomDetails => {
    try {
      await db().doc(`teams/${team.uid}`).update(chatRoomDetails);
      // teamDispatch(teamActions.setTeam({...team, ...chatRoomDetails}));
    } catch (error) {
      console.log('update teamDoc Details ERROR =>>  ', error.message);
    }
  }, []);
  return {
    updateDeatails,
    kickPlayer,
    givePrivilege,
    getAllMembers,
    ...teamState,
  };
};
