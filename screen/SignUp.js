import React, {useState} from 'react';
import {View, TextInput, Button, SafeAreaView, Text} from 'react-native';
import useSignUp from '../hooks/useSignUp';
import {actionCreators} from '../stateManager/actions/auth-A';
import {styles} from '../styles/default';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {loading, user, error, dispatch, signUp} = useSignUp();
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
            title="Sign Up"
            onPress={async () => {
              await signUp({email, password});
              /* navigation.navigate('Home'); */
            }}
          />
        </View>
      ) : (
        <>
          <Button
            title="delete user from state"
            onPress={() => dispatch(actionCreators.failure())}
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

export default SignUp;
