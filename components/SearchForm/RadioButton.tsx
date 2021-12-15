import React from "react";
import { View, StyleSheet } from "react-native";

interface RadioButtonProps {
  selected: boolean;
}

const RadioButton = ({ selected }: RadioButtonProps) => {
  return (
    <View style={styles.radioButton}>{selected ? <View style={styles.selected} /> : null}</View>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  selected: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#000",
  },
});

export default RadioButton;
