import { useState, useEffect } from 'react'
import {
    TextField,
    Select,
    Radio,
    FormControl,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    MenuItem,
    InputLabel,
    FormGroup,
    Button
} from '@mui/material'
import { BASE_URL } from '../../helpers/constants'

const Search = ({
    handleSearchBy,
    handleSelect,
    handleZipQuery,
    handleAgeMinQuery,
    handleAgeMaxQuery,
    handleSearch,
    ageMinQuery,
    ageMaxQuery,
    searchBy,
    selectedBreeds,
    zipQuery
}) => {
    const [breeds, setBreeds] = useState([])
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
    };

    useEffect(() => {
        getBreeds()
    }, [])

    const getBreeds = async () => {
        setIsError(false)
        setIsLoading(true)
        const reqHeaders = new Headers()
        reqHeaders.append("credentials", "include")
        reqHeaders.append("Content-Type", "application/json")
        
        try {
            const result = await fetch(`${BASE_URL}/dogs/breeds`, 
                {
                    method: "GET",
                    headers: reqHeaders,
                    credentials: "include"
                })
            
            const data = await result.json()
            setBreeds(await data)
        } catch (error) {
            setIsError(true)
        }
        setIsLoading(false)
    }

    const renderInput = () => {
        if(searchBy === "breeds") {
            return (<FormControl sx={{ m: 1, minWidth: 225 }}>
                <InputLabel id="breed-select-label">Breed</InputLabel>
                <Select
                    labelId="breed-select-label"
                    id="breed-select"
                    multiple={true}
                    disabled={(searchBy !== "breeds")}
                    value={selectedBreeds}
                    onChange={(e) => handleSelect(e)}
                    MenuProps={MenuProps}
                    autoWidth
                >
                <MenuItem value="clear" key="clear_-1">Clear All</MenuItem>
                    {breeds.map((breed, idx) => {
                        return <MenuItem value={breed} key={`${breed}_${idx}`}>{breed}</MenuItem>
                    })}
                </Select>
            </FormControl>)
        } else if(searchBy === "ageMin") {
            return(
                    <TextField
                        sx={{ m: 1, minWidth: 225 }}
                        label="Age min"
                        value={ageMinQuery}
                        onChange={handleAgeMinQuery}
                    />
                   )
        } else if (searchBy === "ageMax") {
            return(<TextField
                sx={{ m: 1, minWidth: 225 }}
                label="Age max"
                value={ageMaxQuery}
                onChange={handleAgeMaxQuery}
            />)
        } else {
            return (<TextField
                sx={{ m: 1, minWidth: 225 }}
                label="Zip Code"
                value={zipQuery}
                onChange={handleZipQuery}
            />)
        }
    }
    return(
        <FormGroup sx={{ m: 2, ml: 10, justifyItems: "center"}} row>
            {renderInput()}
            <FormControl sx={{ m: 1, minWidth: 80 }}>
                <FormLabel id="search-by">Search By</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="search-by"
                    defaultValue="breeds"
                    name="search-by-group"
                    value={searchBy}
                    onChange={(e) => handleSearchBy(e)}
                >
                    <FormControlLabel value="breeds" control={<Radio />} label="Breed" />
                    <FormControlLabel value="ageMin" control={(<Radio />)} label="Age Min" />
                    <FormControlLabel value="ageMax" control={(<Radio />)} label="Age Max" />
                    <FormControlLabel value="zipCodes" control={(<Radio />)} label="Zip Code" />
                </RadioGroup>
            </FormControl>
            <Button
                sx={{ borderRadius: 2, height: 60, width: 200 }}
                variant="outlined"
                onClick={() => handleSearch()}
                size="small"
            >
                Search Dogs
            </Button>
        </FormGroup>
    )
}

export default Search
