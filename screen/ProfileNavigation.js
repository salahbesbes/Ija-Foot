import React, {useState} from 'react';
import {BottomNavigation, useTheme, Button} from 'react-native-paper';
import {} from 'react-native';
import FriendList from '../components/ProfileNav/FriendList';
import Profile from '../components/ProfileNav/Profile';
import {useFriends} from '../hooks/useFriends';
const ProfileNavigation = ({navigation, route}) => {
  // this route take argument 'nbColumn'
  console.log(route.params);
  const {nbColumn} = route.params;
  const {colors, size, horizental} = useTheme();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'Profile', title: 'Profile', icon: 'face'},
    {key: 'Friends', title: 'Friends', icon: 'groups'},
  ]);
  const {userFriends} = useFriends();
  const renderScene = BottomNavigation.SceneMap({
    Profile: () => <Profile navigation={navigation} />,
    Friends: () => (
      <FriendList
        nbColumn={nbColumn}
        horizental={horizental}
        size={size}
        listToRender={userFriends}
      />
    ),
  });

  return (
    <BottomNavigation
      theme={{colors: {...colors, primary: colors.accent}}}
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default ProfileNavigation;
