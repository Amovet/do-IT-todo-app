import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/index.scss';
import App from './App';
import {Provider} from "react-redux";
import store from './redux/Store'
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import Auth from './hoc/Auth-layout'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
      <Provider store={store}>
         <Auth>
            <App />
         </Auth>
      </Provider>
  </BrowserRouter>
);

reportWebVitals();
