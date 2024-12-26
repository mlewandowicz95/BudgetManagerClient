import apiClient from './config';

const login = async (credentials) => {
  try {
    const response = await apiClient.post('/Auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const logout = async () => {
    try{
        const response = await apiClient.post('/Auth/logout');
        return response.data;
    } catch(error) {
        throw error.response ? error.response.data : error;
    }
}

const register = async (userData) => {
  try {
    const response = await apiClient.post('/Auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};


export default {
  login,
  logout,
  register,
};
