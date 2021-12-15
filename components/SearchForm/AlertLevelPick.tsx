import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AlertLevel } from "../../types";
import RadioButton from "./RadioButton";

interface AlertLevelPickProps {
  alertLevel: AlertLevel;
  setAlertLevel: React.Dispatch<React.SetStateAction<AlertLevel>>;
}

const AlertLevelPick = ({ alertLevel, setAlertLevel }: AlertLevelPickProps) => {
  //Get numeric values of enum dynamically
  const alertLevelValues = Object.keys(AlertLevel)
    .filter((value) => !isNaN(Number(value)))
    .map((value) => parseInt(value));

  return (
    <View>
      <Text>Alert Level</Text>
      {alertLevelValues.map((value) => (
        <TouchableOpacity
          onPress={() => {
            setAlertLevel(value);
          }}
        >
          <RadioButton selected={alertLevel === value} />
          <Text>{AlertLevel[value]}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({});

export default AlertLevelPick;
