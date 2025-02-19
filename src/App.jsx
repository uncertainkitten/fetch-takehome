import { useState, useEffect } from 'react'
import './App.css'
import Login from './pages/Login.jsx'
import Results from './pages/search/Results.jsx'
import Match from './pages/match/Match.jsx'
import { getDogQuery } from './helpers/helperFunctions.js'
import { CircularProgress } from '@mui/material'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [match, setMatch] = useState(false)
  const [loginRequired, setLoginRequired] = useState(false)
  const [initialData, setInitialData] = useState({})
  

  useEffect(() => {
    getInitialQuery()
  }, [])

  const getInitialQuery = async () => {
    setIsLoading(true)
    let data = await getDogQuery("")

    if(data.resultIds) {
      setInitialData(data)
    } else if(data.error) {
      setLoginRequired(true)
    }

    setIsLoading(false)
  }
  const renderPage = () => {
    if(isLoading) {
      return(<CircularProgress />)
    } else if(loginRequired) {
      return(<Login
        getInitialQuery={getInitialQuery}
        setLoginRequired={setLoginRequired}
      />)
    } else if(!match) {
      return(<Results
        initialData={initialData}
        setMatch={setMatch}
      />)
    } else if (match) {
      return(<Match
        dogImg={match.img}
        dogAge={match.age}
        dogName={match.name}
        dogBreed={match.breed}
        dogZip={match.zip_code}
      />)
    }
  }

  return (
    <>
      {renderPage()}
    </>
  )
}

export default App
