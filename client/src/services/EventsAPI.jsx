import axios from "axios";

const EventsAPI = {
  getallEvents: async () => {
    try {
      const response = await axios.get("http://localhost:3000/events");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getEventsById: async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/events/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
export default EventsAPI;
