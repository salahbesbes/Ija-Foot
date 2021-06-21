import React, {useEffect, useState, useCallback, useContext} from 'react';
import {StyleSheet, FlatList, View, ActivityIndicator} from 'react-native';
import db from '@react-native-firebase/firestore';

import Filters, {filterData} from '../components/PlayerCard/filters';
import PlayerCard from '../components/PlayerCard/PlayerCard';
import {AppStateContext} from '../stateProvider';

const PAGINATION_LIMIT = 4;

const getLast = arr => {
  const res = arr.slice(-1)[0];
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
  const [filter, setFilter] = useState('');

  const fetchPlayers = (after, limit) => {
    if (!isListComplete) {
      // console.log('starting query');
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
    // console.log('onRefresh called');
    setRefreshing(true);
    setSnapshots([]);
    setIsListComplete(false);
    fetchPlayers(null, PAGINATION_LIMIT);
  }, []);

  useEffect(() => {
    fetchPlayers(null, PAGINATION_LIMIT);
  }, []);

  const {authContext} = useContext(AppStateContext);
  const [authState] = authContext;
  const {user} = authState;

  return (
    <View style={styles.flatList}>
      <FlatList
        renderItem={({item}) => <PlayerCard item={item} />}
        data={filterData(snapshots).filter(item => item.id !== user.uid)}
        onEndReachedThreshold={0}
        onEndReached={() => fetchPlayers(getLast(snapshots), PAGINATION_LIMIT)}
        onRefresh={onRefresh}
        refreshing={refreshing}
        keyExtractor={item => item.id}
        ListHeaderComponent={<Filters setFilter={setFilter} />}
        ListFooterComponent={<ActivityIndicator />}
        extraData={filter}
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
