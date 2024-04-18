import axios from 'axios'

const URL = 'https://fakestoreapi.com'

export default axios.create({
    baseURL: URL,
    headers: {
        'Content-type': 'application/json',
    },
})
