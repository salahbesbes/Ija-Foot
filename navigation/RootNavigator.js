import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainNavigator from './MainNavigator';
import SignIn from '../screen/SignIn';
import SignUp from '../screen/SignUp';
import {AppStateContext} from '../stateProvider';
import auth from '@react-native-firebase/auth';
import db from '@react-native-firebase/firestore';
import {actionCreators} from '../stateManager/actions/auth-A';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const {authContext} = React.useContext(AppStateContext);
  const [state, dispatch] = authContext; // distructuring
  const {user} = state;
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async userChanged => {
      try {
        if (userChanged) {
          let doc = await db().collection('players').doc(userChanged.uid).get();
          let loggedUser = doc.data();
          dispatch(
            actionCreators.loadUser({...loggedUser, uid: userChanged.uid}),
          );
          let docs = await db()
            .collection('players')
            .doc(userChanged.uid)
            .collection('friends')
            .get();
          let playerFriends = docs.docs.map(playerDoc => {
            return {...playerDoc.data(), uid: playerDoc.id};
          });
          dispatch(actionCreators.setFriends(playerFriends));
        } else {
          /// no one connected userChanged === null
          dispatch(actionCreators.logOut());
        }
      } catch (error) {
        console.log('routNav ERROR :>> ', error.message);
        dispatch(actionCreators.failure(error.message));
        return;
      }
    });
    return subscriber; // unsubscribe on unmount
  }, [dispatch]);
  return (
    <NavigationContainer>
      {user ? (
        <MainNavigator />
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;
