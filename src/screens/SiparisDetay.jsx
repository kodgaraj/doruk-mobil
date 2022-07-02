import { View, Text } from "react-native";
import React, { useEffect } from "react";
import GeriButon from "../components/GeriButon";

const SiparisDetay = ({ route, navigation }) => {
  return (
    <>
      <GeriButon navigation={navigation} />
      <View>
        <Text>{JSON.stringify(route.params)}</Text>
      </View>
    </>
  );
};

export default SiparisDetay;
