import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import {
  Card,
  List,
  Chip,
  Avatar,
  useTheme,
  Button,
  Divider,
  Badge,
  TouchableRipple,
} from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

// Components
import GeriButon from "../components/GeriButon";
import Loading from "../components/Loading";

// Utils
import axios from "../utils/Axios";
import moment from "../utils/Moment";

// Config
import { API_URL } from "../config";

export default function Islemler({ navigation, route }) {
  const theme = useTheme();
  const { tekrarEdenIslemler = undefined } = route.params || {};

  const [islemler, setIslemler] = useState({
    veriler: {},
    yukleniyor: !tekrarEdenIslemler,
  });

  const islemleriGetir = async (url = "/IsilIslem/islemler") => {
    setIslemler({ ...islemler, yukleniyor: true });
    try {
      const response = await axios.get(url);

      if (!response.data.durum) {
        setIslemler({
          veriler: {},
          yukleniyor: false,
        });
        return alert(response.data.mesaj);
      }

      setIslemler({
        veriler: response.data.islemler,
        yukleniyor: false,
      });
    } catch (error) {
      console.log(error);
      setIslemler({
        veriler: {},
        yukleniyor: false,
      });
    }
  };

  const Sticky = () => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 10,
        }}
      >
        <Button
          icon="chevron-left"
          mode="contained"
          style={styles.buton}
          onPress={() => {
            getSiparisler(islemler.veriler.prev_page_url);
          }}
          disabled={islemler.veriler.prev_page_url == null}
        />
        <View
          style={{ flex: 3, justifyContent: "center", alignItems: "center" }}
        >
          <Text>
            {islemler.veriler.current_page}/{islemler.veriler.last_page}
          </Text>
          <Text>Toplam {islemler.veriler.total} Kayıt</Text>
        </View>
        <Button
          contentStyle={{ flexDirection: "row-reverse" }}
          icon="chevron-right"
          mode="contained"
          style={styles.buton}
          onPress={() => {
            getSiparisler(islemler.veriler.next_page_url);
          }}
          disabled={islemler.veriler.next_page_url == null}
        />
      </View>
    );
  };

  const resimAc = (resimYolu) => {
    const resim = API_URL + (resimYolu ? "/" + resimYolu : "/no-image.jpg");
    navigation.navigate("ResimOnizleme", { resim });
  };

  const islemDetayAc = (islemId) => {
    navigation.navigate("IslemDetay", { islemId });
  };

  const tekrarEdenIslemleriAc = (tekrarEdenIslemler) => {
    navigation.push("Islemler", { tekrarEdenIslemler });
  };

  useEffect(() => {
    if (tekrarEdenIslemler) {
      setIslemler({
        veriler: {
          data: tekrarEdenIslemler,
        },
        yukleniyor: false,
      });
    } else {
      islemleriGetir();
    }
  }, []);

  return (
    <>
      {/* <Text>{tekrarEdenIslemler}</Text> */}
      {tekrarEdenIslemler && (
        <GeriButon
          navigation={navigation}
          title="Tekrar Eden İşlemler"
          headerRight={() => <View />}
        />
      )}
      <View style={{ flex: 1, padding: 5 }}>
        <ScrollView style={{ marginBottom: 50 }}>
          {islemler.yukleniyor ? (
            <Loading />
          ) : (
            <View>
              {islemler.veriler?.data?.map((islem, index) => (
                <>
                  <View
                    key={index + "view"}
                    style={
                      islem.tekrarEdenIslemler?.length > 0
                        ? { borderColor: theme.colors.danger, borderWidth: 1 }
                        : {}
                    }
                  >
                    <List.Accordion
                      key={index + "list"}
                      title={islem.siparisAdi}
                      description={
                        moment(islem.tarih).format("L") + " - " + islem.firmaAdi
                      }
                      left={(props) => (
                        <Avatar.Text
                          key={index + "avatar"}
                          label={islem.id}
                          size={36}
                        />
                      )}
                      style={styles.accordionBg}
                    >
                      <List.Item
                        onPress={() => islemDetayAc(islem.id)}
                        title="Detay"
                        key={index + "detay"}
                        style={styles.accordionBg}
                        right={(props) => (
                          <Button
                            onPress={() => islemDetayAc(islem.id)}
                            title="Resmi Görüntüle"
                          >
                            DETAY
                          </Button>
                        )}
                      />
                      <List.Item
                        onPress={() => resimAc(islem.resimYolu)}
                        title="Resim"
                        key={index + "resim"}
                        style={styles.accordionBg}
                        right={(props) => (
                          <Button
                            onPress={() => resimAc(islem.resimYolu)}
                            title="Resmi Görüntüle"
                          >
                            RESMİ GÖRÜNTÜLE
                          </Button>
                        )}
                      />
                      <List.Item
                        title="İşlem Durumu"
                        key={index + "islem-durumu"}
                        style={styles.accordionBg}
                        right={(props) => (
                          <Text style={styles.itemText}>
                            {islem.islemDurumuAdi}
                          </Text>
                        )}
                      />
                      <List.Item
                        title="İşlem Gördüğü Fırın"
                        key={index + "islem-goruldugu-firin"}
                        style={styles.accordionBg}
                        right={(props) => (
                          <Text style={styles.itemText}>
                            {islem.firinAdi ?? "-"}
                          </Text>
                        )}
                      />
                      <List.Item
                        title="Sipariş Tarihi"
                        key={index + "siparis-tarihi"}
                        style={styles.accordionBg}
                        right={(props) => (
                          <Text style={styles.itemText}>
                            {moment(islem.siparisTarihi).format("L")}
                          </Text>
                        )}
                      />
                      <List.Item
                        title="Sipariş No"
                        key={index + "siparis-no"}
                        style={styles.accordionBg}
                        right={(props) => (
                          <Text style={styles.itemText}>
                            {islem.siparisNo ?? "-"}
                          </Text>
                        )}
                      />
                      {/* <List.Item
                      title="İşlem Türü"
                      key={index + "islem-turu"}
                      style={styles.accordionBg}
                      right={(props) => (
                        <Text style={styles.itemText}>
                          {islem.islemTuruAdi ?? "-"}
                        </Text>
                      )}
                    /> */}
                      <List.Item
                        title="Termin Süresi"
                        key={index + "termin-suresi"}
                        style={styles.accordionBg}
                        right={(props) => (
                          <View
                            key={index + "termin-suresi-view"}
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Badge
                              key={index + "termin-suresi-badge"}
                              size={30}
                              style={{
                                backgroundColor:
                                  theme.colors[islem.gecenSureRenk],
                                paddingHorizontal: 5,
                                fontSize: 14,
                                color: "#ffffff",
                                marginRight: 5,
                              }}
                            >
                              {islem.gecenSure + " gün"}
                            </Badge>
                            <Text
                              key={index + "termin-suresi-text"}
                              style={styles.yaziIcerik}
                            >
                              / {islem.terminSuresi} gün
                            </Text>
                          </View>
                        )}
                      />
                      <List.Item
                        title="Beklenen Süre"
                        key={index + "beklenen-sure"}
                        style={styles.accordionBg}
                        right={(props) => (
                          <Text style={styles.itemText}>
                            {islem.beklenenSure ?? "-"}
                          </Text>
                        )}
                      />
                      <List.Item
                        title="Çıkış Süresi"
                        key={index + "cikis-suresi"}
                        style={styles.accordionBg}
                        right={(props) => (
                          <Text style={styles.itemText}>
                            {islem.cikisSuresi ?? "-"}
                          </Text>
                        )}
                      />
                      <List.Item
                        title="Kalite"
                        key={index + "kalite"}
                        style={styles.accordionBg}
                        right={(props) => (
                          <Text style={styles.itemText}>
                            {islem.kalite ?? "-"}
                          </Text>
                        )}
                      />
                      <List.Item
                        title="Carbon"
                        key={index + "carbon"}
                        style={styles.accordionBg}
                        right={(props) => (
                          <Text style={styles.itemText}>
                            {islem.carbon ?? "-"}
                          </Text>
                        )}
                      />
                      <List.Item
                        title="Sıcaklık"
                        key={index + "sicaklik"}
                        style={styles.accordionBg}
                        right={(props) => (
                          <Text style={styles.itemText}>
                            {islem.sicaklik ?? "-"}
                          </Text>
                        )}
                      />
                      <List.Item
                        title="Menevis Sıcaklığı"
                        key={index + "menevis-sicaklik"}
                        style={styles.accordionBg}
                        right={(props) => (
                          <Text style={styles.itemText}>
                            {islem.menevisSicakligi ?? "-"}
                          </Text>
                        )}
                      />
                      <List.Item
                        title="İstenilen Sertlik"
                        key={index + "istenilen-sertlik"}
                        style={styles.accordionBg}
                        right={(props) => (
                          <Text style={styles.itemText}>
                            {islem.istenilenSertlik ?? "-"}
                          </Text>
                        )}
                      />
                      <List.Item
                        title="Çıkış Sertliği"
                        key={index + "cikis-sertlik"}
                        style={styles.accordionBg}
                        right={(props) => (
                          <Text style={styles.itemText}>
                            {islem.cikisSertligi ?? "-"}
                          </Text>
                        )}
                      />
                      <List.Item
                        title="Son Sertlik"
                        key={index + "son-sertlik"}
                        style={styles.accordionBg}
                        right={(props) => (
                          <Text style={styles.itemText}>
                            {islem.sonSertlik ?? "-"}
                          </Text>
                        )}
                      />
                      <List.Item
                        title="Açıklama"
                        key={index + "aciklama"}
                        style={styles.accordionBg}
                        right={(props) => (
                          <Text style={styles.itemText}>
                            {islem.aciklama ?? "-"}
                          </Text>
                        )}
                      />
                    </List.Accordion>
                  </View>
                  {islem.tekrarEdenIslemler?.length > 0 ? (
                    <>
                      <TouchableRipple
                        onPress={() =>
                          tekrarEdenIslemleriAc(islem.tekrarEdenIslemler)
                        }
                        rippleColor="rgba(0, 0, 0, .32)"
                      >
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: theme.colors.danger,
                          }}
                        >
                          <Text style={{ color: "white" }}>
                            Tekrar Eden İşlemler
                          </Text>
                          <FontAwesome5
                            style={{ marginLeft: 5 }}
                            name={"angle-right"}
                            size={20}
                            color="white"
                          />
                        </View>
                      </TouchableRipple>
                    </>
                  ) : null}
                  <View style={{ marginVertical: 3 }} key={index + "view 2"} />
                </>
              ))}
            </View>
          )}
        </ScrollView>
        {!tekrarEdenIslemler?.length && <Sticky />}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  accordionBg: {
    backgroundColor: "#dddddd",
  },
  itemText: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 3,
  },
  itemBadge: {
    paddingHorizontal: 10,
    fontSize: 14,
    color: "#ffffff",
  },
  buton: {
    color: "#Fffffff",
    flex: 1,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
