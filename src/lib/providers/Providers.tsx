"use client";

import { persistor, store } from "@/redux/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import theme from "@/lib/theme/theme";
import React from "react";
import { PersistGate } from "redux-persist/integration/react";

type TProps = { children: React.ReactNode }

const Providers = ({children}: TProps) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default Providers;