import React, {useContext} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppStateContext} from '../stateProvider';

const Avatar = ({navigation, imageUri}) => {
  const {authContext} = useContext(AppStateContext);
  const [state, dispatch] = authContext;
  const {user} = state;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.avatar}
        onPress={() => {
          navigation.navigate('Profile');
        }}>
        {user?.avatar ? (
          <Image
            style={styles.tinyLogo}
            source={{
              uri: imageUri ? imageUri : user.avatar,
            }}
          />
        ) : (
          <Image
            style={styles.tinyLogo}
            source={require('../assets/images/default.png')}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  avatar: {
    backgroundColor: 'orange',
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
export default Avatar;
