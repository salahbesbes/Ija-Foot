import React from 'react';
import {Button, Card, Title, Paragraph} from 'react-native-paper';

const TeamCard = ({item, useCreateData}) => {
  const teamCard = {uid: item.id, ...item.data()};
  const {createMatch, team} = useCreateData;
  return (
    <Card style={{marginVertical: 10}}>
      <Card.Title
        title={`${teamCard?.teamName}`}
        subtitle={teamCard.location}
      />
      {teamCard?.date && (
        <Card.Content>
          <Title>{teamCard?.date?.toDate()?.toLocaleString()}</Title>
          <Paragraph>{teamCard?.description}</Paragraph>
        </Card.Content>
      )}
      <Card.Actions style={{justifyContent: 'space-around'}}>
        <Button
          mode="outlined"
          onPress={() => {
            createMatch({teamA: team.uid, teamB: teamCard.uid});
          }}>
          invite Team
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default TeamCard;
