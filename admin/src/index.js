import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { MovieContextProvider } from "./context/movieContext/MovieContext";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <MovieContextProvider>
     
            <App />
   
        </MovieContextProvider>
      </AuthContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
