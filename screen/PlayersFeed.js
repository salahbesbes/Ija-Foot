import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import db from '@react-native-firebase/firestore';

import PlayerItem from '../components/PlayerCard';
import Filters, {filterData} from '../components/PlayerCard/filters';

import {useAdmin} from '../hooks/useAdmin';
import {useInvitaion} from '../hooks/useInvitation';

const PAGINATION_LIMIT = 4;

const getLast = arr => {
  const res = arr.slice(-1)[0];
  return res;
};

const getPaginated = (after, limit) => {
  const queryRef = db()
    .collection('players')
    //.where('isAvailable', '==', true)
    .limit(limit);

  return (after ? queryRef.startAfter(after) : queryRef).get();
};

const PlayersFeed = () => {
  const [snapshots, setSnapshots] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isListComplete, setIsListComplete] = useState(false);
  const [filter, setFilter] = useState('');

  const fetchPlayers = (after, limit) => {
    console.log('fetchPlayers called');
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

  const useAdminData = useAdmin();
  // console.log('team.id :>> ', team.uid);
  const useInviData = useInvitaion();
  return (
    <>
      <View style={styles.flatList}>
        <FlatList
          renderItem={({item}) => (
            <PlayerItem
              item={item}
              useInviData={useInviData}
              useAdminData={useAdminData}
            />
          )}
          data={filterData(snapshots)}
          onEndReachedThreshold={0}
          onEndReached={() =>
            fetchPlayers(getLast(snapshots), PAGINATION_LIMIT)
          }
          onRefresh={onRefresh}
          refreshing={refreshing}
          keyExtractor={item => item.id}
          ListHeaderComponent={<Filters setFilter={setFilter} />}
          ListFooterComponent={<ActivityIndicator />}
          extraData={filter}
        />
      </View>
      {/* <FlatList
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => givePrivilege(item.uid)}>
            <View style={{marginVertical: 10}}>
              <Text> {item.uid} </Text>
              <Text> {item.nickName} </Text>
            </View>
          </TouchableOpacity>
        )}
        data={playerss}
        keyExtractor={item => item.uid}
      /> */}
    </>
  );
};

const styles = StyleSheet.create({
  flatList: {
    alignItems: 'center',
    alignContent: 'space-around',
  },
});

export default PlayersFeed;
