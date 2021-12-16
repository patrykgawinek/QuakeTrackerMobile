import axios, { AxiosResponse } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { FoundFeaturesContext } from "../../context/FoundFeaturesContext";
import { AlertLevel } from "../../types";

const FoundFeatures = () => {
  const {
    baseUrlApi,
    earthquakeInterval,
    circleDistance,
    magnitudeRange,
    alertLevel,
    setSelectedFeature,
  } = useContext(FoundFeaturesContext);
  const [earthquakeData, setEarthquakeData] =
    useState<AxiosResponse<any, any>>();
  useEffect(() => {
    axios
      .get(`${baseUrlApi}/fdsnws/event/1/query`, {
        params: {
          format: "geojson",
          starttime: earthquakeInterval.since.toUTCString(),
          endtime: earthquakeInterval.to.toUTCString(),
          latitude: circleDistance.latitude,
          longitude: circleDistance.longitude,
          maxradiuskm: circleDistance.distance,
          maxmagnitude: magnitudeRange.maximum,
          minmagnitude: magnitudeRange.minimum,
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
      <ScrollView>
        {earthquakeData?.data.features.map((feature: any) => (
          <View style={styles.featureContainer} key={feature.id}>
            <Text>Place: {feature.properties.place}</Text>
            <Text>
              Magnitude(type {feature.properties.magType}):{" "}
              {feature.properties.mag}
            </Text>
            <Text
              style={{ color: "blue" }}
              onPress={() => Linking.openURL(`${feature.properties.url}`)}
            >
              Click here for event details
            </Text>
          </View>
        ))}
      </ScrollView>
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
