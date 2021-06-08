import React from 'react';

import Card from '../Card';
import CardContent from './PlayerCardContent';

const PlayerItem = ({item}) => {
  const player = item.data();

  return (
    <Card>
      <CardContent playerData={player.availabilityData} />
    </Card>
  );
};

export default PlayerItem;
