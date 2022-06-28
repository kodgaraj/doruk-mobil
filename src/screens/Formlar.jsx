import { View, Text, StyleSheet } from "react-native";
import axios from "../utils/Axios";
import React, { useState, useEffect } from "react";
import { List, Avatar, Badge, useTheme, Button } from 'react-native-paper';
import { ScrollView } from "react-native-gesture-handler";
import Loading from "../components/Loading";
import moment from "../utils/Moment";

export default function Formlar({ navigation }) {

  const theme = useTheme();

  const [formlar, setFormlar] = useState({
    formlar: {},
    yukleniyor: true,
  });

  const getFormlar = async (url = '/IsilIslem/formlar') => {
    setFormlar({ ...formlar, yukleniyor: true });
    try {
      const response = await axios.post(url);
      setFormlar({
        formlar: response.data.formlar,
        yukleniyor: false,
      });
    } catch (error) {
      console.log(error);
      setFormlar({
        formlar: {},
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
          onPress={() => { getFormlar(formlar.formlar.prev_page_url) }}
          disabled={formlar.formlar.prev_page_url == null} />
        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
          <Text>{formlar.formlar.current_page}/{formlar.formlar.last_page}</Text>
          <Text>Toplam {formlar.formlar.total} Kayıt</Text>
        </View>
        <Button
          contentStyle={{ flexDirection: 'row-reverse' }}
          icon="chevron-right"
          mode="contained"
          style={styles.buton}
          onPress={() => { getFormlar(formlar.formlar.next_page_url) }}
          disabled={formlar.formlar.next_page_url == null} />
      </View>
    )
  }

  useEffect(() => {
    getFormlar()
  }, [])

  return (
    <View style={{ flex: 1, padding: 5 }}>
      <ScrollView style={{ marginBottom: 50 }}>
        <List.Section key={"form-listesi"}>
          {formlar.yukleniyor ? (<Loading key={"loading"} />) : (<>
            {formlar.formlar.data.map((form, index) => {
              return (
                <View key={index + "view"}>
                  <List.Accordion
                    key={index + "list"}
                    title={form.formAdi}
                    description={moment(form.baslangicTarihi).format("LL")}
                    left={props => <Avatar.Text style={{ backgroundColor: theme.colors.danger }} key={index + "avatar"} label={form.id} size={36} />}
                    style={styles.accordionBg}>
                    <List.Item
                      key={index + "takip-no"}
                      title="Takip No"
                      style={styles.accordionBg}
                      right={props => <Text key={index + "takip-no-text"} style={styles.itemText}>{form.takipNo}</Text>} />
                    <List.Item
                      key={index + "baslangic-tarihi"}
                      title="Başlangıç Tarihi"
                      style={styles.accordionBg}
                      right={props => <Text key={index + "baslangic-tarihi-text"} style={styles.itemText}>{form.baslangicTarihi}</Text>} />
                    <List.Item
                      key={index + "bitis-tarihi"}
                      title="Bitiş Tarihi"
                      style={styles.accordionBg}
                      right={props => <Text key={index + "bitis-tarihi-text"} style={styles.itemText}>{form.bitisTarihi}</Text>} />
                    <List.Item
                      key={index + "islem-sayisi"}
                      onPress={() => { }}
                      title="İşlem Sayısı"
                      style={styles.accordionBg}
                      right={props => <Button key={index + "istem-sayisi-buton"} contentStyle={{ flexDirection: 'row-reverse' }} icon="eye" mode="contained-tonal" style={styles.itemText}>{form.islemSayisi} adet </Button>} />
                  </List.Accordion>
                  <View style={{ marginVertical: 3 }} key={index + "view"} />
                </View>
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