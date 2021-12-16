import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import axios, { AxiosResponse } from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
  const navigation: StackNavigationProp<any> = useNavigation();
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
          alertlevel:
            alertLevel === AlertLevel.All
              ? ""
              : AlertLevel[alertLevel].toString().toLowerCase(),
        },
      })
      .then((response) => {
        setEarthquakeData(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [earthquakeInterval, circleDistance, magnitudeRange, alertLevel]); //Track changes on date interval

  const handleSelectEarthquake = (id: string) => {
    setSelectedFeature(id);
    navigation.navigate("Last Selected Earthquake");
  };
  return (
    <View>
      <ScrollView>
        {earthquakeData?.data.features.map((feature: any) => (
          <View style={styles.featureContainer} key={feature.id}>
            <TouchableOpacity
              onPress={() => handleSelectEarthquake(feature.id)}
            >
              <Text>Place: {feature.properties.place}</Text>
              <Text>
                Magnitude(type {feature.properties.magType}):{" "}
                {feature.properties.mag}
              </Text>
              <Text>Alert level: {feature.properties.alert}</Text>
            </TouchableOpacity>
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
