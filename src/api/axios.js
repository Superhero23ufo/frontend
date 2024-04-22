import axios from 'axios'

export const URL = 'https://frontend-unvu.onrender.com/api'

export default axios.create({
    baseURL: URL,
    headers: {
        'Content-type': 'application/json',
    },
})
