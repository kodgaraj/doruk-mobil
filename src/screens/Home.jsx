import { View, Text, StyleSheet } from "react-native";
import axios from "../utils/Axios";
import { useState, useEffect } from "react";
import { Avatar, Card, IconButton, Title } from "react-native-paper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Loading from "../components/Loading";

function Home({ route, navigation }) {
  const [toplamSiparis, setToplamSiparis] = useState({
    toplamSiparis: 0,
    yukleniyor: false,
  });
  const [toplamKullanici, setToplamKullanici] = useState({
    toplamKullanici: 0,
    yukleniyor: false,
  });
  const [toplamIslem, setToplamIslem] = useState({
    toplamIslem: 0,
    yukleniyor: false,
  });

  const getToplamSiparis = async () => {
    setToplamSiparis({ ...toplamSiparis, yukleniyor: true });
    try {
      const response = await axios.get("/siparis/toplamSiparis");
      setToplamSiparis({
        toplamSiparis: response.data.toplamSiparis,
        yukleniyor: false,
      });
    } catch (error) {
      console.log(error);
      setToplamSiparis({
        toplamSiparis: 0,
        yukleniyor: false,
      });
    }
  };

  const getToplamKullanici = async () => {
    setToplamKullanici({ ...toplamKullanici, yukleniyor: true });
    try {
      const response = await axios.get("/kullanicilar/toplamKullanici");
      setToplamKullanici({
        toplamKullanici: response.data.toplamKullanici,
        yukleniyor: false,
      });
    } catch (error) {
      console.log(error);
      setToplamKullanici({
        toplamKullanici: 0,
        yukleniyor: false,
      });
    }
  };

  const getToplamIslem = async () => {
    setToplamIslem({ ...toplamIslem, yukleniyor: true });
    try {
      const response = await axios.get("/isilIslem/toplamIslem");
      setToplamIslem({
        toplamIslem: response.data.toplamIslem,
        yukleniyor: false,
      });
    } catch (error) {
      console.log(error);
      setToplamIslem({
        toplamIslem: 0,
        yukleniyor: false,
      });
    }
  };

  useEffect(() => {
    getToplamSiparis();
    getToplamKullanici();
    getToplamIslem();
  }, []);

  return (
    <View style={styles.sayfa}>
      <Card
        onPress={() => {
          navigation.replace("Siparisler");
        }}
        style={styles.kart}
      >
        <Card.Title
          title="Siparişler"
          left={(props) => (
            <Avatar.Icon
              {...props}
              icon={({ focused, color, size }) => (
                <FontAwesome5 name={"wpforms"} size={size} color={color} />
              )}
            />
          )}
          right={(props) =>
            toplamSiparis.yukleniyor ? (
              <Loading style={styles.toplamYazi} />
            ) : (
              <Title {...props} style={styles.toplamYazi}>
                {toplamSiparis.toplamSiparis}
              </Title>
            )
          }
        />
      </Card>
      <Card style={styles.kart}>
        <Card.Title
          title="Kullanıcılar"
          left={(props) => (
            <Avatar.Icon
              {...props}
              icon={({ focused, color, size }) => (
                <FontAwesome5 name={"users"} size={size} color={color} />
              )}
            />
          )}
          right={(props) =>
            toplamKullanici.yukleniyor ? (
              <Loading style={styles.toplamYazi} />
            ) : (
              <Title style={styles.toplamYazi}>
                {toplamKullanici.toplamKullanici}
              </Title>
            )
          }
        />
      </Card>
      <Card style={styles.kart}>
        <Card.Title
          title="İşlemler"
          left={(props) => (
            <Avatar.Icon
              {...props}
              icon={({ focused, color, size }) => (
                <FontAwesome5 name={"spinner"} size={size} color={color} />
              )}
            />
          )}
          right={(props) =>
            toplamIslem.yukleniyor ? (
              <Loading style={styles.toplamYazi} />
            ) : (
              <Title style={styles.toplamYazi}>{toplamIslem.toplamIslem}</Title>
            )
          }
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  sayfa: {
    flex: 1,
    padding: 10,
  },
  kart: {
    marginTop: 10,
  },
  toplamYazi: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 20,
  },
});

export default Home;
