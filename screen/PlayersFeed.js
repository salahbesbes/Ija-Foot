import React, {useCallback, useEffect, useState} from 'react';
import {Text, SafeAreaView, View, Button, StyleSheet} from 'react-native';
import db from '@react-native-firebase/firestore';
import Avatar from '../components/Avatar';

const PlayersFeed = ({navigation}) => {
  const [allPlayers, setAllPlayers] = useState([]);
  const fetchAllPlayers = useCallback(async () => {
    try {
      const docs = await db().collection('players').get();
      const players = docs.docs.map(playerDoc => {
        return {...playerDoc.data(), uid: playerDoc.id};
      });
      setAllPlayers(players);
      console.log('players are fetched');
    } catch (error) {
      console.log('fetch all player ERRO =>>', error.message);
    }
  }, []);
  useEffect(() => {
    return fetchAllPlayers();
  }, [fetchAllPlayers]);
  return (
    <SafeAreaView>
      {allPlayers.map((el, id) => (
        <View key={id} style={styles.card}>
          <Text> {el.nickName} </Text>
          <Avatar navigation={navigation} imageUri={el.avatar} />
        </View>
      ))}
      <Button title="ReFetch players" onPress={fetchAllPlayers} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  card: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default PlayersFeed;
