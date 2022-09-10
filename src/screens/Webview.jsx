import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLoading } from "../utils/LoadingContext";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../stores/auth";
import { useEffect, useRef } from "react";
import { setShouldRedirectUrl } from "../stores/webViewUrl";
import { StatusBar } from "react-native";
import { useTheme } from "react-native-paper";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import Loading from "../components/Loading";
import { API_URL } from "../config";

const replaceSpecialChars = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/([^\w]+|\s+)/g, "_") // Replace space and other characters by hyphen
    .replace(/\-\-+/g, "_") // Replaces multiple hyphens by one hyphen
    .replace(/(^-+|-+$)/g, ""); // Remove extra hyphens from beginning or end of the string
};

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
    dispatch(setShouldRedirectUrl(API_URL + "/jwtLogin?jwt=" + jwt));
  }, []);

  async function downloadFile(dosya, p = {}) {
    const dosyaAdi = p.dosyaAdi ? replaceSpecialChars(p.dosyaAdi) : "Dosya";
    const dosyaUzantisi = p.dosyaUzantisi || "pdf";
    let mimeType = "application/pdf";
    if (dosyaUzantisi === "docx") {
      mimeType =
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    } else if (dosyaUzantisi === "xlsx") {
      mimeType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    } else if (dosyaUzantisi === "pptx") {
      mimeType =
        "application/vnd.openxmlformats-officedocument.presentationml.presentation";
    } else if (dosyaUzantisi === "jpg" || dosyaUzantisi === "jpeg") {
      mimeType = "image/jpeg";
    } else if (dosyaUzantisi === "png") {
      mimeType = "image/png";
    } else if (dosyaUzantisi === "gif") {
      mimeType = "image/gif";
    } else if (dosyaUzantisi === "txt") {
      mimeType = "text/plain";
    } else if (dosyaUzantisi === "doc") {
      mimeType = "application/msword";
    } else if (dosyaUzantisi === "xls") {
      mimeType = "application/vnd.ms-excel";
    } else if (dosyaUzantisi === "ppt") {
      mimeType = "application/vnd.ms-powerpoint";
    }

    try {
      const fileUri = `${
        FileSystem.documentDirectory + dosyaAdi + "." + dosyaUzantisi
      }`;
      const [, base64] = dosya.split(",");
      await FileSystem.writeAsStringAsync(fileUri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });
      Sharing.shareAsync(fileUri, {
        mimeType,
        dialosTitle: p.dosyaAdi ?? dosyaAdi,
        UTI: mimeType,
      });
    } catch (error) {
      console.log(error);
    }
  }

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
    } else if (veriler.kod === "INDIR") {
      downloadFile(veriler.dosya, {
        dosyaAdi: veriler.dosyaAdi,
        dosyaUzantisi: veriler.dosyaUzantisi,
      });
    }
  };

  const onLoadEnd = (event) => {
    console.log("onLoadEnd", event.nativeEvent.loading);
  };

  const onHttpError = (error) => {
    alert(error.description);
    console.log(error);
    setTimeout(() => {
      dispatch(setShouldRedirectUrl("/"));
    }, 200);
  };

  const onShouldStartLoadWithRequest = (request) => {
    if (request.url.includes("blob:")) {
      webViewRef.current.stopLoading();
      return false;
    }

    // if (request.url.includes("about:blank")) {
    //   webViewRef.current.stopLoading();
    // }
    return true;
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.primary,
      }}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />
      {/* {isLoading && <SplashScreen />} */}
      <WebView
        originWhitelist={["*"]}
        setBuiltInZoomControls={false}
        source={{
          uri: shouldRedirectUrl,
        }}
        injectedJavaScriptBeforeContentLoaded={runFirst}
        onMessage={onMessage}
        onLoadEnd={onLoadEnd}
        ref={webViewRef}
        pullToRefreshEnabled={true}
        startInLoadingState={true}
        // renderLoading={() => <Loading />}
        onHttpError={onHttpError}
        onError={onHttpError}
        onNavigationStateChange={(navState) => {
          if (navState.url.includes("/login")) {
            handleLogout();
          }

          // if (navState.url.includes("about:blank")) {
          //   webViewRef.current.stopLoading();
          // }

          if (navState.url.includes("blob:")) {
            webViewRef.current.stopLoading();
          }
        }}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        javaScriptEnabled={true}
        allowFileAccess={true}
        allowingReadAccessToURL={true}
        allowUniversalAccessFromFileURLs={true}
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback={true}
        // mixedContentMode="always"
      />
    </SafeAreaView>
  );
};

export default Webview;
