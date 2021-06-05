import React from 'react';
import {Button} from 'react-native';
import {useGoogleService} from '../hooks/useGoogle';

export default function GoogleButton() {
  const {signUpWithGoogle} = useGoogleService();
  return (
    <>
      <Button
        color="orange"
        title="sign in With google"
        onPress={async () => {
          await signUpWithGoogle();
        }}
      />
    </>
  );
}
