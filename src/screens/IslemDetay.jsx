import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import {
  useTheme,
  Badge,
  List,
  Avatar,
  TouchableRipple,
} from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";

// Config
import { API_URL } from "../config";

// Utils
import axios from "../utils/Axios";
import moment from "../utils/Moment";

// Components
import GeriButon from "../components/GeriButon";
import Loading from "../components/Loading";

const IslemDetay = ({ route, navigation }) => {
  const theme = useTheme();
  const { islemId } = route.params;
  const [islemBilgileri, setIslemBilgileri] = useState({
    veriler: {},
    yukleniyor: true,
  });

  const resimAc = (resim) => {
    navigation.navigate("ResimOnizleme", { resim: resim });
  };

  const islemDetayGetir = async () => {
    try {
      const response = await axios.get(`/IsilIslem/islemDetay`, {
        params: {
          islemId,
        },
      });

      if (!response.data.durum) {
        setIslemBilgileri({
          veriler: {},
          yukleniyor: false,
        });
        return alert(response.data.mesaj);
      }

      setIslemBilgileri({
        veriler: {
          ...response.data.islem,
          resim:
            API_URL +
            (response.data.islem.resimYolu
              ? "/" + response.data.islem.resimYolu
              : "/no-image.jpg"),
        },
        yukleniyor: false,
      });
    } catch (error) {
      console.log(error);
      setIslemBilgileri({
        veriler: {},
        yukleniyor: false,
      });
      alert("Hata oluştu");
    }
  };

  useEffect(() => {
    islemDetayGetir();
  }, []);

  return (
    <>
      <GeriButon
        navigation={navigation}
        title={islemId + " Numaralı İşlem"}
        headerRight={() => <View />}
      />
      {islemBilgileri.yukleniyor ? (
        <Loading key={"loading"} style={{ marginTop: 15 }} />
      ) : (
        <View style={styles.container}>
          <ScrollView key="bilgiler">
            <View style={styles.yaziContainer}>
              <Text style={styles.yaziBaslik}>Resim</Text>
              <TouchableRipple
                onPress={() => resimAc(islemBilgileri.veriler.resim)}
                rippleColor="rgba(0, 0, 0, .32)"
              >
                <Image
                  style={styles.tinyLogo}
                  source={{
                    uri: islemBilgileri.veriler.resim,
                  }}
                />
              </TouchableRipple>
            </View>
            <View style={styles.yaziContainer}>
              <Text style={styles.yaziBaslik}>Firma | Sorumlu Kişi</Text>
              <Text style={styles.yaziIcerik}>
                {islemBilgileri.veriler.firmaAdi} |{" "}
                {islemBilgileri.veriler.sorumluKisi}
              </Text>
            </View>
            <View style={styles.yaziContainer}>
              <Text style={styles.yaziBaslik}>Adet</Text>
              <Text style={styles.yaziIcerik}>
                {islemBilgileri.veriler.adet}
              </Text>
            </View>
            <View style={styles.yaziContainer}>
              <Text style={styles.yaziBaslik}>Miktar</Text>
              <Text style={styles.yaziIcerik}>
                {islemBilgileri.veriler.miktar} KG
              </Text>
            </View>
            <View style={styles.yaziContainer}>
              <Text style={styles.yaziBaslik}>Dara</Text>
              <Text style={styles.yaziIcerik}>
                {islemBilgileri.veriler.dara} KG
              </Text>
            </View>
            <View style={styles.yaziContainer}>
              <Text style={styles.yaziBaslik}>Net</Text>
              <Text style={styles.yaziIcerik}>
                {islemBilgileri.veriler.miktar - islemBilgileri.veriler.dara} KG
              </Text>
            </View>
            <View style={styles.yaziContainer}>
              <Text style={styles.yaziBaslik}>İstenilen Sertlik</Text>
              <Text style={styles.yaziIcerik}>
                {islemBilgileri.veriler.istenilenSertlik ?? "-"}
              </Text>
            </View>
            <View style={styles.yaziContainer}>
              <Text style={styles.yaziBaslik}>Sıcaklık</Text>
              <Text style={styles.yaziIcerik}>
                {islemBilgileri.veriler.sicaklik ?? "-"}
              </Text>
            </View>
            <View style={styles.yaziContainer}>
              <Text style={styles.yaziBaslik}>Carbon</Text>
              <Text style={styles.yaziIcerik}>
                {islemBilgileri.veriler.carbon ?? "-"}
              </Text>
            </View>
            <View style={styles.yaziContainer}>
              <Text style={styles.yaziBaslik}>Beklenen Süre</Text>
              <Text style={styles.yaziIcerik}>
                {islemBilgileri.veriler.beklenenSure ?? "-"}
              </Text>
            </View>
            <View style={styles.yaziContainer}>
              <Text style={styles.yaziBaslik}>Çıkış Sertliği</Text>
              <Text style={styles.yaziIcerik}>
                {islemBilgileri.veriler.cikisSertligi ?? "-"}
              </Text>
            </View>
            <View style={styles.yaziContainer}>
              <Text style={styles.yaziBaslik}>Meneviş Sıcaklığı</Text>
              <Text style={styles.yaziIcerik}>
                {islemBilgileri.veriler.menevisSicakligi ?? "-"}
              </Text>
            </View>
            <View style={styles.yaziContainer}>
              <Text style={styles.yaziBaslik}>Çıkış Süresi</Text>
              <Text style={styles.yaziIcerik}>
                {islemBilgileri.veriler.cikisSuresi ?? "-"}
              </Text>
            </View>
            <View style={styles.yaziContainer}>
              <Text style={styles.yaziBaslik}>Son Sertlik</Text>
              <Text style={styles.yaziIcerik}>
                {islemBilgileri.veriler.sonSertlik ?? "-"}
              </Text>
            </View>
            <View style={styles.yaziContainer}>
              <Text style={styles.yaziBaslik}>Açıklama</Text>
              <Text style={styles.yaziIcerik}>
                {islemBilgileri.veriler.islemAciklama ?? "-"}
              </Text>
            </View>
            <View style={styles.yaziContainer}>
              <Text style={styles.yaziBaslik}>Sipariş Tarihi</Text>
              <Text style={styles.yaziIcerik}>
                {moment(islemBilgileri.veriler.siparisTarihi).format("L")}
              </Text>
            </View>
            <View style={styles.yaziContainer}>
              <Text style={styles.yaziBaslik}>Sipariş No</Text>
              <Text style={styles.yaziIcerik}>
                {islemBilgileri.veriler.siparisNo}
              </Text>
            </View>
            <View style={styles.yaziContainer}>
              <Text style={styles.yaziBaslik}>Sipariş Adı</Text>
              <Text style={styles.yaziIcerik}>
                {islemBilgileri.veriler.siparisAdi}
              </Text>
            </View>
            <View style={styles.yaziContainer}>
              <Text style={styles.yaziBaslik}>İşlem Durumu</Text>
              <Text style={styles.yaziIcerik}>
                {islemBilgileri.veriler.islemDurumAdi}
              </Text>
            </View>
            <View style={styles.yaziContainer}>
              <Text style={styles.yaziBaslik}>Termin</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Badge
                  size={30}
                  style={{
                    backgroundColor:
                      theme.colors[islemBilgileri.veriler.gecenSureRenk],
                    paddingHorizontal: 5,
                    fontSize: 14,
                    color: "#ffffff",
                    marginRight: 5,
                  }}
                >
                  {islemBilgileri.veriler.gecenSure + " gün"}
                </Badge>
                <Text style={styles.yaziIcerik}>
                  / {islemBilgileri.veriler.terminSuresi} gün
                </Text>
              </View>
            </View>
            <View style={styles.yaziContainer}>
              <Text style={styles.yaziBaslik}>Malzeme</Text>
              <Text style={styles.yaziIcerik}>
                {islemBilgileri.veriler.malzemeAdi}
              </Text>
            </View>
            <View style={styles.yaziContainer}>
              <Text style={styles.yaziBaslik}>İşlem Türü</Text>
              <Text style={styles.yaziIcerik}>
                {islemBilgileri.veriler.islemTuruAdi}
              </Text>
            </View>
            <View style={styles.yaziContainer}>
              <Text style={styles.yaziBaslik}>İşlem Gördüğü Fırın</Text>
              {islemBilgileri.veriler.firinAdi &&
              islemBilgileri.veriler.firinJson ? (
                <View>
                  <Badge
                    size={30}
                    style={{
                      backgroundColor:
                        theme.colors[islemBilgileri.veriler.firinJson?.renk],
                      fontSize: 14,
                      color: "#ffffff",
                      paddingHorizontal: 5,
                    }}
                  >
                    {islemBilgileri.veriler.firinAdi}
                  </Badge>
                </View>
              ) : (
                <Text style={styles.yaziIcerik}>-</Text>
              )}
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  yaziContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 10,
    alignItems: "start",
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  yaziBaslik: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  yaziIcerik: {
    fontSize: 16,
  },
  evenRow: {
    backgroundColor: "#f5f5f5",
  },
  yariYaziContainer: {
    flex: 1,
    flexDirection: "row",
  },
  islemResim: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 10,
    backgroundColor: "#f5f5f5",
  },
  accordionBg: {
    backgroundColor: "#dddddd",
  },
  islemlerContainer: {
    marginBottom: 20,
  },
  itemText: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 3,
  },
  tinyLogo: {
    width: 64,
    height: 64,
  },
});

export default IslemDetay;
