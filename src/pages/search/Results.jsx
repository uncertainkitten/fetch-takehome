import React, { useState, useEffect } from 'react'
import DisplayGrid from './DisplayGrid'
import { Button } from '@mui/material'
import { BASE_URL } from '../../helpers/constants'
import Search from './Search'
import { getDogQuery, getDogList, setHeaders } from '../../helpers/helperFunctions'

const Results = ({ initialData, setMatch }) => {
    const [dogQuery, setDogQuery] = useState([])
    const [dogList, setDogList] = useState([])
    const [isError, setIsError] = useState()
    const [isLoading, setIsLoading] = useState()
    const [totalRowCount, setTotalRowCount] = useState(0)
    const [selectedBreeds, setSelectedBreeds] = useState([])
    const [selectedDogs, setSelectedDogs] = useState([])
    const [matchId, setMatchId] = useState("")
    const [favorites, setFavorites] = useState(false)
    const [searchBy, setSearchBy] = useState("breeds")
    const [zipQuery, setZipQuery] = useState("")
    const [ageMinQuery, setAgeMinQuery] = useState(0)
    const [ageMaxQuery, setAgeMaxQuery] = useState(0)
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 25,
        page: 0,
      });

    const rowCountRef = React.useRef(totalRowCount || 0);
    
    const rowCount = React.useMemo(() => {
        if (totalRowCount !== undefined) {
            rowCountRef.current = totalRowCount;
        }
        return rowCountRef.current;
    }, [totalRowCount]);

    useEffect(() => {
        handleDogQuery("initial")
    }, [])

    useEffect(() => {
        handleDogList()
    }, [dogQuery, favorites, matchId])

    const handleDogQuery = async (params) => {
        if(params === "initial") {
            setDogQuery(initialData)
            setTotalRowCount(initialData.total)
        } else {
            setIsLoading(true)
            let data = await getDogQuery(params)
            setIsLoading(false)
            if(data.isError) {
                setIsError(true)
            } else {
                setDogQuery(data)
                setTotalRowCount(data.total)
            } 
        }
  
    }

    const handleDogList = async (params) => {
        setIsLoading(true)
        let body = JSON.stringify(dogQuery.resultIds)

        if(favorites) {
            body = JSON.stringify(selectedDogs)
        } else if (matchId) {
            body = JSON.stringify([matchId])
            let matchData = await getDogList(body)
            setIsLoading(false)
            setMatch(matchData[0])
            return
        }

        let data = await getDogList(body)
        if(data.isError) {
            setIsError(true)
        } else {
            setIsError(false)
            setDogList(data)
        }

        setIsLoading(false)
    }

    const getPageQuery = async(direction) => {
        let path = dogQuery[direction]
        setIsError(false)
        setIsLoading(true)
        const reqHeaders = setHeaders()
    
        try {
            const result = await fetch(`${BASE_URL}${path}`, 
                {
                    method: "GET",
                    headers: reqHeaders,
                    credentials: "include"
                })
            
            const data = await result.json()
            setDogQuery(await data)
            setTotalRowCount(await data.total)
            if(direction === "next") {
                setPaginationModel({
                    pageSize: 25,
                    page: paginationModel.page + 1,
                })
            } else if (direction === "prev") {
                setPaginationModel({
                    pageSize: 25,
                    page: paginationModel.page - 1,
                })
            }
        } catch (error) {
            setIsError(true)
        }

        setIsLoading(false)
    }

    const handlePaginationModelChange = async (e) => {
        if(e.page > paginationModel.page) {
            await getPageQuery("next")
        } else {
            await getPageQuery("prev")
        }
    }

    const handleSelect = (e) => {
        if(e.target.value.includes("clear")) {
            setSelectedBreeds([])
        } else {
            setSelectedBreeds(e.target.value)
        }
    }

    const handleSearchBy = (e) => {
        setSearchBy(e.target.value)
        if(searchBy !== "breeds") {
            setSelectedBreeds([])
        }
        if(searchBy !== "ageMin") {
            setAgeMinQuery(0)
        }
        if(searchBy !== "ageMax") {
            setAgeMaxQuery(0)
        }
        if(searchBy !== "zip") {
            setZipQuery("")
        }
    }

    const handleZipQuery = (e) => {
        setZipQuery(e.target.value)
    }
    
    const handleAgeMinQuery = (e) => {
        setAgeMinQuery(e.target.value)
    }

    const handleAgeMaxQuery = (e) => {
        setAgeMaxQuery(e.target.value)
    }

    const handleFavorites = () => {
        setFavorites(!favorites)
    }

    const renderFavoritesButton = () => {
        if(favorites) {
            return(<Button
                sx={{ borderRadius: 2, height: 60, width: 300, mr: 2 }}
                variant="contained"
                color="secondary"
                onClick={() => handleFavorites()}
                size="large"
            >
                See All Dogs
            </Button>)
        } else {
            return(<Button
                sx={{ borderRadius: 2, height: 60, width: 300, mr: 2}}
                variant="contained"
                color="secondary"
                onClick={() => handleFavorites()}
                disabled={!selectedDogs.length}
                size="large"
            >
                See Favorites
            </Button>)
        }
    }

    const handleSearch = () => {
        let params = ""
        if(searchBy === "ageMax" && ageMaxQuery > 0) {
            params = `?ageMax=${ageMaxQuery}`
        } else if(searchBy === "ageMin" && ageMinQuery > 0) {
            params = `?ageMin=${ageMinQuery}`
        } else if(searchBy === "breeds" && selectedBreeds.length) {
            params = `?breeds[]=${selectedBreeds.join("&breeds[]=")}`
        }  else if(searchBy === "zipCodes" && zipQuery.length) {
            params = `?zipCodes=${zipQuery}`
        }

        getDogQuery(params)
        setPaginationModel({
            pageSize: 25,
            page: 0
        })
    }

    const handleMatch = async () => {
        setIsError(false)
        setIsLoading(true)
        const reqHeaders = setHeaders()
    
        try {
            const result = await fetch(`${BASE_URL}/dogs/match`, 
                {
                    method: "POST",
                    headers: reqHeaders,
                    credentials: "include",
                    body: JSON.stringify(selectedDogs)
                })

            let data = await result.json()
            setMatchId(data.match)
        } catch (error) {
            setIsError(true)
        }

        setIsLoading(false)
    
    }

    return(<div>
        <Search
            handleSelect={handleSelect}
            handleSearchBy={handleSearchBy}
            handleZipQuery={handleZipQuery}
            handleAgeMinQuery={handleAgeMinQuery}
            handleAgeMaxQuery={handleAgeMaxQuery}
            handleSearch={handleSearch}
            selectedBreeds={selectedBreeds}
            searchBy={searchBy}
            zipQuery={zipQuery}
            ageMinQuery={ageMinQuery}
            ageMaxQuery={ageMaxQuery}
        />
        {renderFavoritesButton()}
        <Button
            sx={{ borderRadius: 2, height: 60, width: 500 }}
            variant="contained"
            color="primary"
            onClick={() => handleMatch()}
            size="large"
            disabled={selectedDogs.length === 0}
        >Match with your new furry friend!</Button>
        <DisplayGrid
            rowCount={rowCount}
            paginationModel={paginationModel}
            handlePaginationModelChange={handlePaginationModelChange}
            dogList={dogList}
            selectedDogs={selectedDogs}
            setSelectedDogs={setSelectedDogs}
            isLoading={isLoading}
        />
    </div>)

}

export default Results
