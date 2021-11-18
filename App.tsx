import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import axios, { AxiosResponse } from "axios";

const App = () => {
  const baseUrlApi: string = "https://earthquake.usgs.gov";
  const [earthquakeData, setEarthquakeData] = useState<AxiosResponse<any, any>>();
  const [earthquakeInterval, setEarthquakeInterval] = useState<[string, string]>([
    "2021-11-16",
    "2021-11-17",
  ]);

  const fetchByDate = async () => {
    axios
      .get(`${baseUrlApi}/fdsnws/event/1/query`, {
        params: {
          format: "geojson",
          starttime: earthquakeInterval[0],
          endtime: earthquakeInterval[1],
          limit: 5,
        },
      })
      .then((response) => {
        setEarthquakeData(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchByDate();
  }, []); //Empty array to stop useEffect from firing in infinite loop

  return (
    <View style={styles.container}>
      {earthquakeData?.data.features.map((feature: any) => (
        <View style={styles.featureContainer} key={feature.id}>
          <Text>Place: {feature.properties.place}</Text>
          <Text>
            Magnitude(type {feature.properties.magType}): {feature.properties.mag}
          </Text>
          <Text
            style={{ color: "blue" }}
            onPress={() => Linking.openURL(`${feature.properties.url}`)}
          >
            Click here for event details
          </Text>
        </View>
      ))}
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
  featureContainer: {
    alignSelf: "stretch",
    margin: 10,
    padding: 5,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderTopColor: "black",
    borderTopWidth: 1,
  },
});

export default App;
