import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, TextInput, ScrollView } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { SearchFeaturesContext } from "../../context/SearchFeaturesContext";

const SearchForm = () => {
  const {
    earthquakeInterval,
    setEarthquakeInterval,
    circleDistance,
    setCircleDistance,
    magnitudeRange,
    setMagnitudeRange,
  } = useContext(SearchFeaturesContext);

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
      setEarthquakeInterval({ since: datetime, to: earthquakeInterval.to });
    } else {
      setEarthquakeInterval({ since: earthquakeInterval.since, to: datetime });
    }
    hideDatePickers();
  };

  const handleDistanceChange = (text: string) => {
    if (text === "") {
      text = "0";
    }
    setCircleDistance({
      latitude: 55,
      longitude: 5,
      distance: parseInt(text.replace(/[^0-9]/g, "")),
    });
  };

  const [scrollEnabled, setScrollEnabled] = useState<boolean>(false);
  const enableScroll = () => setScrollEnabled(true);
  const disableScroll = () => setScrollEnabled(false);

  //Re-render component on change of useStates
  useEffect(() => {}, [earthquakeInterval, circleDistance.distance]);

  return (
    <View>
      <Text>Search Earthquakes</Text>
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
      <View>
        <Text>Distance (in km)</Text>
        <TextInput
          keyboardType="numeric"
          onChangeText={(text) => handleDistanceChange(text)}
          value={circleDistance.distance.toString()}
          maxLength={10} //setting limit of input
        />
      </View>
      <View>
        <Text>Magnitude</Text>
        <Text>Min: {magnitudeRange.minimum.toFixed(1)}</Text>
        <Text>Max: {magnitudeRange.maximum.toFixed(1)}</Text>
        <ScrollView scrollEnabled={scrollEnabled}>
          <MultiSlider
            values={[magnitudeRange.minimum, magnitudeRange.maximum]}
            onValuesChangeStart={disableScroll}
            onValuesChangeFinish={enableScroll}
            onValuesChange={(values) => {
              setMagnitudeRange({ minimum: values[0], maximum: values[1] });
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
