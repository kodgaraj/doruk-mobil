import * as Notifications from "expo-notifications";
import { API_URL } from "../config";
import store from "../stores";
import { setShouldRedirectUrl } from "../stores/webViewUrl";

async function registerForPushNotification() {
  let token;
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }

  token = (await Notifications.getExpoPushTokenAsync()).data;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  Notifications.addNotificationReceivedListener((notification) => {
    console.log("uygulamadayken notification geldi");
  });

  Notifications.addNotificationResponseReceivedListener((response) => {
    console.log(
      "bildirime tıklandı",
      response.notification.request.content.data
    );
    // const { webViewUrl } = store.getState();
    // console.log(webViewUrl.webViewRef.current);
    // webViewUrl?.current?.injectJavaScript(
    //   `window.location.href = "${response.notification.request.content?.data?.link}";`
    // );

    store.dispatch(
      setShouldRedirectUrl(
        API_URL + response.notification.request.content.data.link
      )
    );

    // const webViewRef = useSelector((state) => state.webViewUrl.webViewRef);
    // if (webViewRef) {
    //   webViewRef.current.injectJavaScript(
    //     `window.location.href = '${response.notification.request.content.data.url}';`
    //   );
    // }
  });

  return token;
}

export { registerForPushNotification };
