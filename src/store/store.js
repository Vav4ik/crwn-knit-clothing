// import {
//   applyMiddleware,
//   compose,
//   legacy_createStore as createStore,
// } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "@redux-saga/core";

import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["cart"],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
].filter(Boolean);

// const composedEnhancer =
//   (process.env.NODE_ENV !== "production" &&
//     window &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;

// const composedEnhancers = composedEnhancer(applyMiddleware(...middlewares));

// export const store = createStore(
//   persistedReducer,
//   undefined,
//   composedEnhancers
// );
export const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares
});

sagaMiddleware.run(rootSaga)

// export const persistor = persistStore(store);
