export const filterByNameOrBreed = (list, query, key) => {
    const results = list.filter((dog) => {
        if(dog[key].startsWith(query)) {
            return dog
        }
    })

    return results
}

export const filterByZip = (list, query) => {
    const results = list.filter((dog) => {
        if(dog["zip"] === query) {
            return dog
        }
    })

    return results
}
