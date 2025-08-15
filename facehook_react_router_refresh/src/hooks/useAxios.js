import axios from "axios"
import { useEffect } from "react"
import { api } from "../api"
import { useAuth } from "./useAuth"

const useAxios = () => {
    const { auth, setAuth } = useAuth()

    useEffect(() => {
        // add a request intercept
        const requestIntercept = api.interceptors.request.use((config) => {
            console.log("config from request", config)
            const authToken = auth?.authToken;

            if (authToken) {
                config.headers.Authorization = `Bearer ${authToken}`
            }

            return config
        }, (error) => Promise.reject(error))

        // add a response intercept
        const responseIntercept = api.interceptors.response.use((response) => response, async (error) => {
            // console.log("error from response", error)
            const originalRequest = error.config;

            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true

                try {
                    const refreshToken = auth?.refreshToken;

                    const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`, { refreshToken })

                    const { token } = response.data
                    setAuth({...auth, authToken: token})

                    // console.log("New TOKEN", token)
                    originalRequest.headers.Authorization = `Bearer ${token}`

                    // console.log("originalRequest", originalRequest)

                    return axios(originalRequest) // perform request: do again request after setting new token
                } catch (error) {
                    console.log("err", error)
                    throw error
                }
            }

            return Promise.reject(error)
        })

        return () => {
            // when the component becomes unmount, the intercept becomes eject. otherwise it will call infinite loop
            api.interceptors.request.eject(requestIntercept) 
            api.interceptors.response.eject(responseIntercept) 
        }
    }, [auth.authToken, auth, setAuth]) 
    // When to run the useEffect: when authToken updates and when the component becomes unmount

    return {api}
}

export default useAxios

// axios gave us power to intercept with request and response. we can do anything when it is requesting and responsing from backend then we can send request to the server and response to the client after doing something..