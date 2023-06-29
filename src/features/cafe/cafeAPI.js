import defaultAxios from "axios";

const axios = defaultAxios.create({
  baseURL: "http://localhost:8088/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Get All Cafes
export const getAllCafes = async () => {
  try {
    const cafes = await axios.get("cafes");
    return cafes.data;
  } catch (error) {
    return console.error(error);
  }
};

export const createNewCafe = async (data) => {
  try {
    const cafes = await axios.post("cafe", JSON.stringify(data));
    return cafes.data;
  } catch (error) {
    return console.error(error);
  }
};

export const editCafe = async (data) => {
  try {
    const cafes = await axios.put("cafe", JSON.stringify(data));
    return cafes.data;
  } catch (error) {
    return console.error(error);
  }
};

export const deleteCafe = async (data) => {
  try {
    const cafes = await axios.delete("cafe", JSON.stringify(data));
    return cafes.data;
  } catch (error) {
    return console.error(error);
  }
};
