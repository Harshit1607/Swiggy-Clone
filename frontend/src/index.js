import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import store from './Redux/store.jsx';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import './css/Index.css';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter> {/* Wrap App with BrowserRouter */}
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
