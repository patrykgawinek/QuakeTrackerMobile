import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { MagnitudeRange } from "../../types";

interface MagnitudePickProps {
  magnitudeRange: MagnitudeRange;
  setMagnitudeRange: React.Dispatch<React.SetStateAction<MagnitudeRange>>;
}

const MagnitudePick = ({ magnitudeRange, setMagnitudeRange }: MagnitudePickProps) => {
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(false);
  const enableScroll = () => setScrollEnabled(true);
  const disableScroll = () => setScrollEnabled(false);

  return (
    <View>
      <Text>Magnitude</Text>
      <Text>Min: {magnitudeRange.minimum.toFixed(1)}</Text>
      <Text>Max: {magnitudeRange.maximum.toFixed(1)}</Text>
      <ScrollView scrollEnabled={scrollEnabled}>
        <MultiSlider
          values={[magnitudeRange.minimum, magnitudeRange.maximum]}
          onValuesChangeStart={disableScroll}
          onValuesChangeFinish={enableScroll}
          onValuesChange={(values) => {
            setMagnitudeRange({ minimum: values[0], maximum: values[1] });
          }}
          enableLabel
          allowOverlap
          snapped={true}
          min={-1}
          max={10}
          step={0.1}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default MagnitudePick;
