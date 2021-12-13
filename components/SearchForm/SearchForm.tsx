import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

interface SearchFormProps {
  earthquakeInterval: [Date, Date];
  setEarthquakeInterval: React.Dispatch<React.SetStateAction<[Date, Date]>>;
}

const SearchForm = ({ earthquakeInterval, setEarthquakeInterval }: SearchFormProps) => {
  //Datepicker usestates
  const [isDatePickerVisible, setDatePickerVisible] = useState<[boolean, boolean]>([false, false]);
  const showDatePicker = (id: number) => {
    if (id === 0) {
      setDatePickerVisible([true, false]);
    } else {
      setDatePickerVisible([false, true]);
    }
  };
  const hideDatePickers = () => {
    setDatePickerVisible([false, false]);
  };
  const handleConfirm = (datetime: Date, id: number) => {
    if (id === 0) {
      setEarthquakeInterval([datetime, earthquakeInterval[1]]);
    } else {
      setEarthquakeInterval([earthquakeInterval[0], datetime]);
    }
    hideDatePickers();
  };

  useEffect(() => {}, [earthquakeInterval]);

  return (
    <View>
      <Text>Search Earthquakes</Text>
      <View>
        <Text>Since</Text>
        <Button title={earthquakeInterval[0].toLocaleString()} onPress={() => showDatePicker(0)} />
        <DateTimePicker
          isVisible={isDatePickerVisible[0]}
          mode="datetime"
          onConfirm={(datetime: Date) => handleConfirm(datetime, 0)}
          onCancel={hideDatePickers}
        />
        <Text>To</Text>
        <Button title={earthquakeInterval[1].toLocaleString()} onPress={() => showDatePicker(1)} />
        <DateTimePicker
          isVisible={isDatePickerVisible[1]}
          mode="datetime"
          onConfirm={(datetime: Date) => handleConfirm(datetime, 1)}
          onCancel={hideDatePickers}
        />
      </View>
    </View>
  );
};

export default SearchForm;
