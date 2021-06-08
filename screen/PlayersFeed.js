import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import db from '@react-native-firebase/firestore';

import PlayerItem from '../components/PlayerCard';

const PAGINATION_LIMIT = 4;

const getLast = arr => {
  const res = arr.slice(-1)[0];
  console.log('last item: ' + res.id);
  return res;
};

const getPaginated = (after, limit) => {
  const queryRef = db()
    .collection('players')
    .where('isAvailable', '==', true)
    .limit(limit);

  return (after ? queryRef.startAfter(after) : queryRef).get();
};

const PlayersFeed = () => {
  const [snapshots, setSnapshots] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isListComplete, setIsListComplete] = useState(false);

  const fetchPlayers = (after, limit) => {
    console.log('fetchPlayers called');
    if (!isListComplete) {
      console.log('starting query');
      getPaginated(after, limit)
        .then(snap => {
          if (snap.empty) {
            setIsListComplete(true);
          } else {
            setSnapshots(snapshots.concat(snap.docs));
            setRefreshing(false);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const onRefresh = useCallback(() => {
    console.log('onRefresh called');
    setRefreshing(true);
    setSnapshots([]);
    setIsListComplete(false);
    fetchPlayers(null, PAGINATION_LIMIT);
  }, []);

  useEffect(() => {
    fetchPlayers(null, PAGINATION_LIMIT);
    //    console.log('snapshots[0]: ' + snapshots[0]?.email);
  }, []);

  return (
    <View style={styles.flatList}>
      <FlatList
        renderItem={PlayerItem}
        data={snapshots}
        onEndReachedThreshold={0}
        onEndReached={() => fetchPlayers(getLast(snapshots), PAGINATION_LIMIT)}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatList: {
    alignItems: 'center',
    alignContent: 'space-around',
  },
});

export default PlayersFeed;
