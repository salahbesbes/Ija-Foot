import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {useInvitaion} from '../../hooks/useInvitation';

export default function CardHeader({player, addFriend}) {
  return (
    <View style={styles.container}>
      <View style={styles.avatar} />
      <Text>{player?.nickName}</Text>
      <Button title="  + " onPress={() => addFriend(player.uid)} />
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
