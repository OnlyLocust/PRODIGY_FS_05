import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../store/store.js'
import cors from 'cors'

cors({
  origin:'https://posty-0rlh.onrender.com',
  credentials:true
})

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>
    </BrowserRouter>
  // </StrictMode>,
)
