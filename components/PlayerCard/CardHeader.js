import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {useInvitaion} from '../../hooks/useInvitation';

export default function CardHeader({player, useInviData, useAdminData}) {
  const {addFriend, team, user} = useInviData;
  const {kickPlayer, givePrivilege} = useAdminData;
  return (
    <View style={styles.container}>
      <View style={styles.avatar} />
      <Text>{player?.nickName}</Text>
      <Button title="  +  " onPress={() => addFriend(player.uid)} />
      <Text> _ </Text>
      {team?.admins?.includes(user.uid) && (
        <>
          <Button
            color="red"
            title="  -  "
            onPress={() => kickPlayer(player.uid)}
          />
          <Text> _ </Text>
          <Button
            color="orange"
            title="Admin"
            onPress={() => givePrivilege(player.uid)}
          />
        </>
      )}
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
