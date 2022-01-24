import { render } from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./store/index";
import axios from "axios";

/*async function init (){
  console.log(1);
  try {
    // @ts-ignore
    const res = await axios.get(process.env.REACT_APP_SETTINGS_URL)
    console.log(res);




  }catch (e) {

  }
}

init();*/


render(
  <Provider store={configureStore({})}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

