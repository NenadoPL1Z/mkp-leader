import loadingReducer from "./reducers/loading/loading";
import globalReducer from "./reducers/global/global";
import userReducer from "./reducers/user/user";

export const rootReducer = {
  loading: loadingReducer,
  global: globalReducer,
  user: userReducer,
};
