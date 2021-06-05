import React, {useCallback, useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Alert, Modal, Pressable, View} from 'react-native';
import SignOutButton from './SignOutButton';
import {useFriends} from '../hooks/useFriends';
import db from '@react-native-firebase/firestore';
import {actionCreators} from '../stateManager/actions/auth-A';

const Friend = ({friend, backgroundColor, textColor, setSelectedId}) => {
  const {addFriend, deletFriend} = useFriends();

  // useEffect(() => {
  //   return getFriend(friend);
  // }, [getFriend, friend]);

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={() => {
          deletFriend(friend);
        }}
        style={[
          modal.item,
          {backgroundColor: 'grey', width: 20, height: 20},
          {flexDirection: 'row', justifyContent: 'flex-end'},
        ]}>
        <Text>X</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          addFriend(friend);
          setSelectedId(friend.uid);
        }}
        style={[
          modal.item,
          backgroundColor,
          {flexDirection: 'row', justifyContent: 'flex-end'},
        ]}>
        <Text style={[modal.title, textColor]}>
          {friend.nickName}
          {friend.age}
        </Text>
        <Text style={modal.avatar}>Avatar</Text>
      </TouchableOpacity>
    </View>
  );
};
const renderItem = ({item}, selectedId, setSelectedId) => {
  const backgroundColor = item.uid === selectedId ? '#6e3b6e' : '#f9c2ff';
  const color = item.uid === selectedId ? 'white' : 'black';
  return (
    <Friend
      friend={{...item, uid: item.uid}}
      backgroundColor={{backgroundColor}}
      textColor={{color}}
      setSelectedId={setSelectedId}
    />
  );
};

const InviteFriends = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [players, setplayers] = useState([]);
  const {userFriends, fetchFriendList, friendsList, dispatch} = useFriends();
  const fetchAllplayers = useCallback(async () => {
    try {
      let res = await db().collection('players').get();
      /// the element in the arrau doesnt have uid
      // thats why i have created an attribute id in the doc

      let tempList = [];
      res.docs.map(async friend => {
        let friendData = friend.data();
        tempList.push({uid: friend.id, ...friendData});
      });
      setplayers(tempList);
    } catch (error) {
      console.log('useFriends ERROR :>> ', error);
    }
  }, []);
  useEffect(() => {
    console.log('===============================');
    fetchAllplayers();
    return fetchFriendList();
  }, [fetchFriendList, fetchAllplayers]);

  return (
    <View style={modal.container}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={[modal.body, modal.container]}>
          <FlatList
            data={players}
            renderItem={item => renderItem(item, selectedId, setSelectedId)}
            keyExtractor={playerData => playerData.uid}
            extraData={selectedId}
          />
          <Pressable
            style={modal.buttonShowModal}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={modal.buttonText}>Hide Modal</Text>
          </Pressable>
          <Button
            title="reset State"
            onPress={() => {
              dispatch(actionCreators.reset());
            }}
          />
        </View>
      </Modal>

      <View>
        <Pressable
          style={modal.buttonShowModal}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <Text style={modal.buttonText}>Show Modal</Text>
        </Pressable>
        <SignOutButton nav={navigation} />
      </View>
    </View>
  );
};

const modal = StyleSheet.create({
  buttonShowModal: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    minWidth: 100,
    marginVertical: 20,
    backgroundColor: '#F194FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    marginBottom: 20,
    marginTop: 60,
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
  },
  container: {flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'},
  item: {
    width: 300,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 26,
  },
  avatar: {
    width: 60,
    backgroundColor: 'red',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
export default InviteFriends;
