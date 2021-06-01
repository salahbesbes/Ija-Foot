import React, {useContext} from 'react';
import {Button, Text} from 'react-native';
import {useGoogleService} from '../Hooks/useGoogle';
import {AppStateContext} from '../stateProvider';

export default function GoogleButton() {
  const {authState} = useContext(AppStateContext);
  console.log('gg', authState);
  const {signUpWithGoogle, user, loading, error} = useGoogleService(authState);
  return (
    <>
      <Button
        color={user ? 'violet' : loading ? 'black' : 'orange'}
        title={user ? 'user is signed In' : 'sign in With google'}
        onPress={signUpWithGoogle}
      />
      {error && (
        <Text style={{backgroundColor: 'red', margin: 50, height: 80}}>
          {error}
        </Text>
      )}
    </>
  );
}
