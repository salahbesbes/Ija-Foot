import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, Text, View, SafeAreaView} from 'react-native';
import {
  Avatar,
  Button,
  Caption,
  Headline,
  Subheading,
  TextInput,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import GoogleButton from '../components/GoogleButton';
import SignOutButton from '../components/SignOutButton';
import useSignIn from '../hooks/useSignIn';
import {actionCreators} from '../stateManager/actions/auth-A';

const SignIn = ({navigation}) => {
  const {mv, bigTitle, raisedInput, textButton, row, firstElement} = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {loading, user, error, dispatch, signIn} = useSignIn();
  const [visible, setVisible] = useState(false);

  return (
    <SafeAreaView>
      <ScrollView style={{}}>
        <View style={{alignItems: 'center'}}>
          <Avatar.Text size={200} label="XD" />
          <Headline style={[bigTitle]}>Welcome To " Ija-Foot "</Headline>
          <Subheading style={{color: 'grey'}}> SignIn to Continue </Subheading>
          <TextInput
            style={[raisedInput, mv, firstElement]}
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
            right={
              password && (
                <TextInput.Icon
                  name="eye"
                  onPress={() => setVisible(!visible)}
                />
              )
            }
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
