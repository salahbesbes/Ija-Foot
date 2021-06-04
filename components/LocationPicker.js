import React, {useState} from 'react';
import {View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const locations = [
  {label: 'Tunis', value: 'Tunis'},
  {label: 'SfaxLab', value: 'SfaxVal'},
  {label: 'Sousse', value: 'Sousse'},
  {label: 'Gabès', value: 'Gabès'},
  {label: 'Kairouan', value: 'Kairouan'},
  {label: 'Bizerte', value: 'Bizerte'},
  {label: 'Gafsa', value: 'Gafsa'},
  {label: 'Nabeul', value: 'Nabeul'},
  {label: 'Ariana', value: 'Ariana'},
  {label: 'Kasserine', value: 'Kasserine'},
  {label: 'Monastir', value: 'Monastir'},
  {label: 'Tataouine', value: 'Tataouine'},
  {label: 'Medenine', value: 'Medenine'},
  {label: 'Béja', value: 'Béja'},
  {label: 'Jendouba', value: 'Jendouba'},
  {label: 'El Kef', value: 'El Kef'},
  {label: 'Mahdia', value: 'Mahdia'},
  {label: 'Sidi Bouzid', value: 'Sidi Bouzid'},
  {label: 'Tozeur', value: 'Tozeur'},
  {label: 'Siliana', value: 'Siliana'},
  {label: 'Kebili', value: 'Kebili'},
  {label: 'Zaghouan', value: 'Zaghouan'},
  {label: 'Ben Arous', value: 'Ben Arous'},
  {label: 'Manouba', value: 'Manouba'},
];

const LocationPicker = ({location, onLocationChange}) => {
  return (
    <View style={{width: 200}}>
      <RNPickerSelect
        items={locations}
        onValueChange={value => {
          onLocationChange(value);
        }}
        value={location}
        placeholder={{label: 'Select Location...', value: undefined}}
        style={{inputAndroid: {color: 'black'}}}
      />
    </View>
  );
};

export default LocationPicker;
