import React from "react";
import { View, Text } from "react-native";
import { AlertLevel } from "../../types";
import RadioButton from "../RadioButton/RadioButton";

interface AlertLevelPickProps {
  alertLevel: AlertLevel;
  setAlertLevel: React.Dispatch<React.SetStateAction<AlertLevel>>;
}

const AlertLevelPick = ({ alertLevel, setAlertLevel }: AlertLevelPickProps) => {
  return (
    <View>
      <Text>Alert Level</Text>
      {(Object.keys(AlertLevel) as Array<keyof typeof AlertLevel>).map((key) => (
        <View key={key}>
          <RadioButton selected={true} />
          <Text>{key}</Text>
        </View>
      ))}
    </View>
  );
};

export default AlertLevelPick;
