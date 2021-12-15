import React, { useState } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { TimeInterval } from "../../types";

interface TimePickProps {
  titleStyle: StyleProp<TextStyle>;
  textStyle: StyleProp<TextStyle>;
  earthquakeInterval: TimeInterval;
  setEarthquakeInterval: React.Dispatch<React.SetStateAction<TimeInterval>>;
}

const TimePick = ({
  titleStyle,
  textStyle,
  earthquakeInterval,
  setEarthquakeInterval,
}: TimePickProps) => {
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
      <View style={styles.timeContainer}>
        <Text style={[titleStyle, styles.timeTitle]}>Since</Text>
        <TouchableOpacity onPress={() => showDatePicker(0)} style={styles.timeTouchable}>
          <Text style={textStyle}>{earthquakeInterval.since.toLocaleString()}</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={isDatePickerVisible[0]}
          mode="datetime"
          onConfirm={(datetime: Date) => handleConfirm(datetime, 0)}
          onCancel={hideDatePickers}
        />
      </View>
      <View style={styles.timeContainer}>
        <Text style={[titleStyle, styles.timeTitle]}>To</Text>
        <TouchableOpacity onPress={() => showDatePicker(1)} style={styles.timeTouchable}>
          <Text style={textStyle}>{earthquakeInterval.to.toLocaleString()}</Text>
        </TouchableOpacity>
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

const styles = StyleSheet.create({
  timeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 15,
  },
  timeTitle: {
    width: 50,
  },
  timeTouchable: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 5,
    flex: 1,
    alignItems: "center",
  },
});

export default TimePick;
