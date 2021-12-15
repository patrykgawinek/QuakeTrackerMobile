import React, { useContext, useEffect } from "react";
import { View, Text } from "react-native";
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
    <View>
      <Text>Search Earthquakes</Text>
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

export default SearchForm;
