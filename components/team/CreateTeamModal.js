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
} from 'react-native';
import {useCreateTeam} from '../../hooks/useCreateTeam';
import {actionCreators} from '../../stateManager/actions/auth-A';
import {teamActions} from '../../stateManager/actions/team-A';
import {AppStateContext} from '../../stateProvider';
import CreateTeamForm from './CreateTeamForm';
const CreateTeamModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const {team, user, userDispatch, teamDispatch} = useCreateTeam();

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
      <Pressable style={styles.openModal} onPress={() => setModalVisible(true)}>
        <Text>{team.teamName ? 'My Team' : 'Create Team'}</Text>
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
  openModal: {
    backgroundColor: 'orange',
    width: 100,
    height: 50,
  },
});
