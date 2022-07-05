import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Paragraph, Title, Button } from "react-native-paper";

// Components
import GeriButon from "../components/GeriButon";
import Loading from "../components/Loading";

// Utils
import axios from "../utils/Axios";

const FormDetay = (props) => {
  const { navigation, route } = props;
  const { form } = route.params;
  const [yukleniyor, setYukleniyor] = useState(false);
  const [formBilgileri, setFormBilgileri] = useState({
    veriler: [],
    yukleniyor: false,
  });

  const firinSarjGrupluIslemleriGetir = () => {
    setYukleniyor(true);

    setFormBilgileri({
      ...formBilgileri,
      yukleniyor: true,
    });

    axios
      .get("/isilIslem/firinSarjGrupluIslemleriGetir", {
        params: {
          formId: form.id,
        },
      })
      .then((response) => {
        if (!response.data.durum) {
          setFormBilgileri({
            ...formBilgileri,
            yukleniyor: false,
          });
          setYukleniyor(false);
          return alert(response.data.mesaj);
        }

        setFormBilgileri({
          ...formBilgileri,
          yukleniyor: false,
          veriler: response.data.firinSarjGrupluIslemler,
        });
        setYukleniyor(false);
      })
      .catch((error) => {
        setFormBilgileri({
          ...formBilgileri,
          yukleniyor: false,
        });
        console.log(error);
        setYukleniyor(false);
        alert("Hata oluştu!");
      });
  };

  useEffect(() => {
    firinSarjGrupluIslemleriGetir();
  }, []);

  return (
    <>
      <GeriButon
        navigation={navigation}
        title={form.takipNo}
        headerRight={() => <View />}
      />
      {yukleniyor ? (
        <Loading key={"loading"} style={{ marginTop: 15 }} />
      ) : (
        <ScrollView style={styles.container} key="bilgiler">
          <View>
            <Card>
              <Card.Title
                title="Card Title"
                subtitle="Card Subtitle"
              />
              <Card.Content>
                <Title>Card title</Title>
                <Paragraph>Card content</Paragraph>
              </Card.Content>
              <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
              <Card.Actions>
                <Button>Cancel</Button>
                <Button>Ok</Button>
              </Card.Actions>
            </Card>
          </View>
          <View>
            <Text>{JSON.stringify(formBilgileri)}</Text>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default FormDetay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
