import React, {useEffect, useLayoutEffect, useRef} from 'react';
import {Image, StyleSheet, View, Pressable} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Avatar} from 'react-native-paper';

import PlayersFeed from './PlayersFeed';
import TeamsFeed from './TeamsFeed';
import FindMatchModal from '../components/FindMatchModal';
import CreateTeamModal from '../components/team/CreateTeamModal';
import {useHomeListner} from '../hooks/useHomeListners';
const FeedTab = createMaterialTopTabNavigator();

const HomeScreen = ({navigation}) => {
  const {match, user, team} = useHomeListner();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() =>
            navigation.navigate('ProfileNavigation', {nbColumn: 2})
          }>
          <Avatar.Image
            style={{marginRight: 5}}
            source={{uri: user.avatar}}
            size={50}
          />
          {/* <SignOutButton /> */}
        </Pressable>
      ),
    });
  }, [user.avatar, navigation]);
  let homeSRender = useRef(0);
  useEffect(() => {
    homeSRender.current += 1;
    console.log({homeScreenRender: homeSRender.current});
    return () => {
      homeSRender.current -= 1;
      console.log({homeScreenRender: homeSRender.current});
    };
  }, []);
  return (
    <>
      <FeedTab.Navigator>
        <FeedTab.Screen
          options={{tabBarLabel: 'Players'}}
          name="PlayersFeed"
          component={PlayersFeed}
        />
        <FeedTab.Screen
          options={{tabBarLabel: 'Teams'}}
          name="TeamsFeed"
          component={TeamsFeed}
        />
      </FeedTab.Navigator>
      <View style={styles.bottomBar}>
        <FindMatchModal />
        <CreateTeamModal navigation={navigation} />
        {/* <CreateTeam navigation={navigation} /> */}
        <Pressable
          style={styles.button}
          onPress={() => {
            match.uid && navigation.navigate('Match');
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
