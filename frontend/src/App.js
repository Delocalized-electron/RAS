import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import store from "./store";
import AuthChecker from "./components/AuthChecker";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthChecker>
          <AppRoutes />
        </AuthChecker>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
