import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Card, List, Avatar, useTheme, Badge } from "react-native-paper";

// Components
import GeriButon from "../components/GeriButon";
import Loading from "../components/Loading";

// Utils
import axios from "../utils/Axios";
import moment from "../utils/Moment";

// Config
import { API_URL } from "../config";

const FormDetay = (props) => {
  const theme = useTheme();
  const { navigation, route } = props;
  const { form } = route.params;
  const [yukleniyor, setYukleniyor] = useState(false);
  const [formBilgileri, setFormBilgileri] = useState({
    veriler: [],
    yukleniyor: false,
  });

  const resimAc = (resim) => {
    navigation.navigate("ResimOnizleme", { resim });
  };

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
          <>
            {formBilgileri.veriler.map((firin, index) => {
              const sarjlar = Object.values(firin.sarjlar);
              return (
                <>
                  <Card style={styles.card}>
                    <Card.Title
                      title={firin.firinAdi}
                      right={(props) => (
                        <Badge
                          style={{
                            margin: 10,
                            backgroundColor: theme.colors[firin.firinJson.renk],
                          }}
                        >
                          {firin.firinKodu}
                        </Badge>
                      )}
                    />
                    <Card.Content>
                      {sarjlar.map((sarj, index) => {
                        const islemler = Object.values(sarj.islemler);
                        return (
                          <>
                            <Card>
                              <Card.Title title={sarj.sarj + ".Şarj"} />
                              <Card.Content>
                                {islemler.map((islem, index) => {
                                  const resim =
                                    API_URL +
                                    (islem.resimYolu
                                      ? "/" + islem.resimYolu
                                      : "/no-image.jpg");
                                  return (
                                    <>
                                      <List.Accordion
                                        title={islem.firmaAdi}
                                        description={islem.malzemeAdi}
                                        left={() => (
                                          <Badge
                                            style={{
                                              backgroundColor:
                                                theme.colors[
                                                  islem.gecenSureRenk
                                                ],
                                              alignSelf: "center",
                                            }}
                                          >
                                            {islem.gecenSure + " gün"}
                                          </Badge>
                                        )}
                                        style={styles.accordionBg}
                                      >
                                        <List.Item
                                          title="İşlem Durumu"
                                          style={styles.accordionBg}
                                          right={(props) => (
                                            <Text style={styles.itemText}>
                                              {islem.islemDurumAdi}
                                            </Text>
                                          )}
                                        />
                                        <List.Item
                                          title="Sipariş Tarihi"
                                          style={styles.accordionBg}
                                          right={(props) => (
                                            <Text style={styles.itemText}>
                                              {moment(
                                                islem.siparisTarihi
                                              ).format("L")}
                                            </Text>
                                          )}
                                        />
                                        <List.Item
                                          title="Sipariş No"
                                          style={styles.accordionBg}
                                          right={(props) => (
                                            <Text style={styles.itemText}>
                                              {islem.siparisNo ?? "-"}
                                            </Text>
                                          )}
                                        />
                                        <List.Item
                                          title="İşlem Türü"
                                          style={styles.accordionBg}
                                          right={(props) => (
                                            <Text style={styles.itemText}>
                                              {islem.islemTuruAdi ?? "-"}
                                            </Text>
                                          )}
                                        />
                                        <List.Item
                                          title="Termin Süresi"
                                          style={styles.accordionBg}
                                          right={(props) => (
                                            <Text style={styles.itemText}>
                                              {islem.terminSuresi ?? "-"}
                                            </Text>
                                          )}
                                        />
                                        <List.Item
                                          title="Beklenen Süre"
                                          style={styles.accordionBg}
                                          right={(props) => (
                                            <Text style={styles.itemText}>
                                              {islem.beklenenSure ?? "-"}
                                            </Text>
                                          )}
                                        />
                                        <List.Item
                                          title="Çıkış Süresi"
                                          style={styles.accordionBg}
                                          right={(props) => (
                                            <Text style={styles.itemText}>
                                              {islem.cikisSuresi ?? "-"}
                                            </Text>
                                          )}
                                        />
                                        <List.Item
                                          title="Kalite"
                                          style={styles.accordionBg}
                                          right={(props) => (
                                            <Text style={styles.itemText}>
                                              {islem.kalite ?? "-"}
                                            </Text>
                                          )}
                                        />
                                        <List.Item
                                          title="Carbon"
                                          style={styles.accordionBg}
                                          right={(props) => (
                                            <Text style={styles.itemText}>
                                              {islem.carbon ?? "-"}
                                            </Text>
                                          )}
                                        />
                                        <List.Item
                                          title="Sıcaklık"
                                          style={styles.accordionBg}
                                          right={(props) => (
                                            <Text style={styles.itemText}>
                                              {islem.sicaklik ?? "-"}
                                            </Text>
                                          )}
                                        />
                                        <List.Item
                                          title="Menevis Sıcaklığı"
                                          style={styles.accordionBg}
                                          right={(props) => (
                                            <Text style={styles.itemText}>
                                              {islem.menevisSicakligi ?? "-"}
                                            </Text>
                                          )}
                                        />
                                        <List.Item
                                          title="İstenilen Sertlik"
                                          style={styles.accordionBg}
                                          right={(props) => (
                                            <Text style={styles.itemText}>
                                              {islem.istenilenSertlik ?? "-"}
                                            </Text>
                                          )}
                                        />
                                        <List.Item
                                          title="Çıkış Sertliği"
                                          style={styles.accordionBg}
                                          right={(props) => (
                                            <Text style={styles.itemText}>
                                              {islem.cikisSertligi ?? "-"}
                                            </Text>
                                          )}
                                        />
                                        <List.Item
                                          title="Son Sertlik"
                                          style={styles.accordionBg}
                                          right={(props) => (
                                            <Text style={styles.itemText}>
                                              {islem.sonSertlik ?? "-"}
                                            </Text>
                                          )}
                                        />
                                        <List.Item
                                          onPress={() => resimAc(resim)}
                                          title="Resim"
                                          style={styles.accordionBg}
                                          right={(props) => (
                                            <Button
                                              onPress={() => resimAc(resim)}
                                              title="Resmi Görüntüle"
                                            ></Button>
                                          )}
                                        />
                                        <List.Item
                                          title="Açıklama"
                                          style={styles.accordionBg}
                                          right={(props) => (
                                            <Text style={styles.itemText}>
                                              {islem.aciklama ?? "-"}
                                            </Text>
                                          )}
                                        />
                                      </List.Accordion>
                                    </>
                                  );
                                })}
                              </Card.Content>
                            </Card>
                          </>
                        );
                      })}
                    </Card.Content>
                  </Card>
                </>
              );
            })}
          </>
        </ScrollView>
      )}
    </>
  );
};

export default FormDetay;

const styles = StyleSheet.create({
  accordionBg: {
    backgroundColor: "#dddddd",
    borderRadius: 5,
    marginBottom: 5,
  },
  itemText: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 5,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginBottom: 15,
  },
});
