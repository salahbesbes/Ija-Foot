import {useCallback, useContext, useEffect} from 'react';
import db from '@react-native-firebase/firestore';
import {matchActions} from '../stateManager/actions/match-A';
import {teamActions} from '../stateManager/actions/team-A';
import {actionCreators} from '../stateManager/actions/auth-A';
import {AppStateContext} from '../stateProvider';

export const useHomeListner = () => {
  const {authContext, teamContext, matchContext} = useContext(AppStateContext);
  const [authState, userDispatch] = authContext;
  const [teamState, teamDispatch] = teamContext;
  const [matchState, matchDispatch] = matchContext;
  const {team} = teamState;
  const {user, userFriends} = authState;
  const {match} = matchState;

  //listning on match members changes in homescreen
  useEffect(() => {
    if (match.uid) {
      const unsubChatRoomMembers = db()
        .doc(`matchs/${match.uid}`)
        .collection('members')
        .onSnapshot(snapshot => {
          const newMembers = snapshot.docs.map(member => {
            return {uid: member.id, ...member.data()};
          });
          matchDispatch(
            matchActions.setMatch({
              ...match,
              members: newMembers,
            }),
          );

          console.log(
            'From Home RoomMembers callback fired',
            'match uid',
            match.uid,
            'members',
            newMembers,
          );
        });
      return unsubChatRoomMembers;
    }
  }, []);

  const ListenOnProfileChanges = useCallback(() => {
    try {
      const unsubProfile = db()
        .doc(`players/${user.uid}`)
        .onSnapshot(snapshot => {
          console.log('From Home User Profile callback fired');

          const newProfile = snapshot.data();

          // update local state
          teamDispatch(
            teamActions.setTeam({
              ...team,
              uid: newProfile?.teamId,
              chatRoomId: newProfile?.chatRoomId,
            }),
          );
          userDispatch(
            actionCreators.loadUser({
              ...newProfile,
              uid: snapshot.id,
              teamId: newProfile?.teamId,
              chatRoomId: newProfile?.chatRoomId,
            }),
          );

          //* update the profile inside the friends list
          userFriends.forEach(async friend => {
            try {
              await db()
                .doc(`players/${friend.uid}/friends/${user.uid}`)
                .update(newProfile);
            } catch (error) {
              console.log(`i dont exist on${friend.nickName} list of friends`);
            }
          });

          console.log(
            `we updated your profile in the doc of ${userFriends.length} of your friend`,
          );
        });
      /*
        // * update user profile in the team
        //* if the player has a team
            if (team.uid) {
              const {availabilityData, isAvailable, uid, ...restProps} = user;
              await db()
                .doc(`teams/${team.uid}/members/${user.uid}`)
                .set(restProps);
              console.log('you updated your doc in the members collection ');
            }
        */
      // console.log('snapshot :>> ', snapshot);

      return unsubProfile;
    } catch (error) {
      console.log('use Home listner error', error.message);
    }
  }, [teamDispatch, userDispatch]);

  const ListenOnTeamDoc = useCallback(() => {
    let unsub = () => {};
    if (team.uid) {
      console.log('ListenOnTeamDoc is listning');

      unsub = db()
        .collection('teams')
        .doc(team.uid)
        .onSnapshot(snapshot => {
          console.log('ListenOnTeamDoc callback is fired');
          const {createdAt, ...updatedTeam} = snapshot.data();

          teamDispatch(
            teamActions.setTeam({
              ...team,
              ...updatedTeam,
            }),
          );
        });
    }
    return unsub;
  }, []);

  const listenOnMembersCollection = useCallback(() => {
    let unsub = () => {};
    if (team.uid) {
      console.log('listenOnMembersCollection is listning');

      unsub = db()
        .doc(`teams/${team.uid}`)
        .collection('members')
        .onSnapshot(async snapshot => {
          // every time the collection memebers is  updated (add/remove) this callback should excute
          console.log('listenOnMembersCollection  callback is fired');

          const membersDb = snapshot.docs.map(doc => {
            return {...doc.data(), uid: doc.id};
          });
          console.log('membersDb', membersDb.length);
          console.log(
            'members are ',
            membersDb.map(el => el.nickName),
          );
          console.log('local admins ', team.admins);
          teamDispatch(
            teamActions.setTeam({
              ...team,
              members: membersDb,
            }),
          );
        });
    }
    return unsub;
  }, [teamDispatch]);

  useEffect(() => {
    const unsub = ListenOnProfileChanges();
    return () => unsub();
  }, [ListenOnProfileChanges]);

  useEffect(() => {
    const unsub = ListenOnTeamDoc();
    return () => unsub();
  }, [ListenOnTeamDoc]);

  useEffect(() => {
    const unsub = listenOnMembersCollection();
    return () => unsub();
  }, [listenOnMembersCollection]);
  //listning on profile changes in homescreen

  //listning on team members changes in homescreen
  /* 
  useEffect(() => {
    const unsub = db()
      .doc(`teams/${team.uid}`)
      .collection('members')
      .onSnapshot(snapshot => {
        // console.log('snapshot.docs', snapshot.docs.length);
        // console.log('snapshot.docChanges()', snapshot.docChanges().length);
        // cteate new list of members --> update local state
        console.log('From Home watch members callback fired');
        const membersDb = snapshot.docs.map(doc => {
          return {...doc.data(), uid: doc.id};
        });
        teamDispatch(
          teamActions.setTeam({
            ...team,
            members: membersDb,
          }),
        );
      });
    return unsub;
  }, []);
  */
  return {
    userFriends,
    user,
    match,
    team,
    userDispatch,
    teamDispatch,
    matchDispatch,
  };
};
