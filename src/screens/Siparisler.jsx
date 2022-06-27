import { View, Text, Button } from "react-native";
import React from "react";

export default function Siparisler({ navigation }) {
  return (
    <View>
      <Text>Siparişler</Text>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => navigation.push("Home")}
        />
      </View>
    </View>
  );
}
