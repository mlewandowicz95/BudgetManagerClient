import apiClient from './config';
import Transaction from '@/models/Transaction';
import Goal from "@/models/Goal";




export const logout = async () => {
  const data = await apiClient.post('/Auth/logout');
  return data;
};

export const register = async (userData) => {
  const data = await apiClient.post('/Auth/register', userData);
  return data;
};

export const login = async (credentials) => {
  return await apiClient.post('/Auth/login', credentials);
};



export const resetPassword = async (userEmail) => {
    const response = await apiClient.post('/Auth/request-password-reset', userEmail);
    return response;
};



export const getAllTransaction = async (params) => {
  try {
    const response = await apiClient.get('Transaction', { params });
    const rawData = response.data;

    console.log("API Response:", rawData);

    return {
      items: rawData.items || [],
      totalPages: rawData.totalPages || 0,
      currentPage: rawData.currentPage || 1,
      totalItems: rawData.totalItems || 0,
    };
  } catch (error) {
    throw {
      message: error.response?.data?.message || 'An unexpected error occurred',
      status: error.response?.status || 500,
    };
  }
};


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
