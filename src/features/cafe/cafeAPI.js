import { axios } from "../../helper/helper";

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

export const deleteCafe = async (id) => {
  try {
    const cafes = await axios.delete(`cafe/${id}/delete`);
    return cafes.data;
  } catch (error) {
    return console.error(error);
  }
};
