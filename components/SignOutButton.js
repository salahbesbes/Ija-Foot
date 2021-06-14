import React from 'react';
import {useSignOut} from '../hooks/useSignOut';
import {IconButton, useTheme} from 'react-native-paper';
export default function SignOutButton() {
  const {signOut} = useSignOut();
  const {colors} = useTheme();
  return (
    <>
      <IconButton
        icon="logout"
        size={20}
        color={colors.accent}
        onPress={async () => {
          await signOut();
        }}
      />
    </>
  );
}
