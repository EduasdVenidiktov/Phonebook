import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store"; //Redux store
import App from "./App"; //головний компонент
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
