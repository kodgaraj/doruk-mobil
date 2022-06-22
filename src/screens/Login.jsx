import { useState } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  TextInput,
} from "react-native-paper";
import { useDispatch } from 'react-redux';
import { login } from "../stores/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = () => {
    const payload = {
      email,
      password,
    };

    dispatch(login(payload));
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTg3OTJ8MHwxfGNvbGxlY3Rpb258NXw4NGNVeS0wS1pTUXx8fHx8Mnx8MTY1NTc5ODQ3MQ&ixlib=rb-1.2.1&q=80&w=1080",
        }}
        resizeMode="cover"
        style={styles.image}
      >
        <Card elevation={5} style={styles.card}>
          <View style={styles.coverContainer}>
            <ImageBackground
              source={{
                uri: "https://doruk.kodgaraj.com/img/doruk-logo.png",
              }}
              resizeMode="contain"
              style={styles.cover}
            />
          </View>
          <Card.Content style={styles.row}>
            <Title>Giriş Yap</Title>
          </Card.Content>
          <Card.Content style={styles.column}>
            <View style={styles.input}>
              <TextInput
                label="E-posta"
                value={email}
                dense
                onChange={(text) => {
                  setEmail(text);
                }}
              ></TextInput>
            </View>
            <View style={styles.input}>
              <TextInput
                label="Şifre"
                value={password}
                dense
                secureTextEntry={!showPassword}
                onChange={(text) => {
                  setPassword(text);
                }}
                right={
                  password && <TextInput.Icon
                    name={!showPassword ? "eye" : "eye-off"}
                    onPress={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                }
              ></TextInput>
            </View>
          </Card.Content>
          <Card.Actions style={styles.row}>
            <Button
              mode="contained"
              onPress={handleLogin}
            >
              GİRİŞ YAP
            </Button>
          </Card.Actions>
        </Card>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  column: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    padding: 10,
    width: "80%",
    backgroundColor: "#DDDDDDBB",
    borderRadius: 24,
  },
  input: {
    width: "100%",
    marginBottom: 10,
  },
  cover: {
    width: "100%",
    height: 100,
    backgroundSize: "contain",
    backgroundColor: "transparent",
  },
  coverContainer: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default Login;
