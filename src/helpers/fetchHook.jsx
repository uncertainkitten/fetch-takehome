import { useState, useEffect } from 'react'

const base = "https://frontend-take-home-service.fetch.com"

const useFetch = ({ path, method, body }) => {
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false)
            setIsLoading(true)

            try {
                const result = await fetch(`${base}/${path}`, {
                    method: method,
                    body: JSON.stringify(body),
                    headers: { credentials: "include" }
                })

                setData(result)
            } catch (error) {
                setIsError(true)
            }

            setIsLoading(false)
        }
        
        fetchData()
    }, [])

    return { data, isLoading, isError }
}

export default useFetch
