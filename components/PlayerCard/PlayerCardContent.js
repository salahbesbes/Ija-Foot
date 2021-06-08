import React from 'react';
import {View} from 'react-native';

import CardHeader from './CardHeader';
import CardBody from './CardBody';

export default function CardContent({playerData}) {
  return (
    <View>
      <CardHeader />
      <CardBody
        location={playerData?.location}
        isMotorized={playerData?.isMotorized}
        description={playerData?.description}
      />
    </View>
  );
}
