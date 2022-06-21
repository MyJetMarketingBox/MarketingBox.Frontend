import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers";
import rootSaga from "./sagas";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
const sagaMiddleware = createSagaMiddleware();

let middlewares: any = [];
const logger = createLogger();

if (process.env.NODE_ENV === "development") {
  middlewares = [sagaMiddleware, logger];
} else {
  middlewares = [sagaMiddleware];
}
const composeEnhancers = composeWithDevTools({});

export function configureStore(initialState: any) {
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
