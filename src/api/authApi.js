import apiClient from './config';
import Transaction from '@/models/Transaction';
import Goal from "@/models/Goal";

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

export const getAllTransaction = async (params) => {
  try{
    const response = await apiClient.get('Transaction', { params });
    const rawData = response.data;
    return rawData;
  } catch(error) {
    throw {
      message: error.response?.data?.message || 'An unexpected error occurred',
      status: error.response?.status || 500,
    };
  }
}




export const fetchDashboardData = async () => {
  try {
    const response = await apiClient.get("/Dashboard/dashboard");
    const rawData = response.data;

    return {
      totalIncome: rawData.totalIncome,
      totalExpenses: rawData.totalExpenses,
      balance: rawData.balance,
      recentTransactions: rawData.recentTransactions.map(tx => new Transaction(tx)),
      savingGoals: rawData.savingGoals.map(goal => new Goal(goal)),
    };
  } catch (error) {
    console.error("Error in fetchDashboardData:", error);
    throw error.response ? error.response.data : error;
  }
};


export const expensesByCategory = async () => {
  try {
    const response = await apiClient.get("/Dashboard/dashboard/expenses-by-category");
    const rawData = response.data;

  
    return rawData.map(item => ({
      category: item.category,
      totalAmount: item.totalAmount,
    }));
  } catch (error) {
    console.error("Error in expensesByCategory:", error);
    throw error.response ? error.response.data : error;
  }
};
