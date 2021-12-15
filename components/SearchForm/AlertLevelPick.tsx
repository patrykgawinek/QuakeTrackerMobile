import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, TextStyle } from "react-native";
import { AlertLevel } from "../../types";
import RadioButton from "./RadioButton";

interface AlertLevelPickProps {
  titleStyle: StyleProp<TextStyle>;
  textStyle: StyleProp<TextStyle>;
  alertLevel: AlertLevel;
  setAlertLevel: React.Dispatch<React.SetStateAction<AlertLevel>>;
}

const AlertLevelPick = ({
  titleStyle,
  textStyle,
  alertLevel,
  setAlertLevel,
}: AlertLevelPickProps) => {
  //Get numeric values of enum dynamically
  const alertLevelValues = Object.keys(AlertLevel)
    .filter((value) => !isNaN(Number(value)))
    .map((value) => parseInt(value));

  return (
    <View style={styles.container}>
      <View>
        <Text style={titleStyle}>Alert Level</Text>
      </View>
      <View>
        {alertLevelValues.map((value) => (
          <TouchableOpacity
            onPress={() => {
              setAlertLevel(value);
            }}
            key={value}
            style={styles.alertOption}
          >
            <RadioButton selected={alertLevel === value} />
            <Text style={[textStyle, styles.radioButtonLabel]}>{AlertLevel[value]}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
  },
  alertOption: {
    display: "flex",
    flexDirection: "row",
  },
  radioButtonLabel: {
    marginLeft: 5,
    marginBottom: 10,
  },
});

export default AlertLevelPick;
