import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, FlatList, View, ActivityIndicator} from 'react-native';
import db from '@react-native-firebase/firestore';

import TeamCard from '../components/TeamFeedCard/TeamCard';
import Filters, {filterData} from '../components/TeamFeedCard/filters';
import {useCreateMatch} from '../hooks/useCreateMatch';

const PAGINATION_LIMIT = 4;

const getLast = arr => {
  const res = arr.slice(-1)[0];
  return res;
};

const getPaginated = (after, limit) => {
  const queryRef = db().collection('teams').orderBy('createdAt').limit(limit);
  return (after ? queryRef.startAfter(after) : queryRef).get();
};

const TeamssFeed = () => {
  const [snapshots, setSnapshots] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isListComplete, setIsListComplete] = useState(false);
  const [filter, setFilter] = useState('');
  const {match} = useCreateMatch();
  const fetchTeams = (after, limit) => {
    if (!isListComplete) {
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
    fetchTeams(null, PAGINATION_LIMIT);
  }, []);

  useEffect(() => {
    fetchTeams(null, PAGINATION_LIMIT);
    //    console.log('snapshots[0]: ' + snapshots[0]?.email);
  }, []);
  const useCreateData = useCreateMatch();
  return (
    <View style={styles.flatList}>
      <FlatList
        renderItem={({item}) => (
          <TeamCard item={item} useCreateData={useCreateData} />
        )}
        data={filterData(snapshots)}
        onEndReachedThreshold={0}
        onEndReached={() => fetchTeams(getLast(snapshots), PAGINATION_LIMIT)}
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

export default TeamssFeed;
