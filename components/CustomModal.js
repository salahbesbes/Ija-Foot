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
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}>
        {renderForm({
          hideModal: hideModal,
        })}
      </Modal>
      {trigerButton &&
        trigerButton({
          onPress: showModal,
        })}
    </Portal>
  );
};
// this model takes the form we want to show
const CustumModal = ({trigerButton, renderForm}) => {
  /// folow exemple

  // const Form = ({hideModal = () => {}}) => {
  //   console.log('hideModal :>> ', hideModal);
  //   const [email, setEmail] = useState('');
  //   return (
  //     <>
  //       <TextInput
  //         value={email}
  //         mode="flat"
  //         onChangeText={setEmail}
  //         left={<TextInput.Icon name="email" disabled />}
  //       />
  //       <Button onPress={hideModal} uppercase mode="contained" icon="login">
  //         LogIn
  //       </Button>
  //     </>
  //   );
  // };
  // const renderForm = props => <Form {...props} />;
  return <MyModal trigerButton={trigerButton} renderForm={renderForm} />;
};
export default CustumModal;
