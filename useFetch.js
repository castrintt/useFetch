import React, { useState, useEffect, useContext } from "react"
import AuthContext from "../context/AuthContext"

const useFetch = (url, met) => {
    let { authTokens } = useContext(AuthContext)
    
    const [data, setData] = useState(null)
    const [method, setMethod] = useState(met)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [itemId, setItemId] = useState(null)
    
    useEffect(() => {
        if (method === "POST") console.log("AAAAA")
        const header = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + String(authTokens.access),
        } 

        const httpRequest = async () => {
            try {
                if (method === "POST") {
                    const response = await fetch(url, {
                        method: "POST",
                        headers: header,
                        body: JSON.stringify(data)
                    })
                    const json = await response.json()
                    setMethod("GET")

                } else if (method === "DELETE") {
                    const deleteUrl = `${url}/${itemId}`
                    const response = await fetch(deleteUrl, {
                        method: "DELETE",
                        headers: header,
                    })
                    const json = await response.json()
                    setMethod("GET")

                } else if (method === "GET") {
                    setLoading(true)
                    const response = await fetch(url, {
                        method: "GET",
                        headers: header,
                    })
                    const json = await response.json()
                    setData(json)
                    setLoading(false)
                }
            } catch (error) {
               setError(`${error}: Houve um erro ao carregar dados`)
            }
        }
        httpRequest()
    }, [method, url, authTokens])
    
    return { data, loading, error}
}

export default useFetch