import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Button, useTheme } from "react-native-paper";
import { Linking } from "react-native";
import * as Notifications from "expo-notifications";

// Utils
import { useLoading } from "../utils/LoadingContext";
import { registerForPushNotification } from "../utils/PushNotification";

// Components
import LoginStackTemplate from "./LoginStackTemplate";
import SplashScreen from "../components/SplashScreen";
import DrawerContent from "../components/DrawerContent";

// Screens
import Home from "../screens/Home";
import Siparisler from "../screens/Siparisler";
import Formlar from "../screens/Formlar";
import Islemler from "../screens/Islemler";
import Bildirimler from "../screens/Bildirimler";
import SiparisDetay from "../screens/SiparisDetay";
import ResimOnizleme from "../screens/ResimOnizleme";
import FormDetay from "../screens/FormDetay";

// Stores
import { oturumKontrol } from "../stores/auth";
import { setPushToken } from "../stores/pushToken";

const Stack = createNativeStackNavigator();

const PanelStackTemplate = (props) => {
  const { navigation, route } = props;
  const theme = useTheme();

  return (
    <Stack.Navigator
      {...props}
      screenOptions={{
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTitleStyle: {
          color: "white",
        },
        headerLeft: () => (
          <Button
            onPress={() => navigation.openDrawer()}
            icon={() => (
              <FontAwesome5 name={"bars"} size={20} color={"white"} />
            )}
            style={{ marginLeft: -10 }}
          />
        ),
        headerRight: () => (
          <Button
            onPress={() => navigation.navigate("Bildirimler")}
            icon={() => (
              <FontAwesome5 name={"bell"} size={20} color={"white"} />
            )}
            style={{ marginRight: -20 }}
          />
        ),
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Anasayfa",
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name={"home"} size={size} color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="Siparisler"
        component={Siparisler}
        options={{
          title: "Siparişler",
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name={"cart-plus"} size={size} color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="Formlar"
        component={Formlar}
        options={{
          title: "Isıl İşlem Formları",
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name={"calendar-check"} size={size} color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="Islemler"
        component={Islemler}
        options={{
          title: "Isıl İşlemler",
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name={"tachometer-alt"} size={size} color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="Bildirimler"
        component={Bildirimler}
        options={{
          title: "Bildirimler",
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name={"bell"} size={size} color={color} />
          ),
        }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="ResimOnizleme" component={ResimOnizleme} />
        <Stack.Screen
          name="SiparisDetay"
          component={SiparisDetay}
          options={{
            title: "Siparişler",
            // drawerIcon: ({ color, size }) => (
            //   <FontAwesome5 name={"cart-plus"} size={size} color={color} />
            // ),
          }}
        />
        <Stack.Screen
          name="FormDetay"
          component={FormDetay}
          options={{
            title: "Form Detay",
            // drawerIcon: ({ color, size }) => (
            //   <FontAwesome5 name={"cart-plus"} size={size} color={color} />
            // ),
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

function PanelDrawerTemplate() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#2D4295",
        },
        headerTitleStyle: {
          color: "white",
        },
        headerShown: false,
        drawerType: "back",
      }}
      initialRouteName="PanelStackTemplate"
    >
      <Drawer.Screen
        name="PanelStackTemplate"
        component={PanelStackTemplate}
        options={{
          title: "Anasayfa",
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name={"home"} size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function Router() {
  // Global Splash Screen loading setleme ve durumunu almak için kullanılır.
  const { loading, setLoading } = useLoading();

  // Redux'taki bir fonksiyonu çalıştırmak için dispatch kullanılır.
  const dispatch = useDispatch();

  // Redux'tan user state'i alıyoruz.
  const { user } = useSelector((state) => state.auth);

  const navigationRef = useNavigationContainerRef();

  // Component çalıştığında oturum kontrolü yapılıyor.
  // Not: Başlangıçta tek sefer çalışması için 2. parametre [] şeklinde ayarladık.
  useEffect(() => {
    // SplashScreen loading
    setLoading(true);

    // Oturum kontrolü
    dispatch(oturumKontrol()).then(() => {
      // Kontrol tamamlandıktan sonra SplashScreen loading kapatılıyor
      setLoading(false);
    });

    registerForPushNotification().then((token) => {
      dispatch(setPushToken(token));
    });
  }, []);

  const LinkingConfiguration = {
    config: {},
    async getInitialURL() {
      // First, you may want to do the default deep link handling
      // Check if app was opened from a deep link
      let url = await Linking.getInitialURL();

      if (url != null) {
        return url;
      }

      // Handle URL from expo push notifications
      const response = await Notifications.getLastNotificationResponseAsync();
      url = response?.notification.request.content.data;

      return url;
    },
    subscribe(listener) {
      const onReceiveURL = ({ url }: { url: string }) => listener(url);

      // Listen to incoming links from deep linking
      const linkingUrlListener = Linking.addEventListener("url", onReceiveURL);

      // Listen to expo push notifications
      const subscription =
        Notifications.addNotificationResponseReceivedListener((response) => {
          const {
            url,
            kod,
            bildirimId,
            actionId = undefined,
          } = response.notification.request.content.data;

          if (kod === "SIPARIS_BILDIRIMI") {
            navigationRef.current?.navigate("SiparisDetay", {
              siparis: {
                siparisId: Number(actionId),
              },
              detaylariGetir: true,
            });
          } else if (kod === "FORM_BILDIRIMI") {
            navigationRef.current?.navigate("FormDetay", {
              form: { formId: Number(actionId) },
            });
          } else {
            navigationRef.current?.navigate("Bildirimler", {
              bildirimId: Number(bildirimId),
            });
          }

          // Let React Navigation handle the URL
          listener(url);
        });

      return () => {
        // Clean up the event listeners
        linkingUrlListener.remove();
        subscription.remove();
      };
    },
  };

  // Eğer loading aktif ise SplashScreen kullanılıyor.
  // Değilse state'deki user bilgisi varsa PanelDrawerTemplate (Panel Ekranı) kullanılıyor.
  // Değilse LoginStackTemplate (Login Ekranı) kullanılıyor.
  return (
    <>
      <NavigationContainer ref={navigationRef} linking={LinkingConfiguration}>
        {loading ? (
          <SplashScreen />
        ) : user ? (
          <PanelDrawerTemplate />
        ) : (
          <LoginStackTemplate />
        )}
      </NavigationContainer>
    </>
  );
}

export default Router;
