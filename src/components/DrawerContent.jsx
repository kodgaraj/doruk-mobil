import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Icon,
  Image,
  TouchableHighlight,
} from "react-native";
import { Drawer, Divider } from "react-native-paper";
import {
  DrawerItem,
  DrawerItemList,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { logout } from "../stores/auth";
import { useLoading } from "../utils/LoadingContext";

function DrawerContent(props) {
  const { navigation } = props;

  const dispatch = useDispatch();
  const { setLoading } = useLoading();

  // Çıkış fonksiyonu
  const handleLogout = () => {
    // Loading setleniyor
    setLoading(true);

    // Çıkış yapılıyor
    dispatch(logout()).then(() => {
      // Loading kapatılıyor
      setLoading(false);
    });
  };

  return (
    <DrawerContentScrollView {...props}>
      <Drawer.Section style={styles.drawerSection}>
        <View style={styles.drawerImageContainer}>
          <Image
            style={styles.drawerImage}
            source={{ uri: "https://doruk.kodgaraj.com/img/doruk-logo.png" }}
          />
        </View>
        <DrawerItem
          icon={({ focused, color, size }) => (
            <FontAwesome5 name={"home"} size={size} color={color} />
          )}
          label="Anasayfa"
          onPress={() => {
            navigation.navigate("Home");
            navigation.closeDrawer();
          }}
        />
        <DrawerItem
          icon={({ focused, color, size }) => (
            <FontAwesome5 name={"cart-plus"} size={size} color={color} />
          )}
          label="Siparişler"
          onPress={() => {
            navigation.navigate("Siparisler");
            navigation.closeDrawer();
          }}
        />
        <DrawerItem
          icon={({ focused, color, size }) => (
            <FontAwesome5 name={"calendar-check"} size={size} color={color} />
          )}
          label="Formlar"
          onPress={() => {
            navigation.navigate("Formlar");
            navigation.closeDrawer();
          }}
        />
        <DrawerItem
          icon={({ focused, color, size }) => (
            <FontAwesome5 name={"tachometer-alt"} size={size} color={color} />
          )}
          label="İşlemler"
          onPress={() => {
            navigation.navigate("Islemler");
            navigation.closeDrawer();
          }}
        />
        <DrawerItem
          icon={({ focused, color, size }) => (
            <FontAwesome5 name={"bell"} size={size} color={color} />
          )}
          label="Bildirimler"
          onPress={() => {
            navigation.navigate("Bildirimler");
            navigation.closeDrawer();
          }}
        />
        <Divider />
        <DrawerItem
          icon={({ focused, color, size }) => (
            <FontAwesome5 name={"sign-out-alt"} size={size} color={color} />
          )}
          label="Çıkış Yap"
          onPress={handleLogout}
          style={styles.logout}
        />
      </Drawer.Section>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerImage: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
    alignSelf: "center",
  },
  drawerImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 10,
  },
  drawerSection: {
    marginTop: 15,
  },
  drawerSpacer: {
    marginTop: "auto",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  logout: {
    justifyContent: "center",
  },
});

export default DrawerContent;
