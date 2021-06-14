import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button} from 'react-native-paper';

export default function CardHeader({teamCard, useCreateDAta}) {
  const {createMatch, team} = useCreateDAta;
  return (
    <View style={styles.container}>
      <View style={styles.avatar} />
      <Text>loreum sample text</Text>
      <Button
        mode="outlined"
        onPress={() => {
          createMatch({teamA: team.uid, teamB: teamCard.uid});
        }}>
        invite team
      </Button>
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
