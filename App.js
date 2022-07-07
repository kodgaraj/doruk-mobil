import { useEffect } from "react";
import { Provider, useDispatch } from 'react-redux';
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";

// Utils
import { LoadingProvider } from "./src/utils/LoadingContext";

// Router
import Router from "./src/navigations/Router";

// Store
import store from "./src/stores"

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
