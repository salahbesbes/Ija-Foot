/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Text, useTheme, Button} from 'react-native-paper';
import {
  FlatList,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import {Modal, Portal, Surface} from 'react-native-paper';
import {useFriends} from '../../hooks/useFriends';
import {AppStateContext} from '../../stateProvider';

const FriendCard = ({friend, size, isMember}) => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const {submitButton, mv, colors} = useTheme();
  const {deletFriend, loading, error, team, user} = useFriends();

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Surface style={[styles.surface, {elevation: 12, borderRadius: 10}]}>
            <Text style={styles.info}>{friend.nickName} </Text>
            <View style={{flexDirection: 'row'}}>
              <Button
                style={[mv, submitButton, {marginHorizontal: 5, flex: 1}]}
                uppercase
                mode="contained"
                loading={loading}
                labelStyle={{fontWeight: 'bold', fontSize: 13}}
                icon="person-add"
                onPress={() => {
                  isMember
                    ? console.log('this is a member of the team')
                    : console.log('we need to add him to Friend List');
                  // addFriend(friend.uid);
                }}>
                {isMember ? 'add Friend' : 'invite'}
              </Button>
              {team.admins.map(el => el.uid).includes(user.uid) && (
                <Button
                  style={[
                    mv,
                    submitButton,
                    {
                      marginHorizontal: 5,
                      flex: 1,
                      backgroundColor: colors.error,
                    },
                  ]}
                  uppercase
                  mode="contained"
                  loading={loading}
                  labelStyle={{
                    fontWeight: 'bold',
                    fontSize: 17,
                  }}
                  icon="person-remove"
                  onPress={() => {
                    deletFriend(friend.uid);
                  }}>
                  remove
                </Button>
              )}
            </View>
          </Surface>
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
          {friend.nickName}
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
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', height: 100}}>
      {listExceptMe.length ? (
        <FlatList
          horizontal={horizental}
          numColumns={nbColumn}
          data={listExceptMe}
          renderItem={({item}) => (
            <FriendCard isMember friend={item} size={size} />
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
  surface: {
    margin: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circular: {},
  circularCard: {
    width: 100,
    height: 200,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
});
