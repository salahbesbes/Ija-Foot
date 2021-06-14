import React from 'react';
import {View} from 'react-native';

import CardHeader from './CardHeader';
import CardBody from './CardBody';

export default function CardContent({player, useInviData, useAdminData}) {
  const {availabilityData} = player;
  return (
    <View>
      <CardHeader
        player={player}
        useInviData={useInviData}
        useAdminData={useAdminData}
      />
      <CardBody
        location={availabilityData?.location}
        isMotorized={availabilityData?.isMotorized}
        description={availabilityData?.description}
      />
    </View>
  );
}
