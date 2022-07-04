import Router from "./src/navigations/Router";
import store from "./src/stores"
import { Provider } from 'react-redux';
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { LoadingProvider } from "./src/utils/LoadingContext";
import { useEffect } from "react";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2A3F93",
    danger: "#B61A4E",
    success: "#4CAF50",
    warning: "#FFB022"
  }
};

export default function App() {
  // const notificationListener = useRef();
  // const responseListener = useRef();

  // const [notification, setNotification] = useState(false);
  useEffect(() => {
    registerForPushNotification().then(token => console.log(token));
    // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    //   console.log(notification);
    // });
    // responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    //   console.log(response);
    // });
    // return () => {
    //   cleanup
    // }
  }, [])

  async function registerForPushNotification() {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status != 'granted') {
      alert('Bildirim için izin vermelisiniz!');
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      // finalStatus = status;
    }
    // if (status !== 'granted') {
    //   alert('Bildirim için izin vermelisiniz!');
    //   return;
    // }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    // kodyazar
    // token cihaza özel üretiliyor, kulanıcı ile eşleştirilecek
    // https://expo.dev/notifications ile test yapılabilir
    // php sdk => https://github.com/ctwillie/expo-server-sdk-php
    alert(token);
    return token
  }


  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <LoadingProvider>
          <Router />
        </LoadingProvider>
      </PaperProvider>
    </Provider>
  );
}
