import Router from "./src/routes";
import store from "./src/stores"
import { Provider } from 'react-redux';

import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2A3F93",
  }
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <Router />
      </Provider>
    </PaperProvider>
  );
}
