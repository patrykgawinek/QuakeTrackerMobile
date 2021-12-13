import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Linking, StyleSheet, Text, View } from "react-native";

interface FoundFeaturesProps {
  baseUrlApi: string;
  earthquakeInterval: [Date, Date];
}

const FoundFeatures = ({ baseUrlApi, earthquakeInterval }: FoundFeaturesProps) => {
  const [earthquakeData, setEarthquakeData] = useState<AxiosResponse<any, any>>();
  useEffect(() => {
    //Function to asynchronously fetch data earthquake from USGS by date and limit the amount
    const fetchByDate = async () => {
      axios
        .get(`${baseUrlApi}/fdsnws/event/1/query`, {
          params: {
            format: "geojson",
            starttime: earthquakeInterval[0].toUTCString(),
            endtime: earthquakeInterval[1].toUTCString(),
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

    fetchByDate();
  }, [earthquakeInterval]); //Track changes on date interval

  return (
    <>
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
    </>
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
