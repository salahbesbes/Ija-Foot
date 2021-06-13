import React from 'react';
import {View} from 'react-native';

import CardHeader from './CardHeader';
import CardBody from './CardBody';

export default function CardContent({player, addFriend}) {
  const {availabilityData} = player;
  return (
    <View>
      <CardHeader player={player} addFriend={addFriend} />
      <CardBody
        location={availabilityData?.location}
        isMotorized={availabilityData?.isMotorized}
        description={availabilityData?.description}
      />
    </View>
  );
}
