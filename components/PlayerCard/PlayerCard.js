import React, {useContext, useState} from 'react';
import {
  Button,
  Card,
  Title,
  Checkbox,
  Paragraph,
  IconButton,
  Portal,
  Dialog,
  useTheme,
  Text,
} from 'react-native-paper';
import {View} from 'react-native';
import {useAdmin} from '../../hooks/useAdmin';
import {useFriends} from '../../hooks/useFriends';
import {useInvitaion} from '../../hooks/useInvitation';
import {AppStateContext} from '../../stateProvider';
import {TouchableOpacity, Image} from 'react-native';

const Avatar = ({playerCard}) => {
  return (
    <TouchableOpacity
      style={{marginVertical: 5, padding: 10, alignItems: 'center'}}>
      <Image
        style={{height: 50, width: 50, borderRadius: 50}}
        source={{uri: playerCard?.avatar}}
      />
    </TouchableOpacity>
  );
};
const PlayerCard = ({item}) => {
  const playerCard = {uid: item.id, ...item.data()};

  const {matchContext, teamContext, authContext} = useContext(AppStateContext);
  const [teamState, teamDispatch] = teamContext;
  const [matchState, matchDispatch] = matchContext;
  const [userState, userDispatch] = authContext;

  const {team, inviteplayer} = useInvitaion({
    teamState,
    teamDispatch,
    matchState,
    matchDispatch,
  });
  const {addFriend, user} = useFriends({userState, userDispatch});
  const {kickPlayer, givePrivilege} = useAdmin({teamState, teamDispatch});

  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const {mv, colors} = useTheme();

  return (
    <>
      <Card style={[mv]}>
        <Card.Title
          title={`${playerCard?.nickName}`}
          subtitle={playerCard?.age}
          right={props => (
            <IconButton {...props} icon="more-vert" onPress={showDialog} />
          )}
          left={() => <Avatar playerCard={playerCard} />}
        />

        <Card.Content>
          <Paragraph>
            {`location : ${
              playerCard?.availabilityData?.location
                ? playerCard?.availabilityData?.location
                : '...'
            }`}
          </Paragraph>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>motorized:</Text>
            <Checkbox
              disabled
              status={
                playerCard?.availabilityData?.motorized
                  ? 'checked'
                  : 'unchecked'
              }
            />
          </View>
          <Text>
            {`description : ${
              playerCard?.availabilityData?.description
                ? playerCard?.availabilityData?.description
                : '...'
            }`}
          </Text>
        </Card.Content>
      </Card>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Button
              style={[mv]}
              mode="outlined"
              onPress={() => addFriend(playerCard)}>
              add Friend
            </Button>
            {team.uid && (
              <Button
                style={[mv]}
                mode="outlined"
                onPress={() => inviteplayer(playerCard)}>
                invite to My Team
              </Button>
            )}
          </Dialog.Content>
        </Dialog>
      </Portal>
    </>
  );
};

export default PlayerCard;
