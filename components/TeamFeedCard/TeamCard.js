import React from 'react';
import {Button, Card, Title, Paragraph} from 'react-native-paper';
import {useCreateMatch} from '../../hooks/useCreateMatch';
const TeamCard = ({item}) => {
  const teamCard = {uid: item.id, ...item.data()};

  const {createMatch, team, match} = useCreateMatch();

  return (
    <Card style={{marginVertical: 10}}>
      <Card.Title
        title={`${teamCard?.teamName}`}
        subtitle={`${teamCard?.location ? teamCard?.location : ' '}`}
      />
      <Card.Content>
        <Paragraph>
          {teamCard?.date?.toDate()?.toLocaleString()
            ? teamCard?.date?.toDate()?.toLocaleString()
            : 'no Date Selected'}
        </Paragraph>
        <Paragraph>{teamCard?.description}</Paragraph>
      </Card.Content>
      <Card.Actions style={{justifyContent: 'space-around'}}>
        {!match.uid && (
          <Button
            mode="outlined"
            onPress={() => {
              createMatch({teamA: team.uid, teamB: teamCard.uid});
            }}>
            invite Team
          </Button>
        )}
      </Card.Actions>
    </Card>
  );
};

export default TeamCard;
