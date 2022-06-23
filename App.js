import Router from "./src/routes";
import store from "./src/stores"
import { Provider } from 'react-redux';
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import axios from "axios";
import { LoadingProvider } from "./src/utils/LoadingContext";

axios.defaults.baseURL = "https://dev.doruk.kodgaraj.com/api";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2A3F93",
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
