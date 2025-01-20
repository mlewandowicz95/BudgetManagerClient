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
    const response = await apiClient.put(`/Admin/${id}`, userData);
    console.log("Użytkownik zaktualizowany:", response.data);
    return response.data; // Zwracaj dane w przypadku sukcesu
  } catch (error) {
    // Obsługa błędów
    console.error("Błąd podczas aktualizacji użytkownika:", error.response || error.message);

    // Specyficzne komunikaty błędów na podstawie kodu odpowiedzi
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 400:
          throw new Error(data?.message || "Nieprawidłowe dane wejściowe.");
        case 404:
          throw new Error(data?.message || `Użytkownik o ID ${id} nie został znaleziony.`);
        case 409:
          throw new Error(data?.message || "Wystąpił konflikt przy aktualizacji użytkownika.");
        case 500:
          throw new Error(data?.message || "Błąd serwera. Spróbuj ponownie później.");
        default:
          throw new Error("Nie udało się zaktualizować użytkownika.");
      }
    } else {
      // Obsługa innych błędów, np. problem z siecią
      throw new Error("Nie udało się połączyć z serwerem. Sprawdź połączenie internetowe.");
    }
  }
};
  
  export const deleteUser = async (id) => {
    try {
      await apiClient.delete(`/Admin/${id}`);
    } catch (error) {
      throw new Error("Nie udało się usunąć użytkownika.");
    }
  };

  export const addUser = async (userData) => {
    try {
        const response = await apiClient.post("/Admin", userData);
        return response.data;
    } catch (error) {
      console.error("Nie udało się dodać usera. ", error);
        throw new Error(
            error.response?.data?.message || "Nie udało się dodać użytkownika."
        );
    }
};
