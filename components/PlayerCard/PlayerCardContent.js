import React from 'react';
import {View} from 'react-native';

import CardHeader from './CardHeader';
import CardBody from './CardBody';

export default function CardContent({player, inviteplayer}) {
  const {availabilityData} = player;
  return (
    <View>
      <CardHeader player={player} inviteplayer={inviteplayer} />
      <CardBody
        location={availabilityData?.location}
        isMotorized={availabilityData?.isMotorized}
        description={availabilityData?.description}
      />
    </View>
  );
}
