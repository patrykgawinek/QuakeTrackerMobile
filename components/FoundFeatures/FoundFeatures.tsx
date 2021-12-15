import axios, { AxiosResponse } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import { FoundFeaturesContext } from "../../context/FoundFeaturesContext";

const FoundFeatures = () => {
  const { baseUrlApi, earthquakeInterval } = useContext(FoundFeaturesContext);
  const [earthquakeData, setEarthquakeData] = useState<AxiosResponse<any, any>>();
  useEffect(() => {
    axios
      .get(`${baseUrlApi}/fdsnws/event/1/query`, {
        params: {
          format: "geojson",
          starttime: earthquakeInterval.since.toUTCString(),
          endtime: earthquakeInterval.to.toUTCString(),
          limit: 5,
        },
      })
      .then((response) => {
        setEarthquakeData(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [earthquakeInterval]); //Track changes on date interval

  return (
    <View>
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
    </View>
  );
};

const styles = StyleSheet.create({
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

export default FoundFeatures;
