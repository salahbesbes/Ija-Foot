import React, {useState} from 'react';
import {StyleSheet, Text, Pressable, View, Modal} from 'react-native';
import {useCreateTeam} from '../../hooks/useCreateTeam';
import {teamActions} from '../../stateManager/actions/team-A';
import CreateTeamForm from './CreateTeamForm';
const CreateTeamModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const {team, teamDispatch} = useCreateTeam();
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
