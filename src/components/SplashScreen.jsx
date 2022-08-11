import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React, { memo } from "react";
import { ActivityIndicator } from "react-native-paper";

function SplashScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/splash.png")}
        style={styles.image}
        resizeMode="contain"
      >
        <ActivityIndicator animating={true} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // backgroundColor: "rgba(0,0,0,0.5)",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});

export default memo(SplashScreen);
