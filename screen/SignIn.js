import React, {useState} from 'react';
import {Pressable, ScrollView, View, SafeAreaView} from 'react-native';
import {
  Avatar,
  Button,
  Caption,
  Headline,
  Subheading,
  TextInput,
  useTheme,
} from 'react-native-paper';
import GoogleButton from '../components/GoogleButton';
import useSignIn from '../hooks/useSignIn';
import {actionCreators} from '../stateManager/actions/auth-A';

const SignIn = ({navigation}) => {
  const {mv, bigTitle, raisedInput, textButton, row} = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {loading, error, dispatch, signIn} = useSignIn();

  return (
    <SafeAreaView>
      <ScrollView>
<<<<<<< HEAD
        <View style={{alignItems: 'center', marginTop: 10}}>
          <Avatar.Image
            style={{elevation: 20}}
            size={200}
            source={require('../assets/images/logo.jpg')}
          />
          <Headline style={[bigTitle, mv]}>Welcome To IJA-FOOT</Headline>
=======
        <View style={[{alignItems: 'center'}, mv]}>
          <Avatar.Image
            style={{elevation: 30}}
            size={200}
            source={require('../assets/images/logo.jpg')}
          />
          <Headline style={[bigTitle]}>Welcome To " Ija-Foot "</Headline>
>>>>>>> 05016920843570c3b042f477ede5411f7030bec5
          <Subheading style={{color: 'grey'}}> SignIn to Continue </Subheading>
          <TextInput
            style={[raisedInput, mv]}
            onFocus={() => {
              dispatch(actionCreators.reset());
            }}
            label={error ? 'some Error occured' : 'Email'}
            value={email}
            mode="flat"
            error={error}
            onChangeText={setEmail}
            left={<TextInput.Icon name="email" disabled />}
          />
          <TextInput
            left={<TextInput.Icon name="lock" disabled />}
            style={[raisedInput, mv]}
            onFocus={() => {
              dispatch(actionCreators.reset());
            }}
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            passwordRules='required: upper; required: lower; required: digit; minlength: 6;"'
            textContentType="password"
            mode="flat"
            error={error}
            label={error ? 'some Error occured' : 'password'}
          />
          <Button
            style={[mv]}
            uppercase
            mode="contained"
            loading={loading}
            labelStyle={[textButton]}
            icon="login"
            onPress={async () => {
              await signIn({email, password});
            }}>
            LogIn
          </Button>
          <GoogleButton />
          <View style={[row]}>
            <Caption style={{fontSize: 15, color: 'grey'}}>
              dont have Account?{' '}
            </Caption>
            <Pressable
              onPress={() => {
                navigation.navigate('SignUp');
              }}>
              <Caption style={{fontSize: 15, color: '#2192A8'}}>
                create New Account
              </Caption>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
