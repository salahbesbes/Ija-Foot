import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, Text, View, SafeAreaView} from 'react-native';
import {
  Avatar,
  Button,
  Caption,
  FAB,
  Headline,
  Subheading,
  TextInput,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import useSignUp from '../hooks/useSignUp';
import {actionCreators} from '../stateManager/actions/auth-A';
import {styles} from '../styles/default';

const SignUp = ({navigation}) => {
  const {
    width,
    height,
    mv,
    bigTitle,
    raisedInput,
    textButton,
    row,
    firstElement,
  } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickName, setNickName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const {loading, user, error, dispatch, signUp} = useSignUp();
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <Headline style={[bigTitle, firstElement]}>
          Welcome To " Ija-Foot "
        </Headline>
        <Subheading style={{color: 'grey'}}> Create New Account </Subheading>
        <TextInput
          style={[raisedInput, mv, firstElement]}
          onFocus={() => {
            dispatch(actionCreators.reset());
          }}
          label={error ? 'some Error occured' : 'nickName'}
          value={nickName}
          mode="flat"
          error={error}
          onChangeText={setNickName}
          left={<TextInput.Icon name="account-circle" disabled />}
        />
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
          right={
            password && (
              <TextInput.Icon name="eye" onPress={() => setVisible(!visible)} />
            )
          }
        />
        <TextInput
          left={<TextInput.Icon name="lock" disabled />}
          style={[raisedInput, mv]}
          onFocus={() => {
            dispatch(actionCreators.reset());
          }}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          secureTextEntry
          confirmPasswordRules='required: upper; required: lower; required: digit; minlength: 6;"'
          textContentType="password"
          mode="flat"
          error={error}
          label={error ? 'some Error occured' : 'confirm Password'}
        />
        <Button
          style={[mv]}
          uppercase
          mode="contained"
          loading={loading}
          labelStyle={[textButton]}
          icon="fingerprint"
          onPress={() => {
            // signUp({email, password});
            // navigation.nabigate('')
          }}>
          SignUp
        </Button>
        <View style={[row, {marginTop: 20}]}>
          <Caption style={{fontSize: 15, color: 'grey'}}>
            Already have account
          </Caption>
          <Pressable
            onPress={() => {
              navigation.navigate('SignIn');
            }}>
            <Caption style={{fontSize: 15, color: '#2192A8'}}> LogIn </Caption>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
