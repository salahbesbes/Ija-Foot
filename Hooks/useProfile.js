import auth from '@react-native-firebase/auth';

import {useCallback, useEffect} from 'react';
import {useReducer} from 'react';
import {actionCreators} from '../stateManager/actions/auth-A';
import {authReducer, initialState} from '../stateManager/reducers/auth-R';

/// since we cant use useSignIn and useSignUp on the same component
/// we create this hooks so that we can use it any where

export const Profile = () => {
  // we are using the reducer here so we returning its value
  const [state, dispatch] = useReducer(authReducer, initialState);
  const {user} = state;
  useEffect(() => {
    const subscriber = auth()
      .collection('users')
      .doc(user.uid)
      .onSnapshot(documentSnapshot => {
        console.log('User data: ', documentSnapshot.data());
      });

    console.log('profile useeffect');
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [user]);

  const updateProfile = newProfile => {};
  return {...state, dispatch};
};
