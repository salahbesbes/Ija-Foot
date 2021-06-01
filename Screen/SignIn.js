import React, {useState} from 'react';
import {View, TextInput, Button, SafeAreaView, Text} from 'react-native';
import useSignIn from '../Hooks/useSignIn';
import {actionCreators} from '../stateManager/actions/auth-A';
import {styles} from '../styles/default';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {loading, user, error, dispatch, signIn} = useSignIn();
  return loading ? (
    <>
      <Text style={{backgroundColor: 'yellow', marginTop: 30}}>
        Loading .................
      </Text>
      <Button
        title="reset state"
        color="orange"
        onPress={() => {
          dispatch(actionCreators.failure());
        }}
      />
    </>
  ) : (
    <SafeAreaView>
      {!user ? (
        <View>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="email "
          />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="password "
          />
          <Button
            title="Login"
            onPress={() => {
              signIn({email, password});
              setEmail('');
              setPassword('');
            }}
          />
          <Button
            title="Go Sign Up"
            color="grey"
            onPress={() => {
              dispatch(actionCreators.reset());
              navigation.push('SignUp');
            }}
          />
        </View>
      ) : (
        <>
          <Button
            title="delete user from state"
            onPress={() => dispatch(actionCreators.failure())}
          />
          <Button
            title="lotOut"
            color="grey"
            onPress={() => {
              dispatch(actionCreators.lotOut());
              navigation.push('SignUp');
            }}
          />
        </>
      )}
      {error && (
        <Text style={{backgroundColor: 'red', margin: 50, height: 80}}>
          {error}
        </Text>
      )}
    </SafeAreaView>
  );
};

export default SignIn;
