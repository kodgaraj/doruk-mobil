import { View, Text, Button } from "react-native";
import React from "react";
import { StackActions } from "@react-navigation/native";

export default function Siparisler({ navigation }) {
  const handleDetails = () => {
    const pushAction = StackActions.push("Home", { user: "Wojtek" });
    navigation.dispatch(pushAction);
  };

  return (
    <View>
      <Text>Siparişler</Text>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
        <Button title="Go to Details... again" onPress={handeDetails} />
      </View>
    </View>
  );
}
