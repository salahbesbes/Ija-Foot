import auth from '@react-native-firebase/auth';
import db from '@react-native-firebase/firestore';

import {useCallback, useContext} from 'react';
import {actionCreators} from '../stateManager/actions/auth-A';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AppStateContext} from '../stateProvider';

GoogleSignin.configure({
  webClientId:
    '444195064233-krcf2bdeq47uv45u9gsg5vjqfrnl6vo0.apps.googleusercontent.com',
});

/// since we cant use useSignIn and useSignUp on the same component
/// we create this hooks so that we can use it any where

export const useGoogleService = () => {
  // we are using the reducer here so we returning its value
  const {authContext} = useContext(AppStateContext);
  const [state, dispatch] = authContext;

  const signUpWithGoogle = useCallback(async () => {
    await GoogleSignUp_In(dispatch);
  }, [dispatch]);
  // since we need sinIn to call it on Click events we returning it with the reducer state modified
  return {signUpWithGoogle, ...state};
};

const GoogleSignUp_In = async dispatch => {
  dispatch(actionCreators.loading());

  try {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    let res = await auth().signInWithCredential(googleCredential);
    let user = res.user.toJSON();
    console.log('sign In/up With Google');
    dispatch(actionCreators.loadUser(user));
    let defaultProfile = {
      name: user.displayName || 'No Name',
      email: user.email,
      avatar: 'defaultAvatar',
      phoneNumber: '11111111',
    };
    await db().collection('users').doc(user.uid).set(defaultProfile);
  } catch (error) {
    console.log('google sign in err => ', error);
    dispatch(actionCreators.failure(error.message));
    return;
  }
};
