import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Text, View, Pressable} from 'react-native';
import {useTheme} from '@react-navigation/native';

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
  const {raisedInput, mv} = useTheme();
  return (
    <View style={[{marginVertical: 10, width: '50%'}]}>
      <Pressable onPress={showDatepicker}>
        <Text
          style={{
            borderRadius: 10,
            textAlign: 'center',
            backgroundColor: 'orange',
            padding: 10,
            fontSize: 15,
            fontWeight: 'bold',
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
