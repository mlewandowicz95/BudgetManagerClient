import apiClient from './config';



export const logout = async () => {
  const data = await apiClient.post('/Auth/logout');
  return data;
};

export const register = async (userData) => {
  const data = await apiClient.post('/Auth/register', userData);
  return data;
};

export const confirmEmail = async (token) => {
  try {
    const response = await apiClient.get('/Auth/confirm-email', {
      params: { token },
    });
    return response; // Interceptor obsłuży odpowiedź
  } catch (error) {
    console.error("Błąd podczas potwierdzania emaila:", error);
    throw error; // Rzucamy dalej, by obsłużyć w widoku
  }
};

export const login = async (credentials) => {
  return await apiClient.post('/Auth/login', credentials);
};




export const requestPasswordReset = async (userEmail) => {
    const response = await apiClient.post('/Auth/request-password-reset', userEmail);
    return response;
};

export const resetPassword = async (resetData) => {
  return await apiClient.post("/Auth/reset-password", resetData);
};


export const fetchDashboardData = async () => {
  const response = await apiClient.get("/Dashboard");
 // console.log("Odpowiedz z API: ", response);
  return response;

};

export const getExpensesByCategory = async () => {
    const response = await apiClient.get("/Dashboard/expenses-by-category");
    //console.log("Odpowiedz expensesByCategory z API: ", response);
    return response

}; 

export const getFinancialIndicators = async () => {
  const response = await apiClient.get("/Dashboard/financial-indicators");
 // console.log("Odpowiedz getFinancialIndicators z API: ", response);
  return response
}

export const getBudgetForecast = async () => {
  const response = await apiClient.get("/Dashboard/budget-forecast");
  return response;
}

export const getBalancePerMonth = async() => {
  const response = await apiClient.get("/Dashboard/balance-per-month");
  //console.log("Odpowiedź z API (BalancePerMonth):", response);
  return response;
}


export const addTransaction = async (transactionData) => {
  return await apiClient.post("/Transaction", transactionData);
};

export const fetchCategories = async () =>{
  const response = await apiClient.get('/Category');
  //console.log("Odpowiedź z API (fetchCategories):", response);
  return response;
}

export const fetchGoals = async () => {
  const response = await apiClient.get('/Goal');
  console.log("Odpowiedź z API (fetchGoals):", response);
  return response;
}

export const addGoal = async (goalData) => {
  return await apiClient.post('/Goal', goalData);
}

export const fetchUserProfile = async () => {
  const response = await apiClient.get("/User/profile");
  return response; // Zwracanie tylko danych użytkownika
};

export const changePassword = async (passwordData) => {
  //console.log("PasswordData: ", passwordData);
  return await apiClient.post("/User/profile/change-password", passwordData);
};

export const changeEmail = async (emailData) => {
  //console.log("EmailData: ", emailData);
  return await apiClient.put("/User/profile/email", emailData);
};

export const getConfirmEmailChange = async (token) => {
  return await apiClient.get("/User/confirm-email-change", {
    params: { token },
  });
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




