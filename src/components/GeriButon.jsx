import { useLayoutEffect } from "react";
import { Button } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const GeriButon = (props) => {
  const { navigation } = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: "true",
      headerLeft: () => (
        <Button
          onPress={() => navigation.goBack()}
          icon={() => (
            <FontAwesome5 name={"arrow-left"} size={20} color={"white"} />
          )}
          style={{ marginLeft: -10 }}
        />
      ),
      ...props,
    });
  }, []);

  return <></>;
};

export default GeriButon;
