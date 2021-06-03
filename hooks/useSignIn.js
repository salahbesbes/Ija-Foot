import auth from '@react-native-firebase/auth';

import {useCallback, useContext} from 'react';
import {actionCreators} from '../stateManager/actions/auth-A';
import {AppStateContext} from '../stateProvider';

const useSignIn = () => {
  // we are using the useContext here to get the current state aof the authContext
  // and get the dispatch methode : every time we use the dispatch methode it will apdate the
  // AppStateContext exactly the authContext
  const {authContext} = useContext(AppStateContext);
  const [state, dispatch] = authContext; // distructuring
  // login
  const signIn = useCallback(
    async userData => {
      return await signInUser(dispatch, userData);
    },
    [dispatch],
  );
  // since we need sinIn to call it on Click events we returning it with the authContext state modified
  return {...state, dispatch, signIn};
};
export default useSignIn;

// handle logic of sign in with fire base and at the same time the state management
const signInUser = async (dispatch, {email, password}) => {
  dispatch(actionCreators.loading());
  if (!email || email === '') {
    dispatch(actionCreators.failure('email must not be empty'));
    return;
  }
  if (!password || password === '') {
    dispatch(actionCreators.failure('email must not be empty'));
    return;
  }
  try {
    let res = await auth().signInWithEmailAndPassword(email, password);
    let user = res.user.toJSON();
    console.log('User signed in!', user?.email || 'user is not json');
    dispatch(actionCreators.reset());
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }
    console.log('sign in err => ', error);

    dispatch(actionCreators.failure(error.message));
    return;
  }
};
