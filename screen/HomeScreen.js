import * as React from 'react';
import {Button, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import PlayersFeed from './PlayersFeed';
import TeamsFeed from './TeamsFeed';
import SignOutButton from '../components/SignOutButton';
import GoogleButton from '../components/GoogleButton';

const FeedTab = createMaterialTopTabNavigator();

const HomeScreen = ({navigation}) => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          height: 60,
          backgroundColor: 'magenta',
        }}>
        <SignOutButton />
        <Button
          title="go to Profile"
          onPress={() => {
            navigation.navigate('Profile');
          }}
        />
        <GoogleButton nav={navigation} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          height: 60,
          backgroundColor: 'magenta',
        }}>
        <Button
          title="InviteFriend"
          onPress={() => {
            navigation.navigate('InviteFriend');
          }}
        />
      </View>
      <FeedTab.Navigator>
        <FeedTab.Screen name="PlayersFeed" component={PlayersFeed} />
        <FeedTab.Screen name="TeamsFeed" component={TeamsFeed} />
      </FeedTab.Navigator>
      <View
        style={{
          flexDirection: 'row',
          height: 65,
          padding: 5,
        }}>
        <Button
          title="go FindMatch"
          onPress={() => navigation.navigate('LookingForMatch')}
        />
        <Button
          title="go to MyTeam"
          onPress={() => navigation.navigate('MyTeam')}
        />
        <Button
          title="go to Match"
          onPress={() => navigation.navigate('Match')}
        />
      </View>
    </>
  );
};

export default HomeScreen;
