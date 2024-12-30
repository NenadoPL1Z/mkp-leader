import { configureStore } from "@reduxjs/toolkit";
import { apiInstance } from "@app/lib/http";
import { rootReducer } from "./rootReducer";

const extraArgument = apiInstance;

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: { extraArgument },
      serializableCheck: false,
    });
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

interface Store {
  dispatch: AppDispatch;
  state: RootState;
  extra: typeof extraArgument;
}

export { store };
export type { RootState, AppDispatch, Store };
