import db from '@react-native-firebase/firestore';

import {useCallback} from 'react';
import {actionCreators} from '../stateManager/actions/auth-A';

/// since we cant use useSignIn and useSignUp on the same component
/// we create this hooks so that we can use it any where

export const useFriends = ({userState, userDispatch}) => {
  // we are using the reducer here so we returning its value
  const {user, userFriends} = userState;
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
        // apdate the new friend he is ur friend
        await db()
          .collection('players')
          .doc(playerData.uid)
          .collection('friends')
          .doc(user.uid)
          .set(user);
        // check if the player already exist
        const playerAlreadyExist = userFriends
          .map(el => el.uid)
          .includes(playerData.uid);
        !playerAlreadyExist &&
          userDispatch(actionCreators.setFriends([...userFriends, playerData]));
      } catch (error) {
        console.log('useFriends ERROR :>> ', error);
      }
    },
    [userDispatch, user.uid, userFriends],
  );

  const deletFriend = useCallback(
    async playerId => {
      userDispatch(actionCreators.deleteFriend(playerId.uid));
      try {
        await db()
          .collection('players')
          .doc(user.uid)
          .collection('friends')
          .doc(playerId)
          .delete();
        userDispatch(
          actionCreators.setFriends(
            userFriends.filter(el => el.uid !== playerId && el),
          ),
        );
        // fetchFriendList();
      } catch (error) {
        console.log('useFriends ERROR :>> ', error);
      }
    },
    [user.uid, userDispatch, userFriends],
  );
  return {
    userFriends,
    addFriend,
    fetchFriendList,
    deletFriend,
    userDispatch,
    ...userState,
  };
};
