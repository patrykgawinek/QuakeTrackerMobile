import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import axios, { AxiosResponse } from "axios";
import FoundFeatures from "./components/FoundFeatures/FoundFeatures";
import SingleFeature from "./components/SingleFeature/SingleFeature";
import Header from "./components/Header/Header";

const App = () => {
  const baseUrlApi: string = "https://earthquake.usgs.gov";
  const [earthquakeInterval, setEarthquakeInterval] = useState<
    [string, string]
  >(["2021-11-16", "2021-11-17"]);

  const [selectedFeature, setSelectedFeature] = useState<string>("us6000g7ri");
  const showSearch: boolean = true;

  return (
    <View style={styles.container}>
      {showSearch && (
        <FoundFeatures
          baseUrlApi={baseUrlApi}
          earthquakeInterval={earthquakeInterval}
        />
      )}
      {!showSearch && (
        <SingleFeature
          baseUrlApi={baseUrlApi}
          selectedFeature={selectedFeature}
        />
      )}
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
