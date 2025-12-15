import "./assets/css/global.css"
import React from "react";
import { createRoot } from "react-dom/client";
import RouterConfig from "./config/router.config";
import { AuthProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import { store } from "./config/store.config";
const virDom = createRoot(document.getElementById('root')!)

virDom.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <RouterConfig />
      </Provider>
    </AuthProvider>
  </React.StrictMode>
)