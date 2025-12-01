import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Routess from './Routes'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import store from './store/index'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Routess />
  </Provider>,
)
