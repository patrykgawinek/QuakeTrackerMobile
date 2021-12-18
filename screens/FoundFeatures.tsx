import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import axios, { AxiosResponse } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { FoundFeaturesContext } from "../context/FoundFeaturesContext";
import { AlertLevel } from "../types";

interface ListItemProps {
  feature: any;
  handleSelectEarthquake: (id: string) => void;
}

const ListItem = ({ handleSelectEarthquake, feature }: ListItemProps) => {
  return (
    <TouchableOpacity onPress={() => handleSelectEarthquake(feature.id)}>
      <Text>Place: {feature.properties.place}</Text>
      <Text>
        Magnitude(type {feature.properties.magType}): {feature.properties.mag}
      </Text>
      <Text>Alert level: {feature.properties.alert}</Text>
    </TouchableOpacity>
  );
};

const FoundFeatures = () => {
  const {
    baseUrlApi,
    earthquakeInterval,
    circleDistance,
    magnitudeRange,
    alertLevel,
    setSelectedFeature,
  } = useContext(FoundFeaturesContext);
  const [earthquakeData, setEarthquakeData] = useState<any>();
  const navigation: StackNavigationProp<any> = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);

  const refresh = async () => {
    setLoading(true);
    let response = await axios.get(`${baseUrlApi}/fdsnws/event/1/query`, {
      params: {
        format: "geojson",
        limit: 250,
        starttime: earthquakeInterval.since.toUTCString(),
        endtime: earthquakeInterval.to.toUTCString(),
        latitude: circleDistance.latitude,
        longitude: circleDistance.longitude,
        maxradiuskm: circleDistance.distance,
        maxmagnitude: magnitudeRange.maximum,
        minmagnitude: magnitudeRange.minimum,
        alertlevel:
          alertLevel === AlertLevel.All ? "" : AlertLevel[alertLevel].toString().toLowerCase(),
      },
    });
    setEarthquakeData(response.data.features);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, [earthquakeInterval, circleDistance, magnitudeRange, alertLevel]); //Track changes on date interval

  const handleSelectEarthquake = (id: string) => {
    setSelectedFeature(id);
    navigation.navigate("Last Selected Earthquake");
  };
  return (
    <View>
      {loading ? (
        <ActivityIndicator color={"blue"} size={"large"} style={styles.spinner} />
      ) : (
        <FlatList
          refreshing={loading}
          onRefresh={refresh}
          data={earthquakeData}
          renderItem={({ item }) => (
            <ListItem feature={item} handleSelectEarthquake={handleSelectEarthquake} />
          )}
        ></FlatList>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  spinner: {
    marginTop: 20,
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

export default FoundFeatures;
function async() {
  throw new Error("Function not implemented.");
}
