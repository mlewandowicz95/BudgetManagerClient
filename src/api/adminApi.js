import apiClient from './config';


export const getAllUsers = async (params) => {
  try {
    console.log("Wysyłane parametry:", params);

    const queryParams = new URLSearchParams();

    // Przekazywanie ról jako powtarzalne parametry
    if (params.roles && params.roles.length > 0) {
      params.roles.forEach(role => queryParams.append("roles", role));
    }

    // Pozostałe parametry
    if (params.isActive !== undefined) queryParams.append("isActive", params.isActive);
    if (params.page) queryParams.append("page", params.page);
    if (params.pageSize) queryParams.append("pageSize", params.pageSize);
    if (params.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);

    const response = await apiClient.get(`Admin/users?${queryParams.toString()}`);
    console.log("Odpowiedź z backendu:", response.data);

    return response.data;
  } catch (error) {
    console.error("Błąd podczas pobierania użytkowników:", error.response || error.message);
    throw new Error(
      error.response?.data?.message || "Nie udało się pobrać użytkowników."
    );
  }
};

export const updateUser = async (id, userData) => {
    try {
      const response = await apiClient.put(`/api/Admin/${id}`, userData);
      return response.data;
    } catch (error) {
      throw new Error("Nie udało się zaktualizować użytkownika.");
    }
  };
  
  export const deleteUser = async (id) => {
    try {
      await apiClient.delete(`/api/Admin/${id}`);
    } catch (error) {
      throw new Error("Nie udało się usunąć użytkownika.");
    }
  };

