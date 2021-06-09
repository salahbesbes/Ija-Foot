import React from 'react';
import {StyleSheet, View} from 'react-native';

export default function Card(props) {
  return <View style={styles.card}>{props.children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 5,
    backgroundColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginVertical: 6,
    width: 318,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
});
