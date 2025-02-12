import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login.jsx'
import Results from './pages/search/Results.jsx'

function App() {
  return (
    <>
      <Login />
      <Results />
    </>
  )
}

export default App
