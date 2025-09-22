import axious from 'axios'

export const Api = axious.create({
    baseURL:"http://localhost:5000/",
    withCredentials: true
})
