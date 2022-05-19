import { useState, useEffect } from 'react'

export const useFetch = (url) => {
    const [data, setData] = useState(null)
    //refatorando post
    const [config, setConfig] = useState(null)
    const [method, setMethod] = useState(null)
    const [callFetch, setCallFetch] = useState(false)

    //loading
    const [loading, setLoading] = useState(false)

    //tratativa de erro
    const [error, setError] = useState(null)

    //desafio 

    const [itemId, setItemId] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await fetch(url)

                const json = await res.json()

                setData(json)

            } catch (error) {
                setError('houve um erro ao carregar dados')
            }
            setLoading(false)
        }

        fetchData()
    }, [url, callFetch])


    // post

    const httpConfig = (data, method) => {
        if (method === "POST") {
            setConfig({
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            setMethod(method)

        } else if (method == "DELETE") {
            setConfig({
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            setMethod(method)
            setItemId(data)
        }

    }


    useEffect(() => {
        const httpRequest = async () => {


            if (method == "POST") {

                let fetchOptions = [url, config]

                const res = await fetch(...fetchOptions)

                const json = await res.json()

                setCallFetch(json)

            } else if (method == "DELETE") {

                const deleteUrl = `${url}/${itemId}`

                const res = await fetch(deleteUrl, config)

                const json = await res.json()

                setCallFetch(json)
            }
        }
        httpRequest()

    }, [config, method, url])



    return { data, httpConfig, loading, error }
}
