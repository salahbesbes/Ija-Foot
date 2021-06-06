import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Button, Platform, Text, View} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const DatePicker = ({date, setDate}) => {
  console.log(date, typeof date);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    console.log(event);
    // setShow(Platform.OS === 'ios');
    if (event.type === 'set' && mode === 'date') {
      showMode('time');
    }
    if (event.type === 'set' && mode === 'time') {
      setShow(false);
      setDate(currentDate);
    }
    if (event.type === 'dismissed') {
      setDate(new Date());
      setShow(false);
    }
  };

  const showMode = currentMode => {
    setMode(currentMode);
    setShow(true);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
      <Pressable style={{}} onPress={showDatepicker}>
        <Text
          style={{
            backgroundColor: 'orange',
            paddingHorizontal: 30,
            height: 30,
          }}>
          {date?.toLocaleString()}
        </Text>
      </Pressable>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

DatePicker.defaultProps = {
  date: new Date(),
};
export default DatePicker;
