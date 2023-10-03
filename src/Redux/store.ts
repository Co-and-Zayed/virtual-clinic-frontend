import { rootReducers } from "Redux/rootReducer";
import { applyMiddleware, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";

import { composeWithDevTools } from "redux-devtools-extension";
// import {resetErrorAndLoading} from 'utils/resetErrorAndLoading';
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const persistConfig = {
  key: "persist-key",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
const persistor = persistStore(store);

export default store;
export { persistor };
