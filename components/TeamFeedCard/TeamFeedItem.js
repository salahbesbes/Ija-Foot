import React from 'react';
import {useCreateMatch} from '../../hooks/useCreateMatch';

import Card from '../Card';
import CardContent from './TeamCardContent';

const TeamItem = ({item}) => {
  const teamCard = {...item.data(), uid: item.id};
  const useCreateDAta = useCreateMatch();

  return (
    <Card>
      <CardContent teamCard={teamCard} useCreateDAta={useCreateDAta} />
    </Card>
  );
};

export default TeamItem;
