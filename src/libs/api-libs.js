export const getAnimeResponse = async(resource, query) => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}?${query}`)
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const anime = await response.json();
                return anime;
            } catch (error) {
                console.error('Error fetch data:', error)
            }
}

export const getNestedAnimeResponse = async (resource, objectProperty) => {
    const response = await getAnimeResponse(resource)
    return response.data.flatMap(item => item[objectProperty])
}

export const reproduce = (data, gap) => {
    const x = ~~(Math.random() * (data.length - gap) + 1)
    const y = x + gap
    const response = { data: data.slice(x, y) }
    return response
}