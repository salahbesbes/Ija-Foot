import React, {useCallback, useEffect} from 'react';
import {useReducer} from 'react';
import {Text, SafeAreaView, Button, View} from 'react-native';
import {actionCreators, signInUser} from './stateManager/actions/auth-A';
import {authReducer, initialState} from './stateManager/reducers/auth-R';

const App = () => {
  const [{loading, error, user}, dispatch] = useReducer(
    authReducer,
    initialState,
  );

  const signIn = useCallback(async () => {
    dispatch(actionCreators.loading());
    const loadedUser = await signInUser({
      email: 'wael@gmail.com',
      password: '123456',
    });
    if (loadedUser) dispatch(actionCreators.loadUser(loadedUser));
    else dispatch(actionCreators.failure());
  }, []);
  useEffect(() => {
    // signIn();
  }, [signIn]);

  return loading ? (
    <>
      <Text style={{backgroundColor: 'yellow', marginTop: 30}}>
        Loading .................
      </Text>
      <Button
        title="reset state"
        color="orange"
        onPress={() => {
          dispatch(actionCreators.failure());
        }}
      />
    </>
  ) : (
    <SafeAreaView>
      {!user ? (
        <Button
          title="Load User"
          color="red"
          onPress={() => {
            signIn();
          }}
        />
      ) : (
        <View>
          <Text> {user.email} </Text>
          <Button
            title="delete user from state"
            onPress={() => dispatch(actionCreators.failure())}
          />
        </View>
      )}
      {error && (
        <Text style={{backgroundColor: 'red', margin: 50, height: 30}}>
          Error
        </Text>
      )}
    </SafeAreaView>
  );
};

export default App;
