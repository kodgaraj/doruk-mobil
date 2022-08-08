import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Linking } from "react-native";
import * as Notifications from "expo-notifications";

// Utils
import { useLoading } from "../utils/LoadingContext";
import { registerForPushNotification } from "../utils/PushNotification";

// Components
import LoginStackTemplate from "./LoginStackTemplate";
import SplashScreen from "../components/SplashScreen";

// Stores
import { oturumKontrol } from "../stores/auth";
import { setPushToken } from "../stores/pushToken";
import { setShouldRedirectUrl } from "../stores/webViewUrl";

// Screens
import Webview from "../screens/Webview";

const Stack = createNativeStackNavigator();

const PanelStackTemplate = (props) => {
  return (
    <Stack.Navigator
      {...props}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Webview}
        options={{
          title: "Anasayfa",
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name={"home"} size={size} color={color} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function RouterWebView() {
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
      const onReceiveURL = ({ url }) => listener(url);

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

          console.log("addNotificationResponseReceivedListener", url);

          // dispatch(setShouldRedirectUrl(url));

          // if (kod === "SIPARIS_BILDIRIMI") {
          //   navigationRef.current?.navigate("SiparisDetay", {
          //     siparis: {
          //       siparisId: Number(actionId),
          //     },
          //     detaylariGetir: true,
          //   });
          // } else if (kod === "FORM_BILDIRIMI") {
          //   navigationRef.current?.navigate("FormDetay", {
          //     form: { formId: Number(actionId) },
          //   });
          // } else {
          //   navigationRef.current?.navigate("Bildirimler", {
          //     bildirimId: Number(bildirimId),
          //   });
          // }

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
          <PanelStackTemplate />
        ) : (
          <LoginStackTemplate />
        )}
      </NavigationContainer>
    </>
  );
}

export default RouterWebView;
