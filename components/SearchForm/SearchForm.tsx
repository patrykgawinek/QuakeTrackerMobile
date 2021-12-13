import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React, { useEffect, useState } from "react";
import { View, Text, Button, TextInput, ScrollView } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

interface SearchFormProps {
  earthquakeInterval: [Date, Date];
  setEarthquakeInterval: React.Dispatch<React.SetStateAction<[Date, Date]>>;
  circleDistance: [number, number, number];
  setCircleDistance: React.Dispatch<React.SetStateAction<[number, number, number]>>;
  magnitudeRange: [number, number];
  setMagnitudeRange: React.Dispatch<React.SetStateAction<[number, number]>>;
}

const SearchForm = ({
  earthquakeInterval,
  setEarthquakeInterval,
  circleDistance,
  setCircleDistance,
  magnitudeRange,
  setMagnitudeRange,
}: SearchFormProps) => {
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

  const handleDistanceChange = (text: string) => {
    if (text === "") {
      text = "0";
    }
    setCircleDistance([55, 5, parseInt(text.replace(/[^0-9]/g, ""))]);
  };

  const [scrollEnabled, setScrollEnabled] = useState<boolean>(false);
  const enableScroll = () => setScrollEnabled(true);
  const disableScroll = () => setScrollEnabled(false);

  //Re-render component on change of useStates
  useEffect(() => {}, [earthquakeInterval, circleDistance[2]]);

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
      </View>
      <View>
        <Text>To</Text>
        <Button title={earthquakeInterval[1].toLocaleString()} onPress={() => showDatePicker(1)} />
        <DateTimePicker
          isVisible={isDatePickerVisible[1]}
          mode="datetime"
          onConfirm={(datetime: Date) => handleConfirm(datetime, 1)}
          onCancel={hideDatePickers}
        />
      </View>
      <View>
        <Text>Distance (in km)</Text>
        <TextInput
          keyboardType="numeric"
          onChangeText={(text) => handleDistanceChange(text)}
          value={circleDistance[2].toString()}
          maxLength={10} //setting limit of input
        />
      </View>
      <View>
        <Text>Magnitude</Text>
        <Text>Min: {magnitudeRange[0].toFixed(1)}</Text>
        <Text>Max: {magnitudeRange[1].toFixed(1)}</Text>
        <ScrollView scrollEnabled={scrollEnabled}>
          <MultiSlider
            values={[magnitudeRange[0], magnitudeRange[1]]}
            onValuesChangeStart={disableScroll}
            onValuesChangeFinish={enableScroll}
            onValuesChange={(values) => {
              setMagnitudeRange([values[0], values[1]]);
            }}
            enableLabel
            allowOverlap
            snapped={true}
            min={-1}
            max={10}
            step={0.1}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default SearchForm;
