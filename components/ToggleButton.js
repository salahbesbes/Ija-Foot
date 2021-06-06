import {Pressable, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';

const ToggleButton = ({displayText, isEnabled, setIsEnabled, disabled}) => {
  return (
    <Pressable
      style={[
        styles.button,
        isEnabled && !disabled ? styles.enabled : styles.disabled,
      ]}
      onPress={() => setIsEnabled(!isEnabled)}>
      <Text>{displayText}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,

    marginTop: 20,
  },

  enabled: {
    backgroundColor: '#44D5EE',
    elevation: 5,
  },

  disabled: {
    backgroundColor: '#2E90A1',
    elevation: 0,
    opacity: 0.3,
  },
});

export default ToggleButton;
