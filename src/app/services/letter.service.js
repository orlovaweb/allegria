import httpService from "./http.service";
const letterEndpoint = "letter/";

const letterService = {
  get: async () => {
    const { data } = await httpService.get(letterEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(letterEndpoint + payload._id, payload);
    return data;
  },
  delete: async (payload) => {
    const { data } = await httpService.delete(letterEndpoint + payload);
    return data;
  }

};
export default letterService;


