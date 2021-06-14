import React, {useState} from 'react';
import {
  Modal,
  Portal,
  Button,
  Provider,
  Text,
  TextInput,
} from 'react-native-paper';

const MyModal = ({trigerButton, renderForm}) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Text>Example Modal. Click outside this area to dismiss.</Text>
          {renderForm({
            hideModal: hideModal,
          })}
        </Modal>
        <Button> dqsd </Button>
        {trigerButton &&
          trigerButton({
            onPress: setVisible,
          })}
      </Portal>
    </Provider>
  );
};
// this model takes the form we want to show
const CustumModal = ({trigerButton}) => {
  const Form = ({hideModal = () => {}}) => {
    console.log('hideModal :>> ', hideModal);
    const [email, setEmail] = useState('');
    return (
      <>
        <TextInput
          value={email}
          mode="flat"
          onChangeText={setEmail}
          left={<TextInput.Icon name="email" disabled />}
        />
        <Button onPress={hideModal} uppercase mode="contained" icon="login">
          LogIn
        </Button>
      </>
    );
  };

  const renderForm = props => <Form {...props} />;
  return <MyModal trigerButton={trigerButton} renderForm={renderForm} />;
};
export default CustumModal;
