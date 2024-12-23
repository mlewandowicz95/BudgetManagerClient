import axios from 'axios'

const apiClient = axios.create({
    baseUrl: 'http://localhost:7083/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwtToken')
    if(token){
        config.headers.Authorization = 'Bearer ${token}'
    }
    return config
})

export default apiClient;