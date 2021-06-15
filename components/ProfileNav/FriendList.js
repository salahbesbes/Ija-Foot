/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Text} from 'react-native-paper';
import {
  FlatList,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import {AppStateContext} from '../../stateProvider';
import CardModal from './CardModal';
const FriendCard = ({friend, size, isMember}) => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal}>
          <CardModal isMember={isMember} friend={friend} />
        </Modal>
      </Portal>
      <TouchableOpacity
        style={{marginVertical: 5, padding: 10, alignItems: 'center'}}
        onPress={showModal}>
        <Image
          style={{height: size, width: size, borderRadius: size}}
          source={{uri: 'https://picsum.photos/700'}}
        />
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>
          {friend?.nickName}
        </Text>
      </TouchableOpacity>
    </>
  );
};

const FriendList = ({
  nbColumn,
  horizental,
  size = 100,
  listToRender = [],
  isMember,
}) => {
  const {authContext} = useContext(AppStateContext);
  const [authState] = authContext;
  const {user} = authState;
  const listExceptMe = listToRender.filter(el => el.uid !== user.uid);
  console.log(listExceptMe.length);
  return (
    <View
      style={{
        height: isMember && 100,
      }}>
      {listExceptMe.length ? (
        <FlatList
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          horizontal={horizental}
          numColumns={nbColumn}
          data={listExceptMe}
          renderItem={({item}) => (
            <FriendCard isMember={isMember} friend={item} size={size} />
          )}
          keyExtractor={item => item.uid}
        />
      ) : (
        <Text>Nothing to display </Text>
      )}
    </View>
  );
};
export default FriendList;

const styles = StyleSheet.create({
  info: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    width: '80%',
    margin: 10,
    padding: 10,
    borderRadius: 30,
    borderColor: 'orange',
    borderWidth: 1,
    elevation: 2,
  },
});
