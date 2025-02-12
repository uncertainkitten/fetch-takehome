import { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'

const Results = () => {
    const [dogQuery, setDogQuery] = useState([])
    const [dogList, setDogList] = useState([])
    const [isError, setIsError] = useState()
    const [isLoading, setIsLoading] = useState()
    const [page, setPage] = useState(1)
    const [dataPage, setDataPage] = useState([])

    const cols = [
            {field: 'img',
            headerName: 'Picture',
            width: 300,
            renderCell: (params) => <img src={params.value} width="300" height="300" />},
            {field: 'name', headerName: 'Name', width: 150},
            {field: 'age', headerName: 'Age', width: 100},
            {field: 'zip_code', headerName: 'Zip Code', width: 150},
            {field: 'breed', headerName: "Breed", width: 150}
        ]

    useEffect(() => {
        getDogQuery()
    }, [])

    useEffect(() => {
        getDogList()
    }, [dogQuery])

    // need to make this more flexible
    const getDogQuery = async () => {
        setIsError(false)
        setIsLoading(true)
        const reqHeaders = new Headers()
        reqHeaders.append("credentials", "include")
        reqHeaders.append("Content-Type", "application/json")
    
        try {
            const result = await fetch("https://frontend-take-home-service.fetch.com/dogs/search", 
                {
                    method: "GET",
                    headers: reqHeaders,
                    credentials: "include"
                })
            
            setDogQuery(await result.json())
        } catch (error) {
            setIsError(true)
        }

        setIsLoading(false)
    }

    const getDogList = async () => {
        setIsError(false)
        setIsLoading(true)
        const reqHeaders = new Headers()
        reqHeaders.append("credentials", "include")
        reqHeaders.append("Content-Type", "application/json")
    
        try {
            const result = await fetch("https://frontend-take-home-service.fetch.com/dogs", 
                {
                    method: "POST",
                    headers: reqHeaders,
                    credentials: "include",
                    body: JSON.stringify(dogQuery.resultIds)
                })
            
            setDogList(await result.json())
        } catch (error) {
            setIsError(true)
        }

        setIsLoading(false)
    }

    return(<div>
        <DataGrid
            getRowHeight={() => "auto"}
            rows={dogList}
            columns={cols}
            checkboxSelection
            sx={{ border: 0, fontSize: 20 }}
        />
    </div>)

}

export default Results
