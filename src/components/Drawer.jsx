import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, Icon, Image } from 'react-native'
import { Drawer } from 'react-native-paper'
import {
  DrawerItem,
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { logout } from '../stores/auth';
import { useLoading } from "../utils/LoadingContext";

function DrawerContent(props) {
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
  }

  return (
    <DrawerContentScrollView {...props}>
      <Drawer.Section style={styles.drawerSection}>
        <View style={styles.drawerImageContainer}>
          <Image
            style={styles.drawerImage}
            source={{uri: 'https://doruk.kodgaraj.com/img/doruk-logo.png'}}
          />
        </View>
        <DrawerItemList {...props} />
        <DrawerItem
          icon={({ focused, color, size }) => <FontAwesome5 name={'sign-out-alt'} size={size} color={color} />}
          label="Çıkış Yap"
          onPress={handleLogout}
        />
      </Drawer.Section>
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  drawerSection: {
    marginTop: 15,
  },
  drawerImage: {
    width: "100%",
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  drawerImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 10,
  }
});

export default DrawerContent;