// routes
import { ROUTES } from "./routes";
// pages
import HomePage from "@/pages/Home";

/**
 * define main pages routes
 */
export default [
  {
    path: ROUTES.HOME,
    pageName: "Home",
    exact: true,
    component: HomePage,
  },
];
