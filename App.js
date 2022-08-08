import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";

// Utils
import { LoadingProvider } from "./src/utils/LoadingContext";

// Router
import RouterWebView from "./src/navigations/RouterWebView";

// Store
import store from "./src/stores";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2A3F93",
    secondary: "#616161",
    danger: "#B61A4E",
    success: "#4CAF50",
    warning: "#FFB022",
    info: "#03a9f4",
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <LoadingProvider>
          <RouterWebView />
        </LoadingProvider>
      </PaperProvider>
    </Provider>
  );
}
