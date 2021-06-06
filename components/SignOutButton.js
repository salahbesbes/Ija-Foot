import React from 'react';
import {Button} from 'react-native';
import {useSignOut} from '../hooks/useSignOut';

export default function SignOutButton() {
  const {signOut} = useSignOut();
  return (
    <>
      <Button
        color="lightgreen"
        title="sign Out"
        onPress={async () => {
          await signOut();
        }}
      />
    </>
  );
}
