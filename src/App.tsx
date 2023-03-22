// libs
import { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// routes
import appRoutes from "@/routes";
// providers
import { ConfirmProvider, ReduxProvider } from "./providers";
import { ThemeProvider } from "@mui/material/styles";
// others
import { theme } from "./themes";
import { AppEffects } from "./AppEffects";
import { RecursiveRender } from "@/utils/others";
import "@/styles/index.css";

/**
 * App
 */
export default function App() {
  return (
    <RecursiveRender
      structure={[
        [BrowserRouter, {}],
        [Suspense, { fallback: "Suspensed" }],
        [ThemeProvider, { theme }],
        [ConfirmProvider, {}],
        [ReduxProvider, {}],
        [Switch, {}],
      ]}
    >
      <AppEffects />
      {appRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </RecursiveRender>
  );
}
