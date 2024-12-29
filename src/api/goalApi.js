// src/api/GoalApi.js
import apiClient from './config';

// Funkcja do tworzenia nowego celu
export const createGoal = async (goal) => {
  const response = await apiClient.post('Goal', goal);
  return response.data; // Zwracamy dane zapisane na serwerze
};