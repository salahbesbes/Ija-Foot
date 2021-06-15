import React, {useContext, useState} from 'react';
import {
  Button,
  Card,
  Title,
  Paragraph,
  IconButton,
  Portal,
  Dialog,
  useTheme,
} from 'react-native-paper';
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
        {playerCard?.availabilityData && (
          <Card.Content>
            <Title>{playerCard?.availabilityData?.location}</Title>
            <Paragraph>{playerCard?.description}</Paragraph>
          </Card.Content>
        )}
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
