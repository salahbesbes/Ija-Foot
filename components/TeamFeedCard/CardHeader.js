import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function CardHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.avatar} />
      <Text>loreum sample text</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 11,
    backgroundColor: 'red',
    marginRight: 6,
  },
});
