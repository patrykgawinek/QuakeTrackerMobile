import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { CircleDistance } from "../../types";

interface DistancePickProps {
  circleDistance: CircleDistance;
  setCircleDistance: React.Dispatch<React.SetStateAction<CircleDistance>>;
}

const DistancePick = ({ circleDistance, setCircleDistance }: DistancePickProps) => {
  const handleDistanceChange = (text: string) => {
    if (text === "") {
      text = "0";
    }
    setCircleDistance({
      latitude: 55,
      longitude: 5,
      distance: parseInt(text.replace(/[^0-9]/g, "")),
    });
  };

  return (
    <View>
      <Text>Distance (in km)</Text>
      <TextInput
        keyboardType="numeric"
        onChangeText={(text) => handleDistanceChange(text)}
        value={circleDistance.distance.toString()}
        maxLength={10} //setting limit of input
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default DistancePick;
