import Router from "./src/components/Router";
import store from "./src/stores"
import { Provider } from 'react-redux';
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { LoadingProvider } from "./src/utils/LoadingContext";

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
