import { StatusBar } from "expo-status-bar";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import axios, { AxiosResponse } from "axios";
import FoundFeatures from "./components/FoundFeatures/FoundFeatures";
import SingleFeature from "./components/SingleFeature/SingleFeature";
import Header from "./components/Header/Header";
import SearchForm from "./components/SearchForm/SearchForm";
import { NavigationContainer, RouteProp, useRoute } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

/*
    <View style={styles.container}>
      <SearchForm
        earthquakeInterval={earthquakeInterval}
        setEarthquakeInterval={setEarthquakeInterval}
        circleDistance={circleDistance}
        setCircleDistance={setCircleDistance}
        magnitudeRange={magnitudeRange}
        setMagnitudeRange={setMagnitudeRange}
      />
      {showSearch && (
        <FoundFeatures baseUrlApi={baseUrlApi} earthquakeInterval={earthquakeInterval} />
      )}
      {!showSearch && <SingleFeature baseUrlApi={baseUrlApi} selectedFeature={selectedFeature} />}
      <Header />
      <StatusBar style="auto" hidden={true} />
    </View>
*/
const Stack = createDrawerNavigator();

//Context for search features
export const Features = createContext<any>({
  baseUrlApi: "https://earthquake.usgs.gov",
  earthquakeInterval: [new Date("2021-11-16"), new Date("2021-11-17")],
  setEarthquakeInterval: "",
  circleDistance: [0, 0, 100],
  setCircleDistance: "",
  magnitudeRange: [-1, 10],
  setMagnitudeRange: "",
  selectedFeature: "",
  setSelectedFeature: "",
});

//Context for single feature

const App = () => {
  const baseUrlApi: string = "https://earthquake.usgs.gov";

  const [earthquakeInterval, setEarthquakeInterval] = useState<[Date, Date]>([
    new Date("2021-11-16"),
    new Date("2021-11-17"),
  ]);
  const [circleDistance, setCircleDistance] = useState<[number, number, number]>([55, 5, 100]);
  const [magnitudeRange, setMagnitudeRange] = useState<[number, number]>([0, 10]);

  const [selectedFeature, setSelectedFeature] = useState<string>("us6000g7ri");

  return (
    <Features.Provider
      value={{
        baseUrlApi: baseUrlApi,
        earthquakeInterval: earthquakeInterval,
        setEarthquakeInterval: setEarthquakeInterval,
        circleDistance: circleDistance,
        setCircleDistance: setCircleDistance,
        magnitudeRange: magnitudeRange,
        setMagnitudeRange: setMagnitudeRange,
        selectedFeature: selectedFeature,
        setSelectedFeature: setSelectedFeature,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Features">
          <Stack.Screen name="Search Ffeatures" component={SearchForm} />
          <Stack.Screen name="Found features" component={FoundFeatures} />
          <Stack.Screen name="Last selected feature" component={SingleFeature} />
        </Stack.Navigator>
      </NavigationContainer>
    </Features.Provider>
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
