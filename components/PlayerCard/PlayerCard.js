import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
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

const PlayerCard = ({item, useInvitaionData, useFriendData}) => {
  const playerCard = {uid: item.id, ...item.data()};
  const {team, user, match, inviteplayer} = useInvitaionData;
  const {addFriend} = useFriendData;

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const {mv, colors} = useTheme();
  return (
    <>
      <Card style={{marginVertical: 10}}>
        <Card.Title
          title={`${playerCard?.nickName}`}
          subtitle={playerCard?.age}
          right={props => (
            <IconButton {...props} icon="more-vert" onPress={showDialog} />
          )}
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
            <Button style={[mv]} mode="outlined" onPress={() => {}}>
              invite Friend
            </Button>
            {team.uid && (
              <Button style={[mv]} mode="outlined" onPress={() => {}}>
                invite to My Team
              </Button>
            )}

            {team.admins.includes(user.uid) && (
              <>
                <Button
                  color={colors.backdrop}
                  style={[mv]}
                  mode="outlined"
                  onPress={() => {}}>
                  Give Privileges
                </Button>
                <Button
                  color={colors.notification}
                  style={[mv]}
                  mode="outlined"
                  onPress={() => {}}>
                  kickPlayer
                </Button>
              </>
            )}
          </Dialog.Content>
        </Dialog>
      </Portal>
    </>
  );
};
const styles = StyleSheet.create({});
export default PlayerCard;
