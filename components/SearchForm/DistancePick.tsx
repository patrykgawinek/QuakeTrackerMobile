import React from "react";
import { View, Text, TextInput, StyleSheet, StyleProp, TextStyle } from "react-native";
import { CircleDistance } from "../../types";

interface DistancePickProps {
  titleStyle: StyleProp<TextStyle>;
  textStyle: StyleProp<TextStyle>;
  circleDistance: CircleDistance;
  setCircleDistance: React.Dispatch<React.SetStateAction<CircleDistance>>;
}

const DistancePick = ({
  titleStyle,
  textStyle,
  circleDistance,
  setCircleDistance,
}: DistancePickProps) => {
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
    <View style={styles.container}>
      <Text style={titleStyle}>Distance (in km)</Text>
      <TextInput
        keyboardType="numeric"
        style={[textStyle, styles.distanceInput]}
        onChangeText={handleDistanceChange}
        value={circleDistance.distance.toString()}
        maxLength={10} //setting limit of input
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  distanceInput: {
    flex: 1,
    textAlign: "center",
    backgroundColor: "#FFF",
    padding: 2,
    borderRadius: 10,
  },
});

export default DistancePick;
