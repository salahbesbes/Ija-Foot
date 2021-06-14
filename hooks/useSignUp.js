import auth from '@react-native-firebase/auth';
import db from '@react-native-firebase/firestore';
import {useCallback, useContext} from 'react';
import {actionCreators} from '../stateManager/actions/auth-A';
import {AppStateContext} from '../stateProvider';

const useSignUp = () => {
  // we are using the useContext here to get the current state aof the authContext
  // and get the dispatch methode : every time we use the dispatch methode it will apdate the
  // AppStateContext exactly the authContext

  const {authContext} = useContext(AppStateContext);
  const [state, dispatch] = authContext;
  // login
  const signUp = useCallback(
    async userData => {
      await signUpUser(dispatch, userData);
    },
    [dispatch],
  );

  // since we need sinIn to call it on Click events we returning it with the authContext state modified
  return {...state, dispatch, signUp};
};
export default useSignUp;

// handle logic of sign in with fire base and at the same time the state management
const signUpUser = async (dispatch, {email, password, nickName}) => {
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
    let res = await auth().createUserWithEmailAndPassword(email, password);
    let user = res.user.toJSON();

    let defaultProfile = {
      email: user.email,
      avatar: 'gs://ija-foot-a1c03.appspot.com/images/avatar/default.png',
      //todo: remove or not this attribute
      nickName: nickName || user.email.split('@')[0] + ' nickName',
      teamId: null,
      chatRoomId: null,
    };
    // when we create new account we are creting a new doc in users collection
    await db().collection('players').doc(user.uid).set(defaultProfile);
    dispatch(actionCreators.reset());
    console.log('User  created !');
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }
    console.log('SIGN UP err => ', error);

    dispatch(actionCreators.failure(error.message));
    return;
  }
};
