import {useCallback} from 'react';
import db from '@react-native-firebase/firestore';

import {actionCreators} from '../stateManager/actions/auth-A';

export const useFriends = ({userState, userDispatch}) => {
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
      // adding new doc to friends collection
      // even if the friend allready exist set() erase it
      try {
        await db()
          .collection('players')
          .doc(user.uid)
          .collection('friends')
          .doc(playerData.uid)
          .set(other);

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
      // update friend collection
      try {
        await db()
          .collection('players')
          .doc(user.uid)
          .collection('friends')
          .doc(playerId)
          .delete();
        // update local state
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
