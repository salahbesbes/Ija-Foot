import React from 'react';
import {Button} from 'react-native';
import {useSignOut} from '../hooks/useSignOut';

export default function SignOutButton({nav}) {
  const {signOut} = useSignOut();
  return (
    <>
      <Button
        color="lightgreen"
        title="sign Out"
        onPress={async () => {
          await signOut();
          /* nav.navigate('SignIn'); */
        }}
      />
    </>
  );
}
