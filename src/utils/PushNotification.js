import * as Notifications from "expo-notifications";

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
    console.log("notification geldi");
  });

  Notifications.addNotificationResponseReceivedListener((response) => {
    console.log("bildirime tıklandı");
  });

  return token;
}

export { registerForPushNotification };
