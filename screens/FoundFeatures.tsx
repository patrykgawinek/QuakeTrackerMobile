import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import axios, { AxiosResponse } from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { FoundFeaturesContext } from "../context/FoundFeaturesContext";
import { AlertLevel, Feature } from "../types";

interface ListItemProps {
  feature: Feature;
  handleSelectEarthquake: (id: string) => void;
  style: ViewStyle;
}

const ListItem = ({ handleSelectEarthquake, feature, style }: ListItemProps) => {
  return (
    <TouchableOpacity onPress={() => handleSelectEarthquake(feature.id)} style={style}>
      <Text style={styles.cardTitle}>Place: {feature.properties.place}</Text>
      <Text style={styles.cardText}>
        Magnitude(type {feature.properties.magType}): {feature.properties.mag}
      </Text>
      <Text style={styles.cardText}>Alert level: {feature.properties.alert}</Text>
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
  const [earthquakeData, setEarthquakeData] = useState<Feature[]>();
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
            <ListItem
              style={styles.card}
              feature={item}
              handleSelectEarthquake={handleSelectEarthquake}
            />
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
  card: {
    alignSelf: "stretch",
    margin: 10,
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowOffset: {
      width: 20,
      height: -20,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: "#000",
    elevation: 3,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  cardText: {
    fontSize: 16,
  },
});

export default FoundFeatures;
