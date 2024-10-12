import axios from "axios";

const LocationsAPI = {
  getAllLocations: async () => {
    try {
      const response = await axios.get("http://localhost:3000/locations");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getLocationById: async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/locations/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
export default LocationsAPI;
