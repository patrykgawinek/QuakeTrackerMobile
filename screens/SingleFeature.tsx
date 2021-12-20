import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Button, Linking, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SingleFeatureContext } from "../context/SingleFeatureContext";
import { Feature } from "../types";

const SingleFeature = () => {
  const { baseUrlApi, selectedFeature } = useContext(SingleFeatureContext);
  const [foundFeature, setFoundFeature] = useState<Feature>({
    type: "",
    properties: {
      mag: 0,
      place: "",
      time: "",
      updated: "",
      url: "",
      detail: "",
      alert: "",
      status: "",
      tsunami: 0,
      sig: 0,
      net: "",
      code: "",
      ids: "",
      sources: "",
      types: "",
      rms: 0,
      magType: "",
      type: "",
      title: "",
    },
    geometry: {
      type: "Point",
      coordinates: [0, 0],
    },
    id: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const getFeatureData = async () => {
    setLoading(true);
    axios
      .get(`${baseUrlApi}/fdsnws/event/1/query`, {
        params: {
          format: "geojson",
          eventid: selectedFeature,
        },
      })
      .then((response) => {
        setFoundFeature(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getFeatureData();
  }, [selectedFeature]);

  const navigation: StackNavigationProp<any> = useNavigation();
  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator color={"blue"} size={"large"} style={styles.spinner} />}
      {!loading && (
        <>
          <Text style={styles.featureTitle}>{foundFeature?.properties.place}</Text>
          <Text style={styles.featureTime}>
            {new Date(foundFeature?.properties.time).toUTCString()}
          </Text>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              showsUserLocation={true}
              region={{
                latitude: foundFeature?.geometry.coordinates[1],
                longitude: foundFeature?.geometry.coordinates[0],
                latitudeDelta: 50,
                longitudeDelta: 50,
              }}
            >
              <Marker
                coordinate={{
                  latitude: foundFeature?.geometry.coordinates[1],
                  longitude: foundFeature?.geometry.coordinates[0],
                }}
                title={foundFeature?.properties.title}
                description={`Last updated: ${new Date(
                  foundFeature?.properties.updated
                ).toUTCString()}`}
              />
            </MapView>
          </View>
          <View style={styles.featureData}>
            <View style={styles.propertyContainer}>
              <Text style={styles.propertyText}>Coordinates</Text>
              <Text style={styles.propertyText}>
                {foundFeature?.geometry.coordinates[0]}, {foundFeature?.geometry.coordinates[1]}
              </Text>
            </View>
            <View style={styles.propertyContainer}>
              <Text style={styles.propertyText}>Magnitude</Text>
              <Text style={styles.propertyText}>
                {foundFeature?.properties.mag} {foundFeature?.properties.magType}
              </Text>
            </View>
            <View style={styles.propertyContainer}>
              <Text style={styles.propertyText}>Alert Level</Text>
              <Text style={styles.propertyText}>{foundFeature?.properties.alert || "None"}</Text>
            </View>
            <View style={styles.propertyContainer}>
              <Text style={styles.propertyText}>Significance</Text>
              <Text style={styles.propertyText}>{foundFeature?.properties.sig}</Text>
            </View>
          </View>
          <View style={styles.buttonView}>
            <Button
              title="Visit USGS Website"
              accessibilityLabel="Visit USGS Website"
              onPress={() => {
                navigation.navigate("USGS Webpage");
              }}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spinner: {
    marginTop: 20,
  },
  featureTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  featureTime: {
    textAlign: "center",
    fontSize: 18,
  },
  mapContainer: {
    height: "50%",
    marginTop: "5%",
    marginBottom: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  featureData: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  propertyContainer: {
    width: "40%",
    margin: "5%",
    alignItems: "center",
  },
  propertyText: {
    fontSize: 16,
  },
  buttonView: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
});

export default SingleFeature;
