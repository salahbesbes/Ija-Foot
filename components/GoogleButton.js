import React from 'react';
import {Button} from 'react-native';
import {useGoogleService} from '../hooks/useGoogle';

export default function GoogleButton({nav}) {
  const {signUpWithGoogle, user, loading} = useGoogleService();
  return (
    <>
      <Button
        color="orange"
        title="sign in With google"
        onPress={async () => {
          //todo: check for the return val if undefined dont push
          await signUpWithGoogle();
        }}
      />
    </>
  );
}
