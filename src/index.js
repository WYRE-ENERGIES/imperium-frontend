// import './index.css'
// import App from './App'
// import { Provider } from 'react-redux'
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { store } from './store'
// import InactivityTimeout from './path/to/InactivityTimeout'; // Adjust the path

// const root = ReactDOM.createRoot(document.getElementById('root'))
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
// )

import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './store';
import InactivityTimeout from './inactivityTimeout'; // Adjust the path

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <InactivityTimeout timeoutInSeconds={10}>
        <App />
      </InactivityTimeout>
    </Provider>
  </React.StrictMode>,
);
