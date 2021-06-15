import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {Avatar, Button, TextInput, useTheme} from 'react-native-paper';
import useProfile from '../../hooks/useProfile';
import {actionCreators} from '../../stateManager/actions/auth-A';
import SignOutButton from '../SignOutButton';

const Profile = ({navigation}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <SignOutButton />,
    });
  }, [navigation]);
  const {submitButton, textButton, mv, raisedInput} = useTheme();
  const [age, setAge] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [nickName, setNickName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const {user, loading, error, updateProfile, userDispatch, selectFile} =
    useProfile();

  // useEffect(() => {
  //   setAge(user.age);
  //   setFullName(user.fullName);
  //   setNickName(user.nickName);
  //   setPhoneNumber(user.phoneNumber);
  //   return true;
  // }, [user.age, user.fullName, user.nickName, user.phoneNumber, selectFile]);
  const [file, setFile] = useState(null);
  return (
    <ScrollView style={{}}>
      <View style={{height: 110}} />
      <View style={styles.container}>
        <Avatar.Image
          source={{uri: user.avatar}}
          style={[styles.posAbsolute]}
          size={200}
        />

        <TouchableOpacity
          onPress={() => {
            selectFile(setFile);
          }}
          style={styles.pressable}
        />

        <View style={[styles.floating, styles.posRelative]}>
          <TextInput
            left={<TextInput.Icon name="person" disabled />}
            onFocus={() => {
              userDispatch(actionCreators.reset());
            }}
            style={[styles.input, raisedInput, mv]}
            onChangeText={val => setFullName(val)}
            value={fullName}
            placeholder="full Name"
            mode="outlined"
            label={error}
            error={error}
          />
          <TextInput
            left={<TextInput.Icon name="portrait" disabled />}
            onFocus={() => {
              userDispatch(actionCreators.reset());
            }}
            style={[styles.input, raisedInput, mv]}
            onChangeText={val => setNickName(val)}
            value={nickName}
            placeholder="NickName "
            mode="outlined"
            label={error}
            error={error}
          />
          <TextInput
            left={<TextInput.Icon name="info" disabled />}
            onFocus={() => {
              userDispatch(actionCreators.reset());
            }}
            style={[styles.input, raisedInput, mv]}
            onChangeText={val => setAge(val)}
            value={age}
            placeholder="Age "
            mode="outlined"
            label={error}
            error={error}
          />
          <TextInput
            left={<TextInput.Icon name="smartphone" disabled />}
            onFocus={() => {
              userDispatch(actionCreators.reset());
            }}
            style={[styles.input, raisedInput, mv]}
            onChangeText={val => setPhoneNumber(val)}
            value={phoneNumber}
            placeholder="PhoneNumber "
            mode="outlined"
            label={error}
            error={error}
          />

          <Button
            style={submitButton}
            loading={loading}
            labelStyle={textButton}
            mode="contained"
            icon="send"
            onPress={() => {
              console.log('file :>> ', file);
              updateProfile(
                {
                  age: age || '',
                  fullName: fullName || '',
                  nickName: nickName || '',
                  phoneNumber: phoneNumber || '',
                  avatar: user?.avatar,
                },
                file,
              );
              // setFileObj(null);
            }}>
            update Profile
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  pressable: {
    zIndex: 5,
    height: 200,
    width: 200,
    borderRadius: 100,
    position: 'absolute',
    top: -100,
    right: Dimensions.get('screen').width / 2 - 105,
    elevation: 10,
    backgroundColor: 'grey',
    opacity: 0.1,
  },
  input: {
    width: '100%',
    marginHorizontal: 30,
  },
  posRelative: {
    width: '100%',
    position: 'relative',
    top: 0,
    left: 0,
  },
  posAbsolute: {
    // height: 200,
    // width: 200,
    borderRadius: 100,
    position: 'absolute',
    top: -100,
    right: Dimensions.get('screen').width / 2 - 105,
    elevation: 10,
    backgroundColor: 'yellow',
  },
  floating: {
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 30,
    paddingTop: 120,
  },
});
