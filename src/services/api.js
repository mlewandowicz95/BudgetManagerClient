import axios from 'axios'

const apiClient = axios.create({
    baseUrl: 'http://localhost:500/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;