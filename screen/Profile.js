import React, {useEffect, useState} from 'react';
import {View, TextInput, Button, SafeAreaView, Text} from 'react-native';
import Avatar from '../components/Avatar';
import UploadFile from '../components/UploadFile';
import useProfile from '../hooks/useProfile';
import {useUploadFile} from '../hooks/useUpload';
import {styles} from '../styles/default';

const Profile = ({navigation}) => {
  const {user, error, updateProfile, userDispatch} = useProfile();
  const [age, setAge] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [nickName, setNickName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [fileObj, setFileObj] = useState(null);

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
          onPress={async () => {
            updateProfile(
              {
                age: age || '',
                fullName: fullName || '',
                nickName: nickName || '',
                phoneNumber: phoneNumber || '',
                avatar: user?.avatar,
              },
              fileObj,
            );
            setFileObj(null);
          }}
        />
      </View>
      <UploadFile
        user={user}
        setFileObj={setFileObj}
        userDispatch={userDispatch}
      />
      <Avatar navigation={navigation} />
      {/* <TestUpload /> */}
      {error && (
        <Text style={{backgroundColor: 'red', margin: 50, height: 80}}>
          {error}
        </Text>
      )}
    </SafeAreaView>
  );
};

export default Profile;
