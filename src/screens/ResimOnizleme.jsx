import {
  View,
  Image,
  StyleSheet,
  Text,
  Animated,
  Dimensions,
} from "react-native";
import React from "react";
import { PinchGestureHandler, State } from "react-native-gesture-handler";

// Components
import GeriButon from "../components/GeriButon";

const screen = Dimensions.get("window");

const ResimOnizleme = ({ navigation, route }) => {
  const { resim } = route.params;

  const scale = new Animated.Value(1);

  const onPinchEvent = Animated.event(
    [
      {
        nativeEvent: { scale },
      },
    ],
    {
      useNativeDriver: true,
    }
  );

  const onPinchStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <>
      <GeriButon
        navigation={navigation}
        title="Resim Önizleme"
        headerRight={() => <View />}
      />
      {/* <View style={styles.container}>
        <Image
          resizeMode="contain"
          source={{
            uri: resim,
          }}
          style={styles.image}
        />
      </View> */}
      <View style={styles.container}>
        <PinchGestureHandler
          onGestureEvent={onPinchEvent}
          onHandlerStateChange={onPinchStateChange}
        >
          <Animated.Image
            source={{ uri: resim }}
            style={{
              width: screen.width,
              height: 300,
              transform: [{ scale: scale }],
            }}
            resizeMode="contain"
          />
        </PinchGestureHandler>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ResimOnizleme;
