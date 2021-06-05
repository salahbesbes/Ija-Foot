import db from '@react-native-firebase/firestore';

import {useCallback, useContext, useState} from 'react';
import {actionCreators} from '../stateManager/actions/auth-A';
import {AppStateContext} from '../stateProvider';

/// since we cant use useSignIn and useSignUp on the same component
/// we create this hooks so that we can use it any where

export const useFriends = () => {
  // we are using the reducer here so we returning its value
  //todo: try to export line below to the main component and pass them as props here
  const [friendsList, setFriendsList] = useState([]);
  const {authContext} = useContext(AppStateContext);
  const [state, dispatch] = authContext;
  const {user, userFriends} = state;

  // we fetch all friends doc => [ {playerRef: 'players/123456987456', uid: '123456987456'} ...]
  const fetchFriendList = useCallback(async () => {
    try {
      let res = await db()
        .collection('players')
        .doc(user.uid)
        .collection('friends')
        .get();
      /// the element in the arrau doesnt have uid
      // thats why i have created an attribute id in the doc

      let tempList = [];
      res.docs.map(async friend => {
        let friendData = friend.data();
        tempList.push({uid: friend.id, ...friendData});
      });
      setFriendsList(tempList);
      // dispatch(actionCreators.updateFriends(tempList));
    } catch (error) {
      console.log('useFriends ERROR :>> ', error);
    }
  }, [dispatch]);
  /// create new doc in the friends coolection containing only the player Reference
  // if a player already exist we overwrite him
  // this logic need the player uid
  const addFriend = useCallback(
    async playerData => {
      const newFriend = {uid: playerData.uid};
      dispatch(actionCreators.addFriend(newFriend));
      try {
        await db()
          .collection('players')
          .doc(user.uid)
          .collection('friends')
          .doc(playerData.uid)
          .set({
            nickName: playerData.nickName,
            fullName: 'this val is set bu default',
            avatar: 'default avatar',
          });
      } catch (error) {
        console.log('useFriends ERROR :>> ', error);
      }
    },
    [dispatch, user.uid],
  );

  const deletFriend = useCallback(
    async playerData => {
      dispatch(actionCreators.deleteFriend(playerData.uid));
      try {
        await db()
          .collection('players')
          .doc(user.uid)
          .collection('friends')
          .doc(playerData.uid)
          .delete();
      } catch (error) {
        console.log('useFriends ERROR :>> ', error);
      }
    },
    [dispatch, user.uid],
  );
  return {
    friendsList,
    userFriends,
    addFriend,
    fetchFriendList,
    deletFriend,
    dispatch,
    ...state,
  };
};
