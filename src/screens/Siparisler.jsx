import { View, Text, StyleSheet } from "react-native";
import axios from "../utils/Axios";
import React, { useState, useEffect } from "react";
import { List, Avatar, Badge, useTheme, Button } from 'react-native-paper';
import { ScrollView } from "react-native-gesture-handler";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Loading from "../components/Loading";
import moment from "../utils/Moment";

export default function Siparisler({ navigation }) {

  const theme = useTheme();

  const [siparisler, setSiparisler] = useState({
    siparisler: {},
    yukleniyor: true,
  });

  const getSiparisler = async (url = '/siparis/siparisler') => {
    setSiparisler({ ...siparisler, yukleniyor: true });
    try {
      const response = await axios.post(url);
      setSiparisler({
        siparisler: response.data.siparisler,
        yukleniyor: false,
      });
    } catch (error) {
      console.log(error);
      setSiparisler({
        siparisler: {},
        yukleniyor: false,
      });
    }
  };

  const Sticky = () => {
    return (
      <View style={{ flex: 1, flexDirection: 'row', position: 'absolute', left: 0, right: 0, bottom: 10 }}>
        <Button
          icon="chevron-left"
          mode="contained"
          style={styles.buton}
          onPress={() => { getSiparisler(siparisler.siparisler.prev_page_url) }}
          disabled={siparisler.siparisler.prev_page_url == null} />
        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
          <Text>{siparisler.siparisler.current_page}/{siparisler.siparisler.last_page}</Text>
          <Text>Toplam {siparisler.siparisler.total} Kayıt</Text>
        </View>
        <Button
          contentStyle={{ flexDirection: 'row-reverse' }}
          icon="chevron-right"
          mode="contained"
          style={styles.buton}
          onPress={() => { getSiparisler(siparisler.siparisler.next_page_url) }}
          disabled={siparisler.siparisler.next_page_url == null} />
      </View>
    )
  }

  useEffect(() => {
    getSiparisler()
  }, [])

  return (
    <View style={{ flex: 1, padding: 5}}>
      <ScrollView style={{marginBottom:50}}>
        <List.Section>
          {siparisler.yukleniyor ? (<Loading />) : (<>
            {siparisler.siparisler.data.map((siparis, index) => {
              return (
                <>
                  <List.Accordion
                    key={index + "list"}
                    title={siparis.siparisAdi}
                    description={moment(siparis.tarih).format("L") + " - " + siparis.firmaAdi}
                    left={props => <Avatar.Text label={siparis.siparisId} size={36} />}
                    style={styles.accordionBg}>
                    <List.Item
                      title="Sipariş No"
                      style={styles.accordionBg}
                      right={props => <Text style={styles.itemText}>{siparis.siparisNo}</Text>} />
                    <List.Item
                      title="Sipariş Durumu"
                      style={styles.accordionBg}
                      right={props => <Text style={styles.itemText}>{siparis.siparisDurumAdi}</Text>} />
                    <List.Item
                      title="İrsaliye No"
                      style={styles.accordionBg}
                      right={props => <Text style={styles.itemText}>{siparis.irsaliyeNo}</Text>} />
                      <List.Item
                      title="Tutar"
                      style={styles.accordionBg}
                      right={props => <Text style={styles.itemText}>{siparis.tutar} ₺</Text>} />
                    <List.Item
                      title="Geçen Süre"
                      style={styles.accordionBg}
                      right={props => <Badge size={30} style={{ backgroundColor: theme.colors[siparis.gecenSureRenk], ...styles.itemBadge }}>{siparis.gecenSure + " gün"}</Badge>} />
                    <List.Item
                      onPress={() => { }}
                      title="İşlem Sayısı"
                      style={styles.accordionBg}
                      right={props => <Button contentStyle={{ flexDirection: 'row-reverse' }} icon="eye" mode="contained-tonal" style={styles.itemText}>{siparis.islemSayisi} adet </Button>} />
                  </List.Accordion>
                  <View style={{ marginVertical: 3 }} key={index + "view"} />
                </>
              )
            })}
          </>
          )}

        </List.Section>

      </ScrollView>
      <Sticky />
    </View>
  );
}

const styles = StyleSheet.create({
  accordionBg: {
    backgroundColor: '#dddddd'
  },
  itemText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 3
  },
  itemBadge: {
    paddingHorizontal: 10,
    fontSize: 14,
    color: "#ffffff"
  },
  buton: {
    color: '#Fffffff',
    flex: 1,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
})