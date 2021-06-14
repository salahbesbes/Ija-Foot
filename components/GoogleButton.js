import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Button} from 'react-native-paper';
import {useGoogleService} from '../hooks/useGoogle';

export default function GoogleButton() {
  const {signUpWithGoogle, loading} = useGoogleService();
  const {mv, textButton} = useTheme();
  return (
    <>
      <Button
        style={[mv]}
        uppercase
        mode="contained"
        loading={loading}
        labelStyle={[textButton]}
        icon="login"
        onPress={async () => {
          await signUpWithGoogle();
        }}>
        sign in With google
      </Button>
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
