import React, {useContext, useEffect, useLayoutEffect} from 'react';
import {Button, Image, StyleSheet, View, Pressable} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import db from '@react-native-firebase/firestore';

import PlayersFeed from './PlayersFeed';
import TeamsFeed from './TeamsFeed';
import {AppStateContext} from '../stateProvider';
import FindMatchModal from '../components/FindMatchModal';
import CreateTeamModal from '../components/team/CreateTeamModal';
import {Avatar, IconButton} from 'react-native-paper';
import {teamActions} from '../stateManager/actions/team-A';
import {useCreateMatch} from '../hooks/useCreateMatch';
import {matchActions} from '../stateManager/actions/match-A';
import {actionCreators} from '../stateManager/actions/auth-A';
import {useHomeListner} from '../hooks/useHomeListners';

const FeedTab = createMaterialTopTabNavigator();

const HomeScreen = ({navigation}) => {
  const {match, user} = useHomeListner();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() =>
            navigation.navigate('ProfileNavigation', {nbColum: 2})
          }>
          <Avatar.Image
            style={{marginRight: 5}}
            source={{uri: user.avatar}}
            size={50}
          />
        </Pressable>
      ),
    });
  }, []);
  // console.log('team :>> ', team);
  // console.log('user :>> ', user);
  // const {createMatch} = useCreateMatch();
  console.log('home match.members', match.members.length);
  return (
    <>
      <FeedTab.Navigator>
        <FeedTab.Screen name="PlayersFeed" component={PlayersFeed} />
        <FeedTab.Screen name="TeamsFeed" component={TeamsFeed} />
      </FeedTab.Navigator>
      <View style={styles.bottomBar}>
        <FindMatchModal />
        <CreateTeamModal navigation={navigation} />
        {/* <CreateTeam navigation={navigation} /> */}
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate('Match');
          }}>
          <View>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={require('../assets/icons/icons8-stadium-100.png')}
            />
          </View>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 65,
    elevation: 5,
    backgroundColor: '#22A826',
    marginBottom: 15,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 25,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 3.5,
    //bottom: -15,
    //elevation: 5,
  },
  button: {
    height: 60,
    width: 60,
    borderRadius: 20,
    backgroundColor: '#23A727',
    elevation: 5,
  },
  image: {width: 60, height: 60},

  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default HomeScreen;
