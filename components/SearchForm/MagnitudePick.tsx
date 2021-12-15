import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, StyleProp, TextStyle } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { MagnitudeRange } from "../../types";

interface MagnitudePickProps {
  titleStyle: StyleProp<TextStyle>;
  textStyle: StyleProp<TextStyle>;
  magnitudeRange: MagnitudeRange;
  setMagnitudeRange: React.Dispatch<React.SetStateAction<MagnitudeRange>>;
}

const MagnitudePick = ({
  titleStyle,
  textStyle,
  magnitudeRange,
  setMagnitudeRange,
}: MagnitudePickProps) => {
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(false);
  const enableScroll = () => setScrollEnabled(true);
  const disableScroll = () => setScrollEnabled(false);

  const handleMinimumChange = (text: string) => {
    let value = text === "" ? 0 : parseInt(text);
    if (value > magnitudeRange.maximum) {
      value = magnitudeRange.maximum;
    }
    setMagnitudeRange({ minimum: parseInt(text), maximum: magnitudeRange.maximum });
  };
  const handleMaximumChange = (text: string) => {
    let value = text === "" ? 0 : parseInt(text);
    if (value < magnitudeRange.minimum) {
      value = magnitudeRange.minimum;
    }
    setMagnitudeRange({
      minimum: magnitudeRange.minimum,
      maximum: parseInt(text),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={titleStyle}>Magnitude</Text>
      <View style={styles.magnitudeContainer}>
        <View style={styles.magnitudeValueBlock}>
          <Text style={textStyle}>{(Math.round(magnitudeRange.minimum * 10) / 10).toFixed(1)}</Text>
        </View>
        <View>
          <ScrollView scrollEnabled={scrollEnabled}>
            <MultiSlider
              values={[magnitudeRange.minimum, magnitudeRange.maximum]}
              onValuesChangeStart={disableScroll}
              onValuesChangeFinish={enableScroll}
              onValuesChange={(values) => {
                setMagnitudeRange({
                  minimum: Math.round(values[0] * 10) / 10,
                  maximum: Math.round(values[1] * 10) / 10,
                });
              }}
              allowOverlap
              snapped={true}
              min={-1}
              max={10}
              step={0.1}
            />
          </ScrollView>
        </View>
        <View style={styles.magnitudeValueBlock}>
          <Text style={textStyle}>{(Math.round(magnitudeRange.maximum * 10) / 10).toFixed(1)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  magnitudeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  magnitudeValueBlock: {
    width: 35,
  },
});

export default MagnitudePick;
