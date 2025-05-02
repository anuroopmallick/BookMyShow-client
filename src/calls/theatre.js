const { axiosInstance } = require("./index");

export const getAllTheatres = async () => {
  try {
    const response = await axiosInstance.get("/api/theatres/get-all-theatres");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const addTheatre = async (value) => {
  try {
    const response = await axiosInstance.post("/api/theatres", value);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateTheatre = async (id, value) => {
  try {
    const response = await axiosInstance.put(`/api/theatres/${id}`, value);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteTheatre = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/theatres/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
