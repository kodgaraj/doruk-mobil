import { View, Image, StyleSheet } from "react-native";
import React from "react";

import GeriButon from "../components/GeriButon";

const ResimOnizleme = ({ navigation, route }) => {
  const { resim } = route.params;
  return (
    <>
      <GeriButon
        navigation={navigation}
        title="Resim Önizleme"
        headerRight={() => <View />}
      />
      <View style={styles.container}>
        <Image
          source={{
            uri: resim,
          }}
          style={styles.image}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ResimOnizleme;
