import React, {useState, useEffect, useContext} from 'react';
import {
  Switch,
  StyleSheet,
  Text,
  Pressable,
  View,
  Alert,
  TextInput,
  Modal,
  Image,
} from 'react-native';

import {useCreateTeam} from '../../hooks/useCreateTeam';
import {teamActions} from '../../stateManager/actions/team-A';
import CreateTeamForm from './CreateTeamForm';
const CreateTeamModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {team, teamDispatch, user} = useCreateTeam();
  // console.log('team :>> ', team.admins, team.admins.includes(user.uid));

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          teamDispatch(teamActions.reset());
        }}>
        <View style={{justifyContent: 'center', marginTop: 10, flex: 1}}>
          <View style={styles.modalView}>
            <CreateTeamForm setModalVisible={setModalVisible} />
          </View>
        </View>
      </Modal>
{/*team?.admins?.includes(user.uid) ?*/} 
      <Pressable style={styles.openModal} onPress={() => {
        if (team?.members?.includes(user.uid))
        {
          setModalVisible(true);
        } else {
          navigation.navigate('MyTeam');
        }
      }}>
        <View>
          <Image
            style={styles.image}
            source={require('../../assets/icons/icons8-football-team-100.png')}
          />
        </View>
      </Pressable>
    </View>
  );
};
export default CreateTeamModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    marginTop: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 5,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    //top: -27,
    width: 80,
    height: 80,
    //backgroundColor: '#ffffee',
    borderRadius: 36,
  },
  openModal: {
    elevation: 5,
    backgroundColor: '#F0A73E',
    top: -27,
    width: 80,
    height: 80,
    borderRadius: 36,
  },
});
