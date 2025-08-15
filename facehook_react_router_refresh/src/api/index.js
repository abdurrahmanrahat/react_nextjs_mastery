import axios from "axios";

export const api = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}`
})

// axios gave us power to intercept with request and response. we can do anything when it is requesting and responsing from backend then we can send request to the server and response to the client after doing something..