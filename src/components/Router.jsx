import { useSelector, useDispatch } from "react-redux";
import { useLoading } from "../utils/LoadingContext";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";

import StackTemplate from "../components/StackTemplate";
import DrawerTemplate from "../components/DrawerTemplate";
import SplashScreen from "../components/SplashScreen";

import { oturumKontrol } from "../stores/auth";

function Router() {
  // Global Splash Screen loading setleme ve durumunu almak için kullanılır.
  const { loading, setLoading } = useLoading();

  // Redux'taki bir fonksiyonu çalıştırmak için dispatch kullanılır.
  const dispatch = useDispatch();

  // Redux'tan user state'i alıyoruz.
  const { user } = useSelector((state) => state.auth);

  // Component çalıştığında oturum kontrolü yapılıyor.
  // Not: Başlangıçta tek sefer çalışması için 2. parametre [0] şeklinde ayarladık.
  useEffect(() => {
    // SplashScreen loading
    setLoading(true);

    // Oturum kontrolü
    dispatch(oturumKontrol()).then(() => {
      // Kontrol tamamlandıktan sonra SplashScreen loading kapatılıyor
      setLoading(false);
    });
  }, [0]);

  // Eğer loading aktif ise SplashScreen kullanılıyor.
  // Değilse state'deki user bilgisi varsa DrawerTemplate (Panel Ekranı) kullanılıyor.
  // Değilse StackTemplate (Login Ekranı) kullanılıyor.
  return (
    <>
      <NavigationContainer>
        {loading ? (
          <SplashScreen />
        ) : user ? (
          <DrawerTemplate />
        ) : (
          <StackTemplate />
        )}
      </NavigationContainer>
    </>
  );
}

export default Router;
