import apiClient from './config';

export const getUserData = async () => {
    const response = await apiClient.get('User/profile');
    return response.data;
  }
  
  export const changePassword = async (payload) => {
    const response = await apiClient.post('User/change-password', payload);
    return response.data;
  }
  
  export const changeEmail = async (payload) => {
    const response = await apiClient.put('User/email', payload);
    return response.data;
  }
  