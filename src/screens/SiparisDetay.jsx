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

const SiparisDetay = ({ route, navigation }) => {
  const theme = useTheme();
  const { siparis } = route.params;
  const [yukleniyor, setYukleniyor] = useState(true);
  const [siparisBilgileri, setSiparisBilgileri] = useState({
    veriler: {
      ...siparis,
      islemler: [],
    },
    yukleniyor: false,
  });
  const [malzemeler, setMalzemeler] = useState({
    veriler: [],
    yukleniyor: false,
  });
  const [islemDurumlari, setIslemDurumlari] = useState({
    veriler: [],
    yukleniyor: false,
  });
  const [islemTurleri, setIslemTurleri] = useState({
    veriler: [],
    yukleniyor: false,
  });

  const resimAc = (resim) => {
    navigation.navigate("ResimOnizleme", { resim });
  };

  useEffect(() => {
    const siparisDetayGetir = async () => {
      setSiparisBilgileri({
        ...siparisBilgileri,
        yukleniyor: true,
      });

      try {
        const res = await axios.get("/siparis/siparisDetay", {
          params: {
            siparisId: siparis.siparisId,
          },
        });

        if (!res.data.durum) {
          setSiparisBilgileri({
            ...siparisBilgileri,
            yukleniyor: false,
          });
          return alert(res.data.mesaj);
        }

        const promise2 = axios.get("/malzeme/malzemeleriGetir");
        const promise3 = axios.get("/islemDurumlari/islemDurumlariGetir");
        const promise4 = axios.get("/islemTurleri/islemTurleriGetir");

        const allPromises = await axios.all([promise2, promise3, promise4]);
        const [malzemelerRes, islemDurumlariRes, islemTurleriRes] = allPromises;

        if (!malzemelerRes.data.durum) {
          setSiparisBilgileri({
            ...siparisBilgileri,
            yukleniyor: false,
          });
          return alert(malzemelerRes.data.mesaj);
        }

        if (!islemDurumlariRes.data.durum) {
          setSiparisBilgileri({
            ...siparisBilgileri,
            yukleniyor: false,
          });
          return alert(islemDurumlariRes.data.mesaj);
        }

        if (!islemTurleriRes.data.durum) {
          setSiparisBilgileri({
            ...siparisBilgileri,
            yukleniyor: false,
          });
          return alert(islemTurleriRes.data.mesaj);
        }

        setMalzemeler({
          veriler: malzemelerRes.data.malzemeler,
          yukleniyor: false,
        });
        setIslemDurumlari({
          veriler: islemDurumlariRes.data.islemDurumlari,
          yukleniyor: false,
        });
        setIslemTurleri({
          veriler: islemTurleriRes.data.islemTurleri,
          yukleniyor: false,
        });

        const veriler = { ...res.data.veriler };

        veriler.islemler.map((islem) => {
          const malzeme = malzemelerRes.data.malzemeler.find(
            (malzeme) => malzeme.id == islem.malzemeId
          );
          islem.malzeme = malzeme;

          const islemDurumu = islemDurumlariRes.data.islemDurumlari.find(
            (islemDurumu) => islemDurumu.id == islem.durumId
          );
          islem.islemDurumu = islemDurumu;

          const islemTuru = islemTurleriRes.data.islemTurleri.find(
            (islemTuru) => islemTuru.id == islem.islemTuruId
          );
          islem.islemTuru = islemTuru;

          islem.resim =
            API_URL +
            (islem.resimYolu ? "/" + islem.resimYolu : "/no-image.jpg");
        });

        setSiparisBilgileri({
          ...siparisBilgileri,
          yukleniyor: false,
          veriler: {
            ...siparisBilgileri.veriler,
            ...veriler,
          },
        });

        setYukleniyor(false);
      } catch (error) {
        console.log(error);
        alert(error);
        setSiparisBilgileri({
          ...siparisBilgileri,
          yukleniyor: false,
        });
      }
    };
    siparisDetayGetir();
  }, []);

  return (
    <>
      <GeriButon navigation={navigation} />
      {yukleniyor ? (
        <Loading key={"loading"} style={{ marginTop: 15 }} />
      ) : (
        <ScrollView style={styles.container} key="bilgiler">
          <View style={styles.yaziContainer}>
            <Text style={styles.yaziBaslik}>Tarih</Text>
            <Text style={styles.yaziIcerik}>
              {moment(siparis.tarih).format("L")}
            </Text>
          </View>
          <View style={styles.yaziContainer}>
            <Text style={styles.yaziBaslik}>Sipariş No</Text>
            <Text style={styles.yaziIcerik}>{siparis.siparisNo}</Text>
          </View>
          <View style={styles.yaziContainer}>
            <Text style={styles.yaziBaslik}>Sipariş Adı</Text>
            <Text style={styles.yaziIcerik}>{siparis.siparisAdi}</Text>
          </View>
          <View style={styles.yaziContainer}>
            <Text style={styles.yaziBaslik}>İrsaliye No</Text>
            <Text style={styles.yaziIcerik}>{siparis.irsaliyeNo}</Text>
          </View>
          <View style={styles.yariYaziContainer}>
            <View style={styles.yaziContainer}>
              <Text style={styles.yaziBaslik}>Toplam Tutar</Text>
              <Text style={styles.yaziIcerik}>{siparis.tutar} ₺</Text>
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
                    backgroundColor: theme.colors[siparis.gecenSureRenk],
                    paddingHorizontal: 5,
                    fontSize: 14,
                    color: "#ffffff",
                    marginRight: 5,
                  }}
                >
                  {siparis.gecenSure + " gün"}
                </Badge>
                <Text style={styles.yaziIcerik}>
                  / {siparis.terminSuresi} gün
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.yaziContainer}>
            <Text style={styles.yaziBaslik}>Sipariş Durumu</Text>
            <Text style={styles.yaziIcerik}>{siparis.siparisDurumAdi}</Text>
          </View>
          <View style={styles.yaziContainer}>
            <Text style={styles.yaziBaslik}>Firma</Text>
            <Text style={styles.yaziIcerik}>{siparis.firmaAdi}</Text>
          </View>
          <View style={styles.yaziContainer}>
            <Text style={styles.yaziBaslik}>Açıklama</Text>
            <Text style={styles.yaziIcerik}>{siparis.aciklama ?? "-"}</Text>
          </View>
          <View style={styles.islemlerContainer}>
            <Text style={styles.yaziBaslik}>İşlemler</Text>
            {siparisBilgileri.veriler.islemler.map((islem, index) => (
              <>
                <List.Accordion
                  key={index + "list"}
                  title={islem.malzeme.ad + " - " + islem.islemDurumu.ad}
                  description={islem.islemTuru.ad + " - " + islem?.islemTarihi}
                  left={(props) => (
                    <TouchableRipple
                      key={index + "touchable"}
                      rippleColor="rgba(0, 0, 0, .32)"
                      {...props}
                    >
                      <Image
                        key={index + "image"}
                        style={styles.islemResim}
                        source={{
                          uri: islem.resim,
                        }}
                      />
                    </TouchableRipple>
                  )}
                  style={styles.accordionBg}
                >
                  <List.Item
                    key={index + "Buton"}
                    onPress={() => resimAc(islem)}
                    title="Resim"
                    style={styles.accordionBg}
                    right={(props) => (
                      <Button
                        onPress={() => resimAc(islem)}
                        title="Resmi Görüntüle"
                      ></Button>
                    )}
                  />
                  <List.Item
                    key={index + "SiparisNo"}
                    title="Sipariş No"
                    style={styles.accordionBg}
                    right={(props) => (
                      <Text
                        key={index + "SiparisNoText"}
                        style={styles.itemText}
                      >
                        {siparis.siparisNo}
                      </Text>
                    )}
                  />
                  <List.Item
                    key={index + "SiparisDurumu"}
                    title="Sipariş Durumu"
                    style={styles.accordionBg}
                    right={(props) => (
                      <Text
                        key={index + "SiparisDurumuText"}
                        style={styles.itemText}
                      >
                        {siparis.siparisDurumAdi}
                      </Text>
                    )}
                  />
                  <List.Item
                    title="İrsaliye No"
                    key={index + "IrsaliyeNo"}
                    style={styles.accordionBg}
                    right={(props) => (
                      <Text
                        key={index + "IrsaliyeNoText"}
                        style={styles.itemText}
                      >
                        {siparis.irsaliyeNo}
                      </Text>
                    )}
                  />
                  <List.Item
                    title="Tutar"
                    key={index + "Tutar"}
                    style={styles.accordionBg}
                    right={(props) => (
                      <Text key={index + "TutarText"} style={styles.itemText}>
                        {siparis.tutar} ₺
                      </Text>
                    )}
                  />
                  <List.Item
                    title="Geçen Süre"
                    key={index + "GecenSure"}
                    style={styles.accordionBg}
                    right={(props) => (
                      <Badge
                        key={index + "GecenSureBadge"}
                        size={30}
                        style={{
                          backgroundColor: theme.colors[siparis.gecenSureRenk],
                          ...styles.itemBadge,
                        }}
                      >
                        {siparis.gecenSure + " gün"}
                      </Badge>
                    )}
                  />
                </List.Accordion>
                <View style={{ marginVertical: 3 }} key={index + "view"} />
              </>
            ))}
          </View>
        </ScrollView>
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
});

export default SiparisDetay;