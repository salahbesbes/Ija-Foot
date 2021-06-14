import db from '@react-native-firebase/firestore';

import {useCallback, useContext} from 'react';
import {actionCreators} from '../stateManager/actions/auth-A';
import {AppStateContext} from '../stateProvider';

/// since we cant use useSignIn and useSignUp on the same component
/// we create this hooks so that we can use it any where

export const useFriends = () => {
  // we are using the reducer here so we returning its value
  const {authContext, teamContext} = useContext(AppStateContext);
  const [authState, userDispatch] = authContext;
  const [teamState, teamDispatch] = teamContext;
  const {team} = teamState;
  const {user, userFriends} = authState;

  // we fetch all friends doc => [ {playerRef: 'players/123456987456', uid: '123456987456'} ...]
  const fetchFriendList = useCallback(async () => {
    try {
      let res = await db()
        .collection('players')
        .doc(user.uid)
        .collection('friends')
        .get();
      // create a friend data() + uid
      let tempList = [];
      res.docs.map(async friendDoc => {
        let friendData = friendDoc.data();
        tempList.push({uid: friendDoc.id, ...friendData});
      });
      // setFriendsList(tempList);
      userDispatch(actionCreators.setFriends(tempList));
    } catch (error) {
      console.log('useFriends ERROR :>> ', error);
    }
  }, [userDispatch, user.uid]);
  /// create new doc in the friends coolection containing only the player Reference
  // if a player already exist we overwrite him
  // this logic need the player uid
  const addFriend = useCallback(
    async playerData => {
      const {uid, ...other} = playerData;
      // dispatch(actionCreators.addFriend(newFriend));
      try {
        await db()
          .collection('players')
          .doc(user.uid)
          .collection('friends')
          .doc(playerData.uid)
          .set(other);
        fetchFriendList();
      } catch (error) {
        console.log('useFriends ERROR :>> ', error);
      }
    },
    [user.uid, fetchFriendList],
  );

  const deletFriend = useCallback(
    async playerData => {
      userDispatch(actionCreators.deleteFriend(playerData.uid));
      try {
        await db()
          .collection('players')
          .doc(user.uid)
          .collection('friends')
          .doc(playerData.uid)
          .delete();
        // fetchFriendList();
      } catch (error) {
        console.log('useFriends ERROR :>> ', error);
      }
    },
    [user.uid, userDispatch],
  );
  return {
    userFriends,
    addFriend,
    fetchFriendList,
    deletFriend,
    userDispatch,
    teamDispatch,
    ...teamState,
    ...authState,
  };
};
