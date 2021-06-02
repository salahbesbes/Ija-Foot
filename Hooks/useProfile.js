import db from '@react-native-firebase/firestore';

import {useCallback, useContext, useEffect} from 'react';
import {actionCreators} from '../stateManager/actions/auth-A';
import {AppStateContext} from '../stateProvider';

/// since we cant use useSignIn and useSignUp on the same component
/// we create this hooks so that we can use it any where

const useProfile = () => {
  // we are using the reducer here so we returning its value
  const {authContext} = useContext(AppStateContext);
  const [state, dispatch] = authContext;
  const {user} = state;
  // this snap is watching on any change made on the document
  // this sucscriber execute on every time the doc updates and update the local state
  useEffect(() => {
    const subscriber = db()
      .collection('users')
      .doc(user.uid)
      .onSnapshot(documentSnapshot => {
        let updatedUser = documentSnapshot.data();
        dispatch(actionCreators.loadUser({...updatedUser, uid: user.uid}));
        console.log('local user updated');
      });

    console.log('profile useeffect');
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [dispatch, user.uid]);

  // since we need sinIn to call it on Click events we returning it with the reducer state modified
  const updateProfile = useCallback(
    async newProfile => {
      dispatch(actionCreators.loading());
      try {
        // console.log('newProfile :>> ', newProfile);
        await db().collection('users').doc(user.uid).update(newProfile);

        // dispatch(actionCreators.loadUser({...loadedUser, uid: user.uid}));
      } catch (error) {
        dispatch(actionCreators.failure(error.message));
        return;
      }
    },
    [user, dispatch],
  );
  return {...state, dispatch, updateProfile};
};
export default useProfile;
