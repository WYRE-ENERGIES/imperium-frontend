import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { store } from './store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="924325109646-o67mb2njlourq5jfscuqjepabcn1h5mj.apps.googleusercontent.com">
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
