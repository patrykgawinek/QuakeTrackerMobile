import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { HomeMapContext } from "../context/HomeMapContext";
import { Feature } from "../types";

const HomeMap = () => {
  const { baseUrlApi, circleDistance, setSelectedFeature } = useContext(HomeMapContext);
  const [featuresList, setFeaturesList] = useState<Feature[]>([]);

  useEffect(() => {
    axios
      .get(`${baseUrlApi}/earthquakes/feed/v1.0/summary/all_day.geojson`)
      .then((response) => {
        setFeaturesList(response.data.features);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const navigation: StackNavigationProp<any> = useNavigation();
  const handleSelectEarthquake = (id: string) => {
    setSelectedFeature(id);
    navigation.navigate("Last Selected Earthquake");
  };

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        region={{
          latitude: circleDistance.latitude,
          longitude: circleDistance.longitude,
          latitudeDelta: 50,
          longitudeDelta: 50,
        }}
      >
        {featuresList.map((feature: Feature, index: number) => {
          return (
            feature.geometry !== undefined && (
              <Marker
                key={index}
                pinColor={"#1AA7EC"}
                coordinate={{
                  latitude: feature.geometry.coordinates[1],
                  longitude: feature.geometry.coordinates[0],
                }}
                title={feature.properties.title}
                description={new Date(feature.properties.time).toUTCString()}
              >
                <Callout onPress={() => handleSelectEarthquake(feature.id)} />
              </Marker>
            )
          );
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default HomeMap;
