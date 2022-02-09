import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LobbyPage from './pages/LobbyPage';
import LoginPage from './pages/LoginPage';
import {
  BrowserRouter, Routes,
  Route
} from "react-router-dom";
import AuthCheck from "./auth/AuthCheck";
import { Provider } from 'react-redux'
import store from "./redux/store"
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="lobby" element={<AuthCheck><LobbyPage /></AuthCheck>} />
              <Route path="/" element={<AuthCheck><LobbyPage /></AuthCheck>} />
              <Route path="login" element={<LoginPage />} />
            </Route>
          </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

