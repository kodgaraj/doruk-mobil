import { View, Text, FlatList } from "react-native";
import { List } from "react-native-paper";
import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { ScrollView } from "react-native-gesture-handler";

// Components
import Loading from "../components/Loading";

// Utils
import axios from "../utils/Axios";
import moment from "../utils/Moment";

export default function Bildirimler() {
  const [bildirimler, setBildirimler] = useState({
    veriler: [],
    yukleniyor: false,
    yuklenmeTamamlandi: false,
  });
  const [yukleniyor, setYukleniyor] = useState(true);

  const bildirimleriGetir = async () => {
    try {
      const sayfalamaAdeti = 20;
      setBildirimler({ ...bildirimler, yukleniyor: true });
      const response = await axios.get("/bildirimler/bildirimleriGetir", {
        params: {
          sayfalama: sayfalamaAdeti,
        },
      });

      if (!response.data.durum) {
        setBildirimler({ ...bildirimler, yukleniyor: false });
        return alert(response.data.mesaj);
      }

      setBildirimler({
        ...bildirimler,
        veriler: response.data.bildirimler,
        yukleniyor: false,
        yuklenmeTamamlandi:
          bildirimler.veriler?.veriler?.data?.length < sayfalamaAdeti,
      });
      setYukleniyor(false);
    } catch (error) {
      console.log(error.response);
      alert("Hata oluştu", error.response.data);
      setYukleniyor(false);
      setBildirimler({ ...bildirimler, yukleniyor: false });
    }
  };

  const bildirimDetayAc = (bildirim) => {
    console.log(bildirim);
  };

  useEffect(() => {
    bildirimleriGetir();
  }, []);

  return (
    <>
      {yukleniyor ? (
        <Loading style={{ marginTop: 10 }} />
      ) : (
        <>
          <FlatList
            data={bildirimler.veriler?.veriler?.data}
            renderItem={({ item, index }) => (
              <List.Item
                key={index}
                titleStyle={{ fontWeight: !item.okundu ? "bold" : "normal" }}
                descriptionStyle={{ color: !item.okundu ? "#000" : "#777" }}
                title={item.baslik}
                description={item.icerik}
                onPress={() => bildirimDetayAc(item)}
                descriptionNumberOfLines={3}
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon={() =>
                      item.okundu ? (
                        <FontAwesome5 name="check" size={20} color="green" />
                      ) : (
                        <FontAwesome5 name="bell" size={20} color="red" />
                      )
                    }
                  />
                )}
                right={(props) => (
                  <View
                    {...props}
                    style={{ alignItems: "flex-end", justifyContent: "center" }}
                  >
                    <Text style={{ fontSize: 12, color: "#777" }}>
                      {moment(item.created_at).format("L")}
                    </Text>
                    <Text style={{ fontSize: 12, color: "#777" }}>
                      {moment(item.created_at).format("LT")}
                    </Text>
                  </View>
                )}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={
              bildirimler.yuklenmeTamamlandi ? null : bildirimleriGetir
            }
            ListFooterComponent={
              bildirimler.yukleniyor ? (
                <Loading style={{ marginTop: 10 }} />
              ) : null
            }
            onEndReachedThreshold={0.5}
          />
          {bildirimler.yuklenmeTamamlandi && (
            <Text
              style={{ marginBottom: 10, alignSelf: "center", color: "#777" }}
            >
              Tüm bildirimler listeleniyor...
            </Text>
          )}
        </>
      )}
    </>
  );
}
