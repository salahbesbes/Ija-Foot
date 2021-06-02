import React, {useState} from 'react';
import {View, TextInput, Button, SafeAreaView, Text} from 'react-native';
import GoogleButton from '../components/GoogleButton';
import SignOutButton from '../components/SignOutButton';
import useSignIn from '../hooks/useSignIn';
import {actionCreators} from '../stateManager/actions/auth-A';
import {styles} from '../styles/default';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {loading, user, error, dispatch, signIn} = useSignIn();
  return (
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
            placeholder="password"
          />
          <Button
            title="Login"
            onPress={async () => {
              await signIn({email, password});
              /* navigation.navigate('Home'); */
            }}
          />
          <GoogleButton nav={navigation} />
          <Button
            title="Go Sign Up"
            color="grey"
            onPress={async () => {
              dispatch(actionCreators.reset());
              /* navigation.push('SignUp'); */
            }}
          />
          {loading ? (
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
          ) : null}
        </View>
      ) : (
        <>
          <Button
            title="delete user from state"
            onPress={() => dispatch(actionCreators.logOut())}
          />
          <SignOutButton nav={navigation} />
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
