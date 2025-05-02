const { axiosInstance } = require("./index");

export const getAllMovies = async () => {
  try {
    const response = await axiosInstance.get("/api/movies");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const addMovie = async (value) => {
  try {
    const response = await axiosInstance.post("/api/movies", value);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateMovie = async (id, value) => {
  try {
    const response = await axiosInstance.put(`/api/movies/${id}`, value);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteMovie = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/movies/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
