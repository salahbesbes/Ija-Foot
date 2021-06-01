import React, {useState} from 'react';
import {View, TextInput, Button, SafeAreaView, Text} from 'react-native';
import {actionCreators} from '../stateManager/actions/auth-A';
import {styles} from '../styles/default';

const Profile = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [fullName, setFullName] = useState('');
  const [nickName, setNickName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <SafeAreaView>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setFullName}
          value={fullName}
          placeholder="FullName "
        />
        <TextInput
          style={styles.input}
          onChangeText={setNickName}
          value={nickName}
          placeholder="NickName "
        />
        <TextInput
          style={styles.input}
          onChangeText={setAge}
          value={age}
          placeholder="Age "
        />
        <TextInput
          style={styles.input}
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          placeholder="PhoneNumber "
        />
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email "
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password "
        />
        <Button
          title="Sign Up"
          onPress={() => {
            setEmail('');
            setPassword('');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
