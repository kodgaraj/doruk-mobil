import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    // backgroundColor: "rgba(0,0,0,0.5)",
  },
});
