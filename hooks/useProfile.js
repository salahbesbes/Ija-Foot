import db from '@react-native-firebase/firestore';

import {useCallback, useContext} from 'react';
import {actionCreators} from '../stateManager/actions/auth-A';
import {AppStateContext} from '../stateProvider';

/// since we cant use useSignIn and useSignUp on the same component
/// we create this hooks so that we can use it any where

const useProfile = () => {
  // we are using the reducer here so we returning its value
  const {authContext} = useContext(AppStateContext);
  const [state, dispatch] = authContext;
  const {user} = state;

  // since we need sinIn to call it on Click events we returning it with the reducer state modified
  const updateProfile = useCallback(
    async newProfile => {
      dispatch(actionCreators.loading());
      try {
        // let code = await auth().sendPasswordResetEmail(
        //   'salah.besbes9@gmail.com',
        // );
        // console.log('code :>> ', code);
        // let res = await auth().confirmPasswordReset('555', '987654');
        // console.log('res', res);
        await db().collection('players').doc(user.uid).update(newProfile);
        dispatch(actionCreators.loadUser({...newProfile, uid: user.id}));
      } catch (error) {
        dispatch(actionCreators.failure(error.message));
        console.log('updateProfile ERROR => ', error.message);
        return;
      }
    },
    [user, dispatch],
  );
  return {...state, dispatch, updateProfile};
};
export default useProfile;
