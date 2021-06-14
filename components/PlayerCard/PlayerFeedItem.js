import React from 'react';
import {useInvitaion} from '../../hooks/useInvitation';

import Card from '../Card';
import CardContent from './PlayerCardContent';

const PlayerItem = ({item, useInviData}) => {
  const player = {...item.data(), uid: item.id};
  const {inviteplayer} = useInviData;
  return (
    <>
      <Card>
        <CardContent player={player} inviteplayer={inviteplayer} />
      </Card>
    </>
  );
};

export default PlayerItem;
