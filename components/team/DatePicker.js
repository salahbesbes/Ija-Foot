import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Text, View, Pressable} from 'react-native';

const DatePicker = ({formDate, setFormDate}) => {
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    if (event.type === 'set' && mode === 'date') {
      showMode('time');
    }
    if (event.type === 'set' && mode === 'time') {
      setShow(false);
      setDate(currentDate);
      setFormDate(currentDate);
    }
    if (event.type === 'dismissed') {
      setShow(false);
      setFormDate(null);
    }
  };

  const showMode = currentMode => {
    setMode(currentMode);
    setShow(true);
  };

  const showDatepicker = () => {
    showMode('date');
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
          {formDate ? formDate?.toLocaleString() : 'pick a Date'}
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
  formDate: null,
};
export default DatePicker;
