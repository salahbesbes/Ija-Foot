import React, {useContext, useEffect, useRef, useState} from 'react';
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
import {actionCreators} from '../stateManager/actions/auth-A';
import {AppStateContext} from '../stateProvider';

const Friend = ({friend, backgroundColor, textColor, setSelectedId}) => {
  const {authContext} = useContext(AppStateContext);
  const [userState, userDispatch] = authContext;
  const {addFriend, deletFriend} = useFriends({userState, userDispatch});

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
          {friend?.nickName}
          {friend?.age}
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
      friend={item}
      backgroundColor={{backgroundColor}}
      textColor={{color}}
      setSelectedId={setSelectedId}
    />
  );
};

const InviteFriends = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const {userFriends, dispatch} = useFriends();
  let FriendSRender = useRef(0);
  useEffect(() => {
    FriendSRender.current += 1;
    console.log({friendsScreenRender: FriendSRender.current});
    return () => {
      FriendSRender.current -= 1;
      console.log({friendsScreenRender: FriendSRender.current});
    };
  }, []);
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
            data={userFriends}
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
