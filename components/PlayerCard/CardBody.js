import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function CardBody({location, isMotorized, description}) {
  return (
    <View style={styles.container}>
      <View style={styles.location}>
        <Text>{location}</Text>
        <Text>{isMotorized ? 'motorized' : 'non-motorized'}</Text>
      </View>
      <View style={styles.description}>
        <Text>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    marginTop: 12,
  },
  location: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 11,
  },
  description: {},
});
