// libs
import { combineReducers } from "redux";
// reducers
import * as reducers from "@/redux/reducers";

export const rootReducer = combineReducers({
  ...reducers,
});
export type TRootReducer = ReturnType<typeof rootReducer>;
export type TPageReducer = keyof TRootReducer;
