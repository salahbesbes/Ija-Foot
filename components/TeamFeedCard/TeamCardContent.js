import React from 'react';
import {View} from 'react-native';

import CardHeader from './CardHeader';
import CardBody from './CardBody';

export default function CardContent({teamCard, useCreateDAta}) {
  return (
    <View>
      <CardHeader teamCard={teamCard} useCreateDAta={useCreateDAta} />
      <CardBody
        location={teamCard?.playerData?.location}
        isMotorized={teamCard?.playerData?.isMotorized}
        description={teamCard?.playerData?.description}
      />
    </View>
  );
}
