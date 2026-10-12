import { Provider } from "react-redux";
import Body from "./component/Body";
import Head from "./component/Head";
import store from "./utils/store";
export default function App({ appStore = store }) {
  return (
    <Provider store={appStore}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Head />
      <Body />
    </Provider>
  );
}
