import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  View,
  Button,
} from 'react-native';
import {useAdmin} from '../hooks/useAdmin';
import {AppStateContext} from '../stateProvider';

const TeamsFeed = () => {
  const {authContext, teamContext} = useContext(AppStateContext);
  const [authState, userDispatch] = authContext;
  const [teamState, teamDispatch] = teamContext;
  const {team} = teamState;
  const {user} = authState;
  const [members, setmembers] = useState([]);
  const [admins, setadmins] = useState([]);
  const {kickPlayer, givePrivilege} = useAdmin();
  useEffect(() => {
    setmembers(team.members);
    setadmins(team.admins);
  }, [team]);
  return (
    <>
      {/* <FlatList
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => {}}>
              <View
                style={{
                  marginVertical: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <Text> {item.uid} </Text>
                <Button
                  title="- M"
                  onPress={() => {
                    kickPlayer(item.uid);
                  }}
                />
                <Button
                  title="+ A"
                  onPress={() => {
                    givePrivilege(item.uid);
                  }}
                />
              </View>
            </TouchableOpacity>
          );
        }}
        data={members}
        keyExtractor={item => item.uid}
      /> */}

      {/* <FlatList
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => {}}>
              <View
                style={{
                  marginVertical: 10,
                  backgroundColor: 'grey',
                  opacity: 0.3,
                }}>
                <Text> {item} </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        data={admins}
        // keyExtractor={}
      /> */}
    </>
  );
};

export default TeamsFeed;
