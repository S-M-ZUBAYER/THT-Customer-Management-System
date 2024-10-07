import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserContext from './context/UserContext';
// import UserContext_CN from './context/UserContext_CN';
import ProductContextProvider from './context/ProductContext';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));




root.render(
  <React.StrictMode>
    <UserContext>
      {/* <UserContext_CN> */}

      <ProductContextProvider>
        <Toaster></Toaster>

        <App />


      </ProductContextProvider>
      {/* </UserContext_CN> */}
    </UserContext>
  </React.StrictMode>
);


