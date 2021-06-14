import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import LocationPicker from '../LocationPicker';

let filtredLocations = '';

const Filters = ({setFilter}) => {
  const [location, setLocation] = useState('');

  useEffect(() => {
    filtredLocations = location;
    setFilter(location);
  }, [location, setFilter]);

  return (
    <View style={styles.filterBar}>
      <Text>Filter by: </Text>
      <LocationPicker
        location={location}
        onLocationChange={setLocation}
        disabled={false}
      />
    </View>
  );
};

export const filterData = data => {
  if (filtredLocations) {
    return data.filter(item => filtredLocations === item.data().location);
  } else {
    return data;
  }
};

const styles = StyleSheet.create({
  filterBar: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    // width: 150,
  },
});

export default Filters;
