import auth from '@react-native-firebase/auth';

import {useCallback} from 'react';
import {useReducer} from 'react';
import {actionCreators} from '../stateManager/actions/auth-A';
import {authReducer, initialState} from '../stateManager/reducers/auth-R';

/// since we cant use useSignIn and useSignUp on the same component
/// we create this hooks so that we can use it any where

export const useSignOut = () => {
  // we are using the reducer here so we returning its value
  const [state, dispatch] = useReducer(authReducer, initialState);

  const signOut = useCallback(async () => {
    await userSignOut(dispatch);
  }, []);
  // since we need sinIn to call it on Click events we returning it with the reducer state modified
  return {signOut, ...state};
};

const userSignOut = async dispatch => {
  try {
    await auth().signOut();
    console.log('User signed out!');
    dispatch(actionCreators.loadUser(undefined));
  } catch (error) {
    console.log('signout => ', error);
    dispatch(actionCreators.failure(error.message));
    return;
  }
};
