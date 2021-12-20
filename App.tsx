import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import FoundFeatures from "./screens/FoundFeatures";
import SingleFeature from "./screens/SingleFeature";
import SearchForm from "./screens/SearchForm/SearchForm";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { AlertLevel, CircleDistance, MagnitudeRange, TimeInterval } from "./types";
import { FoundFeaturesContext } from "./context/FoundFeaturesContext";
import { SearchFeaturesContext } from "./context/SearchFeaturesContext";
import { SingleFeatureContext } from "./context/SingleFeatureContext";
import HomeMap from "./screens/HomeMap";
import { HomeMapContext } from "./context/HomeMapContext";
import FeatureWebView from "./screens/FeatureWebView";
import { createStackNavigator } from "@react-navigation/stack";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeStackNav = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Past 24 hours" component={HomeMap} />
    </Stack.Navigator>
  );
};
const SearchStackNav = () => {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen name="Search" component={SearchForm} />
      <Stack.Screen name="Found Earthquakes" component={FoundFeatures} />
    </Stack.Navigator>
  );
};
const DetailStackNav = () => {
  return (
    <Stack.Navigator initialRouteName="Details">
      <Stack.Screen name="Details" component={SingleFeature} />
      <Stack.Screen name="USGS Webpage" component={FeatureWebView} />
    </Stack.Navigator>
  );
};

const App = () => {
  const baseUrlApi: string = "https://earthquake.usgs.gov";

  const [earthquakeInterval, setEarthquakeInterval] = useState<TimeInterval>({
    since: new Date("2021-11-16"),
    to: new Date("2021-11-17"),
  });
  const [circleDistance, setCircleDistance] = useState<CircleDistance>({
    latitude: 55,
    longitude: 5,
    distance: 500,
  });
  const [magnitudeRange, setMagnitudeRange] = useState<MagnitudeRange>({
    minimum: -1,
    maximum: 10,
  });
  const [alertLevel, setAlertLevel] = useState<AlertLevel>(AlertLevel.All);

  const [selectedFeature, setSelectedFeature] = useState<string>("");
  //Read last selected on mount
  const readSelectedFeature = async () => {
    try {
      const selected = await AsyncStorage.getItem("selectedFeature");
      if (selected !== undefined && selected !== null) {
        setSelectedFeature(JSON.parse(selected));
      }
    } catch (e) {
      console.log("Something went wrong when reading data from storage!");
    }
  };
  useEffect(() => {
    readSelectedFeature();
  }, []);
  //Save last selected
  const storeSelectedFeature = async () => {
    try {
      await AsyncStorage.setItem("selectedFeature", JSON.stringify(selectedFeature));
    } catch (e) {
      console.log("Something went wrong when getting data from storage!");
    }
  };
  useEffect(() => {
    storeSelectedFeature();
  }, [selectedFeature]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({ accuracy: 3 });
      setCircleDistance({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        distance: circleDistance.distance,
      });
    })();
  }, []);

  return (
    <HomeMapContext.Provider
      value={{
        baseUrlApi,
        circleDistance,
        setSelectedFeature,
      }}
    >
      <SearchFeaturesContext.Provider
        value={{
          earthquakeInterval,
          setEarthquakeInterval,
          circleDistance,
          setCircleDistance,
          magnitudeRange,
          setMagnitudeRange,
          alertLevel,
          setAlertLevel,
        }}
      >
        <FoundFeaturesContext.Provider
          value={{
            baseUrlApi: baseUrlApi,
            earthquakeInterval: earthquakeInterval,
            circleDistance: circleDistance,
            magnitudeRange: magnitudeRange,
            setSelectedFeature: setSelectedFeature,
            alertLevel,
          }}
        >
          <SingleFeatureContext.Provider
            value={{
              baseUrlApi,
              selectedFeature,
            }}
          >
            <NavigationContainer>
              <Drawer.Navigator
                initialRouteName="Map"
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Drawer.Screen name="Map" component={HomeStackNav} />
                <Drawer.Screen name="Find Earthquakes" component={SearchStackNav} />
                <Drawer.Screen name="Last Selected Earthquake" component={DetailStackNav} />
              </Drawer.Navigator>
            </NavigationContainer>
          </SingleFeatureContext.Provider>
        </FoundFeaturesContext.Provider>
      </SearchFeaturesContext.Provider>
    </HomeMapContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default App;
