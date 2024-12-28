import apiClient from './config';
import Transaction from '@/models/Transaction';

export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/Auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'An unexpected error occurred' };
  }
};

export const logout = async () => {
  try {
    const response = await apiClient.post('/Auth/logout');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'An unexpected error occurred' };
  }
};

export const register = async (userData) => {
  try {
    const response = await apiClient.post('/Auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'An unexpected error occurred' };
  }
};

export const fetchDashboardData = async () => {
  try {
    const response = await apiClient.get('/Dashboard/dashboard');

    return {
      ...response.data,
      recentTransactions: response.data.recentTransactions.map(
        (tx) => new Transaction(tx)
      ),
    };
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

