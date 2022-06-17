import { render } from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./store/index";
import { injectInterceptor } from "./helpers/api_helper";
import { ToastContainer } from "react-toastify";
import BadRequestContainer from "./components/BadRequestContainer/BadRequestContainer";

let store = configureStore({});

injectInterceptor(store);

render(
  <Provider store={store}>
    <ToastContainer autoClose={2000} />
    <BadRequestContainer />
    <App />
  </Provider>,
  document.getElementById("root")
);
