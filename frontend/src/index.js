import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import theme from "./Utils/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { ColorModeProvider } from "@chakra-ui/react";
import store from "./Redux/Store/store";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ChakraProvider>
    <ColorModeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ColorModeProvider>
  </ChakraProvider>
);

reportWebVitals();
