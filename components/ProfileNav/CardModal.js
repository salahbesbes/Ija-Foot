import React, {useContext} from 'react';
import {useTheme, Button, Card} from 'react-native-paper';
import {Paragraph, Title} from 'react-native-paper';
import {useFriends} from '../../hooks/useFriends';
import {AppStateContext} from '../../stateProvider';
import {useInvitaion} from '../../hooks/useInvitation';
import {useAdmin} from '../../hooks/useAdmin';

const CardModal = ({friend, isMember}) => {
  const {mv, colors} = useTheme();

  const {authContext, teamContext, matchContext} = useContext(AppStateContext);
  const [userState, userDispatch] = authContext;
  const [teamState, teamDispatch] = teamContext;
  const [matchState, matchDispatch] = matchContext;
  const {deletFriend, loading, user, addFriend} = useFriends({
    userState,
    userDispatch,
  });
  const {kickPlayer, givePrivilege} = useAdmin({
    teamState,
    teamDispatch,
  });
  const {inviteplayer, team} = useInvitaion({
    teamState,
    teamDispatch,
    matchState,
    matchDispatch,
  });
  return (
    <Card style={[mv]}>
      <Card.Title
        title={`${friend?.nickName}`}
        subtitle={friend?.age && `${friend?.age} ans`}
      />
      <Card.Content style={{alignItems: 'center'}}>
        {friend?.availabilityData && (
          <>
            <Title>{friend?.availabilityData?.location}</Title>
            <Paragraph>{friend?.description}</Paragraph>
          </>
        )}
        <Button
          style={[mv]}
          uppercase
          mode="outlined"
          loading={loading}
          labelStyle={{fontWeight: 'bold', fontSize: 13}}
          icon="person-add"
          onPress={() => {
            isMember ? addFriend(friend) : inviteplayer(friend);
          }}>
          {isMember ? 'add Friend' : 'invite To My team'}
        </Button>
        {team.admins.includes(user.uid) && isMember ? (
          <>
            <Button
              labelStyle={{
                fontWeight: 'bold',
                fontSize: 13,
              }}
              color={colors.backdrop}
              style={[mv]}
              mode="outlined"
              onPress={() => givePrivilege(friend.uid)}>
              Give Privileges
            </Button>

            <Button
              style={[mv]}
              uppercase
              color={colors.notification}
              mode="outlined"
              loading={loading}
              labelStyle={{
                fontWeight: 'bold',
                fontSize: 13,
              }}
              icon="person-remove"
              onPress={() => {
                kickPlayer(friend.uid);
              }}>
              kick Player
            </Button>
          </>
        ) : (
          !isMember && (
            <Button
              style={[mv, {backgroundColor: colors.notification}]}
              uppercase
              mode="outlined"
              loading={loading}
              labelStyle={{
                fontWeight: 'bold',
                fontSize: 13,
              }}
              icon="person-remove"
              onPress={() => {
                deletFriend(friend.uid);
              }}>
              remove friend
            </Button>
          )
        )}
      </Card.Content>
    </Card>
  );
};
export default CardModal;
