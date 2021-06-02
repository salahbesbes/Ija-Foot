import React from 'react';
import {Button, Text, View} from 'react-native';
import SignOutButton from '../components/SignOutButton';
export default function Home({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: 'lightred'}}>
      <Text style={{marginHorizontal: 30}}> this is Home Page </Text>

      <Button
        title="go to Profile"
        onPress={async () => {
          navigation.navigate('Profile');
        }}
      />
      <SignOutButton nav={navigation} />
    </View>
  );
}
