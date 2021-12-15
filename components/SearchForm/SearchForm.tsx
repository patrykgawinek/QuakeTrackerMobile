import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SearchFeaturesContext } from "../../context/SearchFeaturesContext";
import AlertLevelPick from "./AlertLevelPick";
import DistancePick from "./DistancePick";
import MagnitudePick from "./MagnitudePick";
import TimePick from "./TimePick";

const SearchForm = () => {
  const {
    earthquakeInterval,
    setEarthquakeInterval,
    circleDistance,
    setCircleDistance,
    magnitudeRange,
    setMagnitudeRange,
    alertLevel,
    setAlertLevel,
  } = useContext(SearchFeaturesContext);

  //Re-render component on change of useStates
  useEffect(() => {}, [earthquakeInterval, circleDistance.distance]);

  return (
    <View style={styles.container}>
      <TimePick
        earthquakeInterval={earthquakeInterval}
        setEarthquakeInterval={setEarthquakeInterval}
      />
      <DistancePick circleDistance={circleDistance} setCircleDistance={setCircleDistance} />
      <MagnitudePick magnitudeRange={magnitudeRange} setMagnitudeRange={setMagnitudeRange} />
      <AlertLevelPick alertLevel={alertLevel} setAlertLevel={setAlertLevel} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    margin: 10,
    padding: 5,
  },
});

export default SearchForm;
