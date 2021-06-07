import React, {useContext, useEffect} from 'react';
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
  const {authContext, teamContext} = useContext(AppStateContext);
  const [authState, userDispatch] = authContext;
  const [teamState, teamDispatch] = teamContext;
  const {team} = teamState;
  const {user} = authState;
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async userChanged => {
      try {
        if (userChanged) {
          //* fetch player

          let doc = await db().collection('players').doc(userChanged.uid).get();
          let loggedUser = doc.data();

          userDispatch(
            actionCreators.loadUser({...loggedUser, uid: userChanged.uid}),
          );

          //* fetch friends

          let docs = await db()
            .collection('players')
            .doc(userChanged.uid)
            .collection('friends')
            .get();
          let playerFriends = docs.docs.map(playerDoc => {
            return {...playerDoc.data(), uid: playerDoc.id};
          });
          userDispatch(actionCreators.setFriends(playerFriends));

          //* fetch team if exist
        } else {
          /// no one connected userChanged === null
          userDispatch(actionCreators.logOut());
        }
      } catch (error) {
        console.log('routNav ERROR :>> ', error.message);
        userDispatch(actionCreators.failure(error.message));
        return;
      }
    });
    return subscriber; // unsubscribe on unmount
  }, [userDispatch]);
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
