import { BASE_URL } from "./constants"

export const setHeaders = () => {
    const reqHeaders = new Headers()
    reqHeaders.append("credentials", "include")
    reqHeaders.append("Content-Type", "application/json")
    return reqHeaders
}

export const getDogQuery = async (params) => {
    const reqHeaders = setHeaders()
    let data = false

    try {
        const result = await fetch(`${BASE_URL}/dogs/search${params}`, 
            {
                method: "GET",
                headers: reqHeaders,
                credentials: "include"
            })
        
        data = await result.json()
    } catch (error) {
        data = { isError: true, error: error }
    }

    return data
}

export const getDogList = async (body) => {
    const reqHeaders = setHeaders()
    let data = false
    console.log(body)
    try {
        const result = await fetch(`${BASE_URL}/dogs`, 
            {
                method: "POST",
                headers: reqHeaders,
                credentials: "include",
                body: body
            })
        data = await result.json()
    } catch (error) {
        data = { isError: true, error: error }
    }

    return data
}

export const findFavoritesPage = (page, favorites) => {
    let start = page * 25
    let end = (page + 1) * 25
    if(end > favorites.length) {
        end = favorites.length
    }
    return favorites.slice(start, end)
}

