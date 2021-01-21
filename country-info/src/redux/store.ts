import { combineReducers, createStore, applyMiddleware } from "redux";

import { AppActions, CLEAR_STORE } from "./types";
// import * as combatantReducers from "../combatants/reducers";
// import * as panelReducers from "../central-panel/reducers";

const appReducer = combineReducers({
  // ...combatantReducers,
  // ...panelReducers,
});

export const rootReducer = (state: StoreState, action: AppActions) => {
  if (action.type === CLEAR_STORE) {
    state = undefined;
  }

  return appReducer(state, action);
};

export type StoreState = ReturnType<typeof appReducer> | undefined;
export const store = createStore(rootReducer);
