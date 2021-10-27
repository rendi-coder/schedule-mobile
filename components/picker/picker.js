import React from 'react';
import { Picker } from '@react-native-picker/picker';

const PickerComponent = ({ selectedValue, setSelectedValue, values }) => (
  <Picker
    selectedValue={selectedValue}
    style={{ height: 50, width: 150 }}
    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
  >
    {values.map((value, idx) => (
      <Picker.Item label={value} value={value} key={value + idx} />
    ))}
  </Picker>
);

export default PickerComponent;
