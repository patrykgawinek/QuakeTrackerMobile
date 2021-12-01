import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Linking, StyleSheet, Text, View } from "react-native";

interface SingleFeatureProps {
  baseUrlApi: string;
  selectedFeature: string;
}

const SingleFeature = ({ baseUrlApi, selectedFeature }: SingleFeatureProps) => {
  const [foundFeature, setFoundFeature] = useState<any>();

  useEffect(() => {
    axios
      .get(`${baseUrlApi}/fdsnws/event/1/query`, {
        params: {
          format: "geojson",
          eventid: selectedFeature,
        },
      })
      .then((response) => {
        console.log(response.data);
        setFoundFeature(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedFeature]);

  return (
    <View>
      <Text style={styles.featureTitle}>{foundFeature?.properties.place}</Text>
      <Text style={styles.featureTime}>
        {new Date(foundFeature?.properties.time).toUTCString()}
      </Text>
      <View style={styles.mapPlaceholder}>
        <Text>Map Placeholder</Text>
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
          onPress={() => Linking.openURL(`${foundFeature?.properties.url}`)}
          title="Visit USGS Website"
          accessibilityLabel="Visit USGS Website"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  featureTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  featureTime: {
    textAlign: "center",
    fontSize: 18,
  },
  mapPlaceholder: {
    height: "30%",
    marginTop: "5%",
    marginBottom: "5%",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderTopColor: "black",
    borderTopWidth: 1,
    justifyContent: "center",
    alignItems: "center",
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
