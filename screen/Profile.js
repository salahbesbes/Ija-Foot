import React, {useEffect, useState} from 'react';
import {View, TextInput, Button, SafeAreaView} from 'react-native';
import useProfile from '../hooks/useProfile';
import {styles} from '../styles/default';

const Profile = ({navigation}) => {
  const {user, updateProfile} = useProfile();
  console.log('profile rendred');
  /// default value must be null so that the props defaultValue works
  const [age, setAge] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [nickName, setNickName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  useEffect(() => {
    setAge(user.age);
    setFullName(user.fullName);
    setNickName(user.nickName);
    setPhoneNumber(user.phoneNumber);
  }, [user]);
  return (
    <SafeAreaView>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={val => setFullName(val)}
          value={fullName}
          placeholder="full Name"
        />
        <TextInput
          style={styles.input}
          onChangeText={val => setNickName(val)}
          value={nickName}
          placeholder="NickName "
        />
        <TextInput
          style={styles.input}
          onChangeText={val => setAge(val)}
          value={age}
          placeholder="Age "
        />
        <TextInput
          style={styles.input}
          onChangeText={val => setPhoneNumber(val)}
          value={phoneNumber}
          placeholder="PhoneNumber "
        />

        <Button
          title="update Profile"
          onPress={() => {
            updateProfile({
              age: age || '',
              fullName: fullName || '',
              nickName: nickName || '',
              phoneNumber: phoneNumber || '',
              uid: user.uid || '',
            });
          }}
        />
        <Button
          title="go Home"
          onPress={() => {
            navigation.navigate('Home');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
