import React, { useState } from "react";
import { StyleSheet } from "react-native";
import FoundFeatures from "./components/FoundFeatures/FoundFeatures";
import SingleFeature from "./components/SingleFeature/SingleFeature";
import SearchForm from "./components/SearchForm/SearchForm";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AlertLevel, CircleDistance, MagnitudeRange, TimeInterval } from "./types";
import { FoundFeaturesContext } from "./context/FoundFeaturesContext";
import { SearchFeaturesContext } from "./context/SearchFeaturesContext";
import { SingleFeatureContext } from "./context/SingleFeatureContext";

const Stack = createDrawerNavigator();

const App = () => {
  const baseUrlApi: string = "https://earthquake.usgs.gov";

  const [earthquakeInterval, setEarthquakeInterval] = useState<TimeInterval>({
    since: new Date("2021-11-16"),
    to: new Date("2021-11-17"),
  });
  const [circleDistance, setCircleDistance] = useState<CircleDistance>({
    latitude: 55,
    longitude: 5,
    distance: 100,
  });
  const [magnitudeRange, setMagnitudeRange] = useState<MagnitudeRange>({
    minimum: -1,
    maximum: 10,
  });
  const [alertLevel, setAlertLevel] = useState<AlertLevel>(AlertLevel.Green);

  const [selectedFeature, setSelectedFeature] = useState<string>("us6000g7ri");

  return (
    <SearchFeaturesContext.Provider
      value={{
        earthquakeInterval,
        setEarthquakeInterval,
        circleDistance,
        setCircleDistance,
        magnitudeRange,
        setMagnitudeRange,
        alertLevel,
        setAlertLevel,
      }}
    >
      <FoundFeaturesContext.Provider
        value={{
          baseUrlApi: baseUrlApi,
          earthquakeInterval: earthquakeInterval,
          circleDistance: circleDistance,
          magnitudeRange: magnitudeRange,
          setSelectedFeature: setSelectedFeature,
          alertLevel,
        }}
      >
        <SingleFeatureContext.Provider
          value={{
            baseUrlApi,
            selectedFeature,
          }}
        >
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Earthquakes">
              <Stack.Screen name="Search Earthquakes" component={SearchForm} />
              <Stack.Screen name="Found Earthquakes" component={FoundFeatures} />
              <Stack.Screen name="Last Selected Eartquake" component={SingleFeature} />
            </Stack.Navigator>
          </NavigationContainer>
        </SingleFeatureContext.Provider>
      </FoundFeaturesContext.Provider>
    </SearchFeaturesContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default App;
