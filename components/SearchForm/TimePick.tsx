import React, { useState } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { TimeInterval } from "../../types";

interface TimePickProps {
  earthquakeInterval: TimeInterval;
  setEarthquakeInterval: React.Dispatch<React.SetStateAction<TimeInterval>>;
}

const TimePick = ({ earthquakeInterval, setEarthquakeInterval }: TimePickProps) => {
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
      setEarthquakeInterval({ since: datetime, to: earthquakeInterval.to });
    } else {
      setEarthquakeInterval({ since: earthquakeInterval.since, to: datetime });
    }
    hideDatePickers();
  };
  return (
    <View>
      <View>
        <Text>Since</Text>
        <Button
          title={earthquakeInterval.since.toLocaleString()}
          onPress={() => showDatePicker(0)}
        />
        <DateTimePicker
          isVisible={isDatePickerVisible[0]}
          mode="datetime"
          onConfirm={(datetime: Date) => handleConfirm(datetime, 0)}
          onCancel={hideDatePickers}
        />
      </View>
      <View>
        <Text>To</Text>
        <Button title={earthquakeInterval.to.toLocaleString()} onPress={() => showDatePicker(1)} />
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

const styles = StyleSheet.create({});

export default TimePick;
