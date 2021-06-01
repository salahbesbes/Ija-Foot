import React from 'react';
import {Button, Text} from 'react-native';
import {useSignOut} from '../Hooks/useSignOut';

export default function SignOutButton() {
  const {signOut, user, loading, error} = useSignOut();
  return (
    <>
      <Button color="lightred" title="sign Out" onPress={signOut} />
      {error && (
        <Text style={{backgroundColor: 'red', margin: 50, height: 80}}>
          {error}
        </Text>
      )}
    </>
  );
}
