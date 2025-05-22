import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { BrowserRouter } from "react-router-dom";
import { defaultSystem } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider value={defaultSystem}>
        <BrowserRouter>
          <Box minH="100vh" p={4}>
            <App />
          </Box>
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
