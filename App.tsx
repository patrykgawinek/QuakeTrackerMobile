import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import axios, { AxiosResponse } from "axios";
import FoundFeatures from "./components/FoundFeatures/FoundFeatures";
import SingleFeature from "./components/SingleFeature/SingleFeature";
import Header from "./components/Header/Header";
import SearchForm from "./components/SearchForm/SearchForm";

const App = () => {
  const baseUrlApi: string = "https://earthquake.usgs.gov";

  const [earthquakeInterval, setEarthquakeInterval] = useState<[Date, Date]>([
    new Date("2021-12-01"),
    new Date("2021-12-02"),
  ]);
  const [circleDistance, setCircleDistance] = useState<[number, number, number]>([55, 5, 100]);
  const [magnitudeRange, setMagnitudeRange] = useState<[number, number]>([0, 10]);

  const [selectedFeature, setSelectedFeature] = useState<string>("us6000g7ri");
  const showSearch: boolean = true;

  return (
    <View style={styles.container}>
      {showSearch && (
        <FoundFeatures baseUrlApi={baseUrlApi} earthquakeInterval={earthquakeInterval} />
      )}
      <SearchForm
        earthquakeInterval={earthquakeInterval}
        setEarthquakeInterval={setEarthquakeInterval}
        circleDistance={circleDistance}
        setCircleDistance={setCircleDistance}
        magnitudeRange={magnitudeRange}
        setMagnitudeRange={setMagnitudeRange}
      />
      {!showSearch && <SingleFeature baseUrlApi={baseUrlApi} selectedFeature={selectedFeature} />}
      <Header />
      <StatusBar style="auto" hidden={true} />
    </View>
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
