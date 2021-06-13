import React from 'react';
import {useInvitaion} from '../../hooks/useInvitation';

import Card from '../Card';
import CardContent from './PlayerCardContent';

const PlayerItem = ({item}) => {
  const player = {...item.data(), uid: item.id};
  const {addFriend} = useInvitaion();

  return (
    <Card>
      <CardContent player={player} addFriend={addFriend} />
    </Card>
  );
};

export default PlayerItem;
