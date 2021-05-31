/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Provider} from 'react-redux';
GoogleSignin.configure({
  webClientId:
    '444195064233-krcf2bdeq47uv45u9gsg5vjqfrnl6vo0.apps.googleusercontent.com',
});
const signIn = async (email, password) => {
  // check for undefined or empty string
  if (!email || email === '') email = 'default';
  if (!password || password === '') password = 'default';
  try {
    await auth().signInWithEmailAndPassword(email, password);
    console.log('User account created & signed in!');
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }
    console.error(error);
  }
};
const signUp = async (email, password) => {
  // check for undefined or empty string
  if (!email || email === '') email = 'default';
  if (!password || password === '') password = 'default';
  try {
    await auth().createUserWithEmailAndPassword(email, password);
    console.log('User account created & signed in!');
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }
    console.error(error);
  }
};

const SignOut = async () => {
  try {
    await auth().signOut();
    console.log('User signed out!');
  } catch (error) {
    console.log(error);
  }
};
async function onGoogleButtonPress() {
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
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
          signIn(email, password);
          setEmail('');
          setPassword('');
        }}
      />
    </View>
  );
};

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
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
        title="SignUp"
        onPress={() => {
          signUp(email, password);
          setEmail('');
          setPassword('');
        }}
      />
    </View>
  );
};
const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const subscribe = auth().onAuthStateChanged(res => {
      // we update the user by the new res
      setUser(res);
    });
    return subscribe;
  }, []);
  return (
    <SafeAreaView>
      {user ? (
        <Text> Welcome salahbesbes </Text>
      ) : (
        <View>
          <SignIn />
          <SignUp />
          <Button
            title="Google Sign-In"
            onPress={async () => {
              try {
                await onGoogleButtonPress();
                console.log('Signed in with Google!');
              } catch (error) {
                console.error(error);
              }
            }}
          />
        </View>
      )}
      <Button title="Sign Out" onPress={SignOut} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default () => (
  // <Provider store={store}>
  <App />
  // </Provider>
);
