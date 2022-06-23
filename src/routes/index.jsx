import { useSelector, useDispatch } from "react-redux";
import { useLoading } from "../utils/LoadingContext";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";

import StackTemplate from "../components/StackTemplate";
import DrawerTemplate from "../components/DrawerTemplate";
import SplashScreen from "../components/SplashScreen";

import { oturumKontrol } from "../stores/auth";

function Router() {
  const { loading, setLoading } = useLoading();
  const dispatch = useDispatch();
  console.log("loading", loading);
  console.log("user", user);

  useEffect(() => {
    setLoading(true);
    dispatch(oturumKontrol()).then(() => {
      setLoading(false);
    });
  }, [1]);

  const { user } = useSelector((state) => state.auth);
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
