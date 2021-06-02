import React, {useState} from 'react';
import {View, TextInput, Button, SafeAreaView} from 'react-native';
import useProfile from '../Hooks/useProfile';
import {styles} from '../styles/default';

const Profile = ({navigation}) => {
  const {loading, user, error, dispatch, updateProfile} = useProfile();
  console.log('profile rendred');
  /// default value must be null so that the props defaultValue works
  const [email, setEmail] = useState(null);
  const [age, setAge] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [nickName, setNickName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);

  return (
    <SafeAreaView>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={val => setFullName(val)}
          value={fullName}
          defaultValue={user?.fullName}
          placeholder="place holder"
        />
        <TextInput
          style={styles.input}
          onChangeText={val => setNickName(val)}
          value={nickName}
          defaultValue={user?.nickName}
          placeholder="NickName "
        />
        <TextInput
          style={styles.input}
          onChangeText={val => setAge(val)}
          value={age}
          defaultValue={user?.age}
          placeholder="Age "
        />
        <TextInput
          style={styles.input}
          onChangeText={val => setPhoneNumber(val)}
          value={phoneNumber}
          defaultValue={user?.phoneNumber}
          placeholder="PhoneNumber "
        />
        <TextInput
          style={styles.input}
          onChangeText={val => setEmail(val)}
          value={email}
          defaultValue={user?.email}
          placeholder="Email "
        />

        <Button
          title="update Profile"
          onPress={() => {
            updateProfile({
              email: email ? email : user.email,
              age: age ? age : user.age,
              fullName: fullName ? fullName : user.fullName,
              nickName: nickName ? nickName : user.nickName,
              phoneNumber: phoneNumber ? phoneNumber : user.phoneNumber,
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
