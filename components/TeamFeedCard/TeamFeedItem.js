import React from 'react';

import Card from '../Card';
import CardContent from './TeamCardContent';

const TeamItem = ({item}) => {
  const player = item.data();

  return (
    <Card>
      <CardContent playerData={player.availabilityData} />
    </Card>
  );
};

export default TeamItem;
