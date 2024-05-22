"use client";

import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import theme from "@/lib/theme/theme";
import React from "react";

type TProps = { children: React.ReactNode }

const Providers = ({children}: TProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
};

export default Providers;