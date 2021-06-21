import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import FriendList from '../components/ProfileNav/FriendList';
import Profile from '../components/ProfileNav/Profile';
import {useFriends} from '../hooks/useFriends';
import {AppStateContext} from '../stateProvider';
import SignOutButton from '../components/SignOutButton';

const Tab = createBottomTabNavigator();

function MyTabBar({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={label}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.button]}>
            <Text
              style={[
                styles.textStyle,
                {
                  color: isFocused ? 'white' : '#22A826',
                },
              ]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const ProfileNavigation = ({navigation, route}) => {
  // this route take argument 'nbColumn'
  const {nbColumn} = route.params;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <SignOutButton />,
    });
  }, [navigation]);
  const {size, horizental} = useTheme();

  const {authContext} = useContext(AppStateContext);
  const [userState, userDispatch] = authContext;
  const {userFriends} = useFriends({userState, userDispatch});

  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Profile">
        {props => <Profile navigation={navigation} {...props} />}
      </Tab.Screen>
      <Tab.Screen name="Friends">
        {props => (
          <FriendList
            nbColumn={nbColumn}
            horizental={horizental}
            size={size}
            listToRender={userFriends}
            {...props}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
export default ProfileNavigation;

const styles = StyleSheet.create({
  textStyle: {fontSize: 15, fontWeight: 'bold'},
  button: {
    borderRightWidth: 1,
    borderColor: 'grey',
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#286D11',
  },
});
