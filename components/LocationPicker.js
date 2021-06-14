import React, {useState} from 'react';
import {View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const locations = [
  {label: 'Tunis', value: 'Tunis'},
  {label: 'Ariana', value: 'Ariana'},
  {label: 'Ben Arous', value: 'Ben Arous'},
  {label: 'Manouba', value: 'Manouba'},
  {label: 'Bizerte', value: 'Bizerte'},
  {label: 'Béja', value: 'Béja'},
  {label: 'Sousse', value: 'Sousse'},
  {label: 'Sfax', value: 'Sfax'},
  {label: 'Kairouan', value: 'Kairouan'},
  {label: 'Gabès', value: 'Gabès'},
  {label: 'Gafsa', value: 'Gafsa'},
  {label: 'Nabeul', value: 'Nabeul'},
  {label: 'Kasserine', value: 'Kasserine'},
  {label: 'Monastir', value: 'Monastir'},
  {label: 'Tataouine', value: 'Tataouine'},
  {label: 'Medenine', value: 'Medenine'},
  {label: 'Jendouba', value: 'Jendouba'},
  {label: 'El Kef', value: 'El Kef'},
  {label: 'Mahdia', value: 'Mahdia'},
  {label: 'Sidi Bouzid', value: 'Sidi Bouzid'},
  {label: 'Tozeur', value: 'Tozeur'},
  {label: 'Siliana', value: 'Siliana'},
  {label: 'Kebili', value: 'Kebili'},
  {label: 'Zaghouan', value: 'Zaghouan'},
];

const LocationPicker = ({location, onLocationChange, disabled}) => {
  return (
    <View
      style={{
        marginVertical: 10,
        width: '80%',
        borderRadius: 10,
        borderWidth: 1,
      }}>
      <RNPickerSelect
        items={locations}
        onValueChange={value => {
          onLocationChange(value);
        }}
        value={location}
        placeholder={{label: 'Select Location...', value: undefined}}
        disabled={disabled}
        style={{inputAndroid: {color: disabled ? '#dedede' : 'black'}}}
      />
    </View>
  );
};

export default LocationPicker;
