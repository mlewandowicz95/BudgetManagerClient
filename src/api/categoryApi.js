import apiClient from './config';

export const getCategories = async () => {
    try {
      const response = await apiClient.get('Category');
      const rawData = response.data;
      
      // Sprawdzanie, czy otrzymaliśmy tablicę i opakowanie jej w 'items'
      return {
        items: rawData, // Zwróć otrzymane kategorie jako 'items'
        total: rawData.length // Możesz dodać także liczbę kategorii
      };
    } catch (error) {
      throw {
        message: error.response?.data?.message || 'An unexpected error occurred',
        status: error.response?.status || 500,
      };
    }
  }

  

  export const addCategory = async (categoryData) => {
    try{
        const response = await apiClient.post('Category', categoryData);
        return response.data;
    } catch(error) {
        throw {
            message: error.response?.data?.message || 'An unexpected error occurred',
            status: error.response?.status || 500,
          };
    }
  }

  export const updateCategory = async (id, categoryData) => {
    try{
        const response = await apiClient.put('Category/${id}', categoryData);
        return response.data;
    } catch(error) {
        throw {
            message: error.response?.data?.message || 'An unexpected error occurred',
            status: error.response?.status || 500,
        }
    }
  }

  export const deleteCategory = async (id) => {
    try {
        const response = await apiClient.delete(`admin/categories/${id}`);
        return response.data;
    } catch(error) {
        throw {
            message: error.response?.data?.message || 'An unexpected error occurred',
            status: error.response?.status || 500,
        }
    }
  }