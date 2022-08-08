import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLoading } from "../utils/LoadingContext";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../stores/auth";
import { useEffect, useRef, useState } from "react";
import { setShouldRedirectUrl } from "../stores/webViewUrl";
import SplashScreen from "../components/SplashScreen";
import { StatusBar } from "react-native";
import { useTheme } from "react-native-paper";

const Webview = () => {
  const runFirst = `
    window.isNativeApp = true;
    true; // note: this is required, or you'll sometimes get silent failures
  `;

  const dispatch = useDispatch();
  const { setLoading } = useLoading();
  const theme = useTheme();

  const webViewRef = useRef(null);
  const shouldRedirectUrl = useSelector(
    (state) => state.webViewUrl.shouldRedirectUrl
  );
  const { jwt } = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(
      setShouldRedirectUrl("https://dev.doruk.kodgaraj.com/jwtLogin?jwt=" + jwt)
    );
  }, []);

  // Çıkış fonksiyonu
  const handleLogout = () => {
    setLoading(true);

    dispatch(logout()).then(() => {
      setLoading(false);
    });
  };

  const onMessage = (e) => {
    const veriler = JSON.parse(e.nativeEvent.data);
    if (veriler.kod === "CIKIS_YAPILDI") {
      handleLogout();
    }
  };

  const onLoadEnd = () => {};

  const onHttpError = (error) => {
    alert(error.description);
    console.log(error);
    setTimeout(() => {
      dispatch(setShouldRedirectUrl("/"));
    }, 200);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primary }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />
      <WebView
        originWhitelist={["*"]}
        setBuiltInZoomControls={false}
        source={{
          uri: shouldRedirectUrl,
        }}
        containerStyle={{ flex: 1 }}
        injectedJavaScriptBeforeContentLoaded={runFirst}
        onMessage={onMessage}
        onLoadEnd={onLoadEnd}
        ref={webViewRef}
        pullToRefreshEnabled={true}
        startInLoadingState={true}
        renderLoading={() => <SplashScreen />}
        onHttpError={onHttpError}
        onError={onHttpError}
        onNavigationStateChange={(navState) => {
          if (navState.url.includes("/login")) {
            handleLogout();
          }
        }}
      />
    </SafeAreaView>
  );
};

export default Webview;
