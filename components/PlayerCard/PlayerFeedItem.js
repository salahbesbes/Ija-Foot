import React from 'react';
import {useInvitaion} from '../../hooks/useInvitation';

import Card from '../Card';
import CardContent from './PlayerCardContent';

const PlayerItem = ({item, useInviData, useAdminData}) => {
  const player = {...item.data(), uid: item.id};

  return (
    <Card>
      <CardContent
        player={player}
        useInviData={useInviData}
        useAdminData={useAdminData}
      />
    </Card>
  );
};

export default PlayerItem;
