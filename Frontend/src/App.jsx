import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/home' element={<Home/>} />
      <Route path='/' element={<Login/>} />
    </Routes>
    <Toaster position="bottom-right" />
    </>

  )
}

export default App
