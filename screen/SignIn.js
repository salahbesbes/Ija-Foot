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
  const [email, setEmail] = useState('salah@gmail.com');
  const [password, setPassword] = useState('123456');
  const {loading, error, dispatch, signIn} = useSignIn();

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={[{alignItems: 'center'}, mv]}>
          <Avatar.Image
            style={{elevation: 30}}
            size={200}
            source={require('../assets/images/logo.jpg')}
          />
          <Headline style={[bigTitle]}>Welcome To " Ija-Foot "</Headline>
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
              navigation.navigate('LoadingScreen');
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
