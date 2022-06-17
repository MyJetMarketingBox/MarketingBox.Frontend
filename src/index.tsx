import { render } from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "./store/index";
import { injectInterceptor } from "./helpers/api_helper";
import { ToastContainer } from "react-toastify";
import BadRequestContainer from "./components/BadRequestContainer/BadRequestContainer";

render(<App />, document.getElementById("root"));
