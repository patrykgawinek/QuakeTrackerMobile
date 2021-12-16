import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { SingleFeatureContext } from "../context/SingleFeatureContext";

interface FeatureWebViewProps {
  url: string;
}

const FeatureWebView = ({ url }: FeatureWebViewProps) => {
  const { baseUrlApi, selectedFeature } = useContext(SingleFeatureContext);

  return (
    <View style={styles.container}>
      <WebView
        style={styles.webViewStyle}
        source={{ uri: `${baseUrlApi}/earthquakes/eventpage/${selectedFeature}` }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webViewStyle: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
});

export default FeatureWebView;
