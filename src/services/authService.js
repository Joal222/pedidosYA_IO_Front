import axiosInstance  from "../config/axiosConfig";

export const signUp = async (userData) => {
  try {
    const response = await axiosInstance.post('/register', userData); // Asegúrate de que el endpoint es correcto
    const { token } = response.data;

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const response = await axiosInstance.post('/authenticate', userData);
    const { token } = response.data;
    localStorage.setItem('token', token);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to login');
  }
};

