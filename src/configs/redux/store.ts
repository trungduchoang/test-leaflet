import thunk from "redux-thunk";
import { createStore, compose, applyMiddleware } from "redux";
import { rootReducer } from "./rootReducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const initialState = {};

const composeWithDevTool =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTool(applyMiddleware(thunk)),
);

export { store };
