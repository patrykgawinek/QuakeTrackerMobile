import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Button } from "react-native";
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

  const navigation: StackNavigationProp<any> = useNavigation();
  //Re-render component on change of useStates
  useEffect(() => {}, [earthquakeInterval, circleDistance.distance]);

  return (
    <View style={styles.container}>
      <TimePick
        titleStyle={styles.titleStyle}
        textStyle={styles.textStyle}
        earthquakeInterval={earthquakeInterval}
        setEarthquakeInterval={setEarthquakeInterval}
      />
      <DistancePick
        titleStyle={styles.titleStyle}
        textStyle={styles.textStyle}
        circleDistance={circleDistance}
        setCircleDistance={setCircleDistance}
      />
      <MagnitudePick
        titleStyle={styles.titleStyle}
        textStyle={styles.textStyle}
        magnitudeRange={magnitudeRange}
        setMagnitudeRange={setMagnitudeRange}
      />
      <AlertLevelPick
        titleStyle={styles.titleStyle}
        textStyle={styles.textStyle}
        alertLevel={alertLevel}
        setAlertLevel={setAlertLevel}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Show Found Results"
          onPress={() => navigation.navigate("Found Earthquakes")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    margin: 10,
    padding: 5,
  },
  titleStyle: {
    fontSize: 16,
    marginRight: 15,
    fontWeight: "bold",
  },
  textStyle: {
    fontSize: 16,
    fontStyle: "italic",
  },
  buttonContainer: {
    marginTop: 15,
  },
});

export default SearchForm;
